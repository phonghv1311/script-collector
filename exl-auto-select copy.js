self.prevSelection = JSON.parse(JSON.stringify(self.selected));
self.$watch(
  'selected',
  function (newVal) {
    let updated = JSON.parse(JSON.stringify(newVal));
    let prev = self.prevSelection || {};

    // =========================
    // ✅ CONFIGURATION (CẤU HÌNH)
    // =========================
    const EXCLUSIVE = 10;
    const FAOPTION = 9;

    // Mảng dependencies quy định các mối quan hệ "cha - con" giữa các sub-questions.
    // Quy tắc 1 (isAdding - Khi người dùng tích thêm): 
    //    Nếu tích vào một câu "children" (con) thì tất cả câu "parent" (cha) của nó cũng sẽ tự động được tích.
    // Quy tắc 2 (!isAdding - Khi người dùng bỏ tích): 
    //    Nếu bỏ tích ở câu "parent" (cha) thì tất cả câu "children" (con) của nó cũng sẽ tự động bị bỏ tích.
    const dependencies = [
      // Câu 2 là cha của các câu 1, 3, 4, 5, 6, 7, 8
      // Nghĩa là: tích bất kỳ câu 1,3,4,5,6,7,8 thì 2 tự tích. Bỏ tích 2 thì 1,3,4,5,6,7,8 tự bỏ tích.
      { parent: "2", children: ["1", "3", "4", "5", "6", "7", "8"] },
      
      // Câu 3 là cha của các câu 4, 5, 6, 7
      // Nghĩa là: tích bất kỳ câu 4,5,6,7 thì 3 tự tích. Bỏ tích 3 thì 4,5,6,7 tự bỏ tích.
      { parent: "3", children: ["4", "5", "6", "7"] }
    ];

    // Tự động lấy danh sách tất cả các câu hỏi con từ object 'updated' (ví dụ: ["1", "2", "3",...])
    const subQuestionLogic = Object.keys(updated);

    // =========================
    // ✅ INIT (KHỞI TẠO)
    // =========================
    // Tạo một object 'sets' chứa các Set (chỉ lưu các ID đã được chọn) cho từng câu hỏi con
    let sets = {};
    subQuestionLogic.forEach(key => {
      sets[key] = new Set((updated[key] || []).map(Number));
    });

    let disabledList = [];

    // Kiểm tra xem thao tác vừa rồi là thêm hay bớt (bằng cách đếm tổng số lượng option được chọn)
    const currCount = Object.values(newVal).flat().length;
    const prevCount = Object.values(prev).flat().length;
    const isAdding = currCount > prevCount;

    // =========================
    // ✅ STEP 2: DEPENDENCY (ÁP DỤNG LUẬT PHỤ THUỘC)
    // =========================
    // Các logic bên dưới sẽ bỏ qua 2 option đặc biệt là EXCLUSIVE (10) và FAOPTION (9)
    const isSpecial = v => v === EXCLUSIVE || v === FAOPTION;

    if (isAdding) {
      // UPWARD propagation (Lan truyền TỪ DƯỚI LÊN TRÊN: Tích Con -> Tự động tích Cha)

      // Tìm tất cả các row vừa được chọn EXCLUSIVE (mới thêm, chưa có trong prev)
      const newlyExclusiveRows = new Set();
      subQuestionLogic.forEach(key => {
        const curr = sets[key] || new Set();
        const prevSet = new Set((prev[key] || []).map(Number));
        if (curr.has(EXCLUSIVE) && !prevSet.has(EXCLUSIVE)) {
          newlyExclusiveRows.add(key);
        }
      });

      // Tìm tất cả các row sẽ bị clear bởi EXCLUSIVE cha (children của row vừa chọn EXCLUSIVE)
      // Loại trừ SubQ1 — trường hợp đặc biệt, không bị ảnh hưởng bởi EXCLUSIVE của SubQ2
      const willBeCleared = new Set();
      newlyExclusiveRows.forEach(rowKey => {
        const dep = dependencies.find(d => d.parent === rowKey);
        if (dep) {
          dep.children.forEach(c => {
            if (rowKey === "2" && c === "1") return; // SubQ1 là TH đặc biệt
            willBeCleared.add(c);
          });
        }
      });

      dependencies.forEach(({ parent, children }) => {
        if (!sets[parent]) return;

        // Nếu parent vừa chọn EXCLUSIVE → bỏ qua UPWARD, STEP 3 sẽ xử lý
        if (newlyExclusiveRows.has(parent)) return;

        // Nếu parent sẽ bị clear bởi EXCLUSIVE cha → bỏ qua UPWARD (sẽ bị xóa ở STEP 3)
        if (willBeCleared.has(parent)) return;

        children.forEach(child => {
          if (!sets[child]) return;
          // Nếu child sẽ bị clear → không propagate lên parent
          if (willBeCleared.has(child) || newlyExclusiveRows.has(child)) return;

          sets[child].forEach(v => {
            // Nếu con có option 'v' thì tự động thêm 'v' vào cha
            if (!isSpecial(v)) {
              sets[parent].add(v);
              // NẾU CÓ CHỌN ĐÁP ÁN BÌNH THƯỜNG KHÁC 9 VÀ 10 TỪ CON -> BỎ EXCLUSIVE CỦA CHA
              sets[parent].delete(EXCLUSIVE);
            }
          });
        });
      });
    } else {
      // Xác định những option vừa bị uncheck ở mỗi câu
      let removedFrom = {};
      subQuestionLogic.forEach(key => {
        let prevSet = new Set((prev[key] || []).map(Number));
        removedFrom[key] = Array.from(prevSet).filter(v => !sets[key].has(v));
      });

      // 1. REVERSE UPWARD cleanup: Nếu con bỏ tích -> Cha cũng bỏ tích (nếu không còn con nào giữ)
      // Cần duyệt mảng dependencies ngược từ dưới lên (ví dụ: 4 -> 3 -> 2)
      [...dependencies].reverse().forEach(({ parent, children }) => {
        if (!sets[parent]) return;

        // Giữ đáp án của SubQ2 khi children uncheck — không lan truyền ngược lên SubQ2
        if (parent === "2") return;
        
        // Tìm tất cả các option bình thường còn đang được tích ở CÁC CON
        let allChildrenOptions = new Set();
        children.forEach(child => {
          if (!sets[child]) return;
          sets[child].forEach(v => {
            if (!isSpecial(v)) allChildrenOptions.add(v);
          });
        });

        children.forEach(child => {
          if (!removedFrom[child]) return;
          removedFrom[child].forEach(v => {
            // Nếu v vừa bị xoá ở con này, và KHÔNG CÒN con nào khác giữ v, thì xoá v ở cha
            if (!allChildrenOptions.has(v) && !isSpecial(v)) {
              sets[parent].delete(v);
              // Ghi nhận cha cũng vừa bị xoá v để tiếp tục lan truyền lên các cha cao hơn
              if (!removedFrom[parent]) removedFrom[parent] = [];
              if (!removedFrom[parent].includes(v)) removedFrom[parent].push(v);
            }
          });
        });
      });

      // 2. DOWNWARD cleanup (Lan truyền TỪ TRÊN XUỐNG DƯỚI: Bỏ tích Cha -> Tự động bỏ tích Con)
      dependencies.forEach(({ parent, children }) => {
        if (!sets[parent]) return;
        children.forEach(child => {
          if (!sets[child]) return;
          Array.from(sets[child]).forEach(v => {
            // Nếu cha không còn option 'v' nữa, thì xoá luôn 'v' ở tất cả các con
            if (!sets[parent].has(v) && !isSpecial(v)) {
              sets[child].delete(v);
            }
          });
        });
      });
    }

    // =========================
    // ✅ CLEANUP: Remove orphaned EXCLUSIVE
    // =========================
    // Nếu sau khi DOWNWARD cleanup, sub question chỉ còn EXCLUSIVE (không còn đáp án bình thường nào),
    // thì bỏ EXCLUSIVE luôn — tránh trường hợp sub question bị khóa EXCLUSIVE khi thực tế không có gì được chọn.
    if (!isAdding) {
      subQuestionLogic.forEach(key => {
        if (!sets[key]) return;
        const hasNormal = Array.from(sets[key]).some(v => !isSpecial(v));
        // Chỉ xóa EXCLUSIVE khi row trước đó CÓ đáp án bình thường nhưng bị mất hết (do DOWNWARD).
        // Nếu trước đó cũng chỉ có EXCLUSIVE (không có đáp án bình thường) → EXCLUSIVE hợp lệ, không xóa.
        const prevHadNormal = (prev[key] || []).map(Number).some(v => !isSpecial(v));
        if (!hasNormal && prevHadNormal && sets[key].has(EXCLUSIVE)) {
          sets[key].delete(EXCLUSIVE);
        }
      });
    }

    // =========================
    // ✅ APPLY DEPENDENCY RESULT
    // =========================
    subQuestionLogic.forEach(key => {
      if (sets[key]) {
        updated[key] = Array.from(sets[key]).map(String).sort();
      }
    });

    // =========================
    // ✅ STEP 3: EXCLUSIVE (LOCAL, IMPROVED)
    // =========================
    let exclusiveTriggered = false;
    subQuestionLogic.forEach(rowKey => {
      let currentSet = new Set(updated[rowKey].map(Number));
      let prevSet = new Set((prev[rowKey] || []).map(Number));

      // Only trigger when EXCLUSIVE newly selected
      if (currentSet.has(EXCLUSIVE) && !prevSet.has(EXCLUSIVE)) {
        currentSet = new Set([EXCLUSIVE]);
        exclusiveTriggered = true;

        // Nếu câu này là cha, việc chọn EXCLUSIVE sẽ xoá các đáp án bình thường (1-8) ở tất cả câu con,
        // nhưng giữ lại đáp án 9 (FAOPTION) và 10 (EXCLUSIVE) nếu có
        let deps = dependencies.find(d => d.parent === rowKey);
        if (deps) {
          deps.children.forEach(childKey => {
            // SubQ1 là TH đặc biệt — không bị ảnh hưởng bởi EXCLUSIVE của SubQ2
            if (rowKey === "2" && childKey === "1") return;
            updated[childKey] = (updated[childKey] || []).filter(v => isSpecial(Number(v)));
          });
        }
      }
      // Ngược lại: EXCLUSIVE đã có sẵn, user thêm đáp án bình thường → bỏ EXCLUSIVE
      else if (currentSet.has(EXCLUSIVE) && prevSet.has(EXCLUSIVE)) {
        const hasNormal = Array.from(currentSet).some(v => !isSpecial(v));
        if (hasNormal) {
          currentSet.delete(EXCLUSIVE);
        }
      }

      // Disabled logic: khi row này có EXCLUSIVE → disable answers 1-9 của chính nó
      if (currentSet.has(EXCLUSIVE)) {
        for (let i = 1; i <= 9; i++) {
          disabledList.push(`${self.question.qid}_${rowKey}_${i}`);
        }

        // Nếu row này là parent → disable answers 1-8 của tất cả children
        // Loại trừ SubQ1 — trường hợp đặc biệt
        let deps = dependencies.find(d => d.parent === rowKey);
        if (deps) {
          deps.children.forEach(childKey => {
            if (rowKey === "2" && childKey === "1") return; // SubQ1 không bị disable
            for (let i = 1; i <= 8; i++) {
              disabledList.push(`${self.question.qid}_${childKey}_${i}`);
            }
          });
        }
      }

      updated[rowKey] = Array.from(currentSet)
        .map(String)
        .sort((a, b) => Number(a) - Number(b));

      if(rowKey === "1" && !currentSet.has(EXCLUSIVE)) {
        // Chỉ disable khi SubQ1 đang có ít nhất 1 đáp án bình thường (đang bị ràng buộc bởi parent).
        // Khi SubQ1 rỗng hoàn toàn → không disable gì, cho phép user tự do chọn lại.
        const hasNormalAnswer = Array.from(currentSet).some(v => !isSpecial(v));
        if (hasNormalAnswer) {
          for(let i = 1; i <= 10; i++) {
              if (!updated[rowKey].includes(String(i))) {
                  disabledList.push(`${self.question.qid}_${rowKey}_${i}`);
              }
          }
        }
      }
    });

    // =========================
    // ✅ STEP 4: PARENT CONSISTENCY AFTER EXCLUSIVE
    // =========================
    // Khi child chọn EXCLUSIVE, các đáp án bình thường bị xóa khỏi child.
    // Cần lan truyền ngược lên parent: nếu parent còn đáp án mà KHÔNG còn child nào giữ → xóa khỏi parent.
    // Duyệt ngược (deepest → shallowest) để cascade đúng: SubQ5 → SubQ3 → SubQ2
    if (exclusiveTriggered) {
    [...dependencies].reverse().forEach(({ parent, children }) => {
      // Giữ đáp án của SubQ2 — không xóa khi children thay đổi
      if (parent === "2") return;

      let parentSet = new Set(updated[parent].map(Number));

      // Thu thập tất cả đáp án bình thường còn lại ở các children
      let allChildNormalAnswers = new Set();
      children.forEach(child => {
        (updated[child] || []).map(Number).forEach(v => {
          if (!isSpecial(v)) allChildNormalAnswers.add(v);
        });
      });

      // Xóa đáp án ở parent mà không còn child nào giữ
      let changed = false;
      Array.from(parentSet).forEach(v => {
        if (!isSpecial(v) && !allChildNormalAnswers.has(v)) {
          parentSet.delete(v);
          changed = true;
        }
      });

      if (changed) {
        updated[parent] = Array.from(parentSet)
          .map(String)
          .sort((a, b) => Number(a) - Number(b));
      }
    });
    } // end exclusiveTriggered

    // =========================
      // ✅ APPLY UPDATE (SAFE)
      // =========================
      if (JSON.stringify(updated) !== JSON.stringify(newVal)) {
        self.selected = updated;

        // Emit input for all changed keys
        const changes = {};
        subQuestionLogic.forEach(rowKey => {
          question.answers.forEach(answer => {
            const key = `${question.qid}_${rowKey}_${answer.code}`;
            const isSelected = updated[rowKey].includes(String(answer.code));
            changes[key] = isSelected ? "1" : null;
          });
        });
        self.$emit('input', changes);
      }

    // Save state
    self.disabled = disabledList;
    self.prevSelection = JSON.parse(JSON.stringify(updated));
  },
  { deep: true }
);