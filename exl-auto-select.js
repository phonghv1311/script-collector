self.prevSelection = JSON.parse(JSON.stringify(self.selected));
self.$watch(
  'selected',
  function (newVal) {
    let updated = JSON.parse(JSON.stringify(newVal));
    let prev = self.prevSelection || {};

    // ╔══════════════════════════════════════════════════════════════════╗
    // ║                     CẤU HÌNH (CONFIGURATION)                    ║
    // ╚══════════════════════════════════════════════════════════════════╝

    const EXCLUSIVE = 10; // Đáp án "Không có cái nào" — khi chọn sẽ loại bỏ các đáp án bình thường
    const FAOPTION = 9;   // Đáp án đặc biệt — không bị ảnh hưởng bởi EXCLUSIVE

    // Mảng dependencies quy định mối quan hệ "cha - con" giữa các sub-questions.
    //   - isAdding (tích thêm):  Tích CON → tự động tích CHA
    //   - !isAdding (bỏ tích):   Bỏ tích CHA → tự động bỏ tích CON
    //
    // ⚠️ NGOẠI LỆ:
    //   - SubQ1 là trường hợp đặc biệt: KHÔNG bị ảnh hưởng khi SubQ2 chọn EXCLUSIVE
    //   - SubQ2 LUÔN giữ đáp án: children uncheck/EXCLUSIVE không xóa đáp án của SubQ2
    const dependencies = [
      { parent: "2", children: ["1", "3", "4", "5", "6", "7", "8"] },
      { parent: "3", children: ["4", "5", "6", "7"] }
    ];

    // ╔══════════════════════════════════════════════════════════════════╗
    // ║                    HÀM TIỆN ÍCH (HELPERS)                       ║
    // ╚══════════════════════════════════════════════════════════════════╝

    const subQuestionLogic = Object.keys(updated);

    /** Kiểm tra option có phải đặc biệt (EXCLUSIVE hoặc FAOPTION) */
    const isSpecial = (v) => v === EXCLUSIVE || v === FAOPTION;

    /** Kiểm tra SubQ1 có phải ngoại lệ của parent (SubQ1 không bị ảnh hưởng bởi EXCLUSIVE của SubQ2) */
    const isSubQ1Exception = (parentKey, childKey) => parentKey === "2" && childKey === "1";

    /** Kiểm tra parent có phải SubQ2 — SubQ2 luôn giữ đáp án */
    const isProtectedParent = (parentKey) => parentKey === "2";

    // Khởi tạo sets: chứa Set các option đã chọn (dạng Number) cho từng SubQ
    let sets = {};
    subQuestionLogic.forEach(key => {
      sets[key] = new Set((updated[key] || []).map(Number));
    });

    let disabledList = [];

    // Xác định thao tác: thêm (isAdding) hay bớt (đếm tổng option đã chọn)
    const currCount = Object.values(newVal).flat().length;
    const prevCount = Object.values(prev).flat().length;
    const isAdding = currCount > prevCount;

    // ╔══════════════════════════════════════════════════════════════════╗
    // ║           STEP 1: LAN TRUYỀN PHỤ THUỘC (DEPENDENCY)             ║
    // ╚══════════════════════════════════════════════════════════════════╝

    if (isAdding) {
      handleUpwardPropagation();
    } else {
      handleUncheckPropagation();
    }

    // ╔══════════════════════════════════════════════════════════════════╗
    // ║          STEP 2: XỬ LÝ EXCLUSIVE & DISABLED                     ║
    // ╚══════════════════════════════════════════════════════════════════╝

    // Áp dụng kết quả dependency vào mảng updated
    applySetsToUpdated();

    // Xử lý EXCLUSIVE (chọn/bỏ EXCLUSIVE, clear children, disable)
    const exclusiveTriggered = handleExclusiveLogic();

    // Xử lý parent consistency sau khi EXCLUSIVE trigger
    if (exclusiveTriggered) {
      handleParentConsistencyAfterExclusive();
    }

    // ╔══════════════════════════════════════════════════════════════════╗
    // ║              STEP 3: ÁP DỤNG KẾT QUẢ (APPLY)                   ║
    // ╚══════════════════════════════════════════════════════════════════╝

    applyUpdates();

    // ════════════════════════════════════════════════════════════════════
    //                    CÁC HÀM XỬ LÝ CHI TIẾT
    // ════════════════════════════════════════════════════════════════════

    /**
     * UPWARD PROPAGATION (Lan truyền TỪ DƯỚI LÊN TRÊN)
     * Khi tích đáp án ở CON → tự động tích CHA (cùng đáp án)
     *
     * Trước khi propagate, tính toán:
     *   - newlyExclusiveRows: các SubQ vừa chọn EXCLUSIVE (để skip UPWARD)
     *   - willBeCleared: các SubQ sẽ bị clear bởi EXCLUSIVE cha (để skip propagate)
     */
    function handleUpwardPropagation() {
      // 1. Tìm các row vừa chọn EXCLUSIVE mới (chưa có trong prev)
      const newlyExclusiveRows = findNewlyExclusiveRows();

      // 2. Tìm các row sẽ bị clear bởi EXCLUSIVE cha
      //    ⚠️ SubQ1 là ngoại lệ — không bị clear khi SubQ2 chọn EXCLUSIVE
      const willBeCleared = findRowsToBeClearedByExclusive(newlyExclusiveRows);

      // 3. Thực hiện UPWARD propagation
      dependencies.forEach(({ parent, children }) => {
        if (!sets[parent]) return;

        // Skip: parent vừa chọn EXCLUSIVE → STEP 2 sẽ xử lý
        if (newlyExclusiveRows.has(parent)) return;

        // Skip: parent sẽ bị clear bởi EXCLUSIVE cha → không cần propagate
        if (willBeCleared.has(parent)) return;

        children.forEach(child => {
          if (!sets[child]) return;

          // Skip: child sẽ bị clear hoặc vừa chọn EXCLUSIVE → đáp án cũ không hợp lệ
          if (willBeCleared.has(child) || newlyExclusiveRows.has(child)) return;

          sets[child].forEach(v => {
            if (!isSpecial(v)) {
              sets[parent].add(v);           // Thêm đáp án bình thường của con vào cha
              sets[parent].delete(EXCLUSIVE); // Có đáp án bình thường → bỏ EXCLUSIVE ở cha
            }
          });
        });
      });
    }

    /**
     * UNCHECK PROPAGATION (Lan truyền khi bỏ tích)
     * Gồm 3 bước:
     *   1. REVERSE UPWARD: Con bỏ tích → Cha cũng bỏ (nếu không còn con nào giữ)
     *   2. DOWNWARD: Cha bỏ tích → Con cũng bỏ
     *   3. CLEANUP: Xóa EXCLUSIVE mồ côi (chỉ còn EXCLUSIVE mà không có đáp án bình thường)
     */
    function handleUncheckPropagation() {
      // Xác định các option vừa bị uncheck ở mỗi SubQ
      let removedFrom = {};
      subQuestionLogic.forEach(key => {
        let prevSet = new Set((prev[key] || []).map(Number));
        removedFrom[key] = Array.from(prevSet).filter(v => !sets[key].has(v));
      });

      // ── 1. REVERSE UPWARD: Con bỏ tích → Cha cũng bỏ ──
      // Duyệt ngược (deepest → shallowest) để cascade đúng: SubQ4→SubQ3→SubQ2
      // ⚠️ SubQ2 được bảo vệ — không bị ảnh hưởng khi children uncheck
      [...dependencies].reverse().forEach(({ parent, children }) => {
        if (!sets[parent]) return;
        if (isProtectedParent(parent)) return; // SubQ2 giữ đáp án

        // Tìm tất cả đáp án bình thường còn được tích ở CÁC CON
        let allChildrenOptions = new Set();
        children.forEach(child => {
          if (!sets[child]) return;
          sets[child].forEach(v => {
            if (!isSpecial(v)) allChildrenOptions.add(v);
          });
        });

        // Nếu option vừa bị xóa ở con và KHÔNG CÒN con nào khác giữ → xóa ở cha
        children.forEach(child => {
          if (!removedFrom[child]) return;
          removedFrom[child].forEach(v => {
            if (!allChildrenOptions.has(v) && !isSpecial(v)) {
              sets[parent].delete(v);
              // Ghi nhận để tiếp tục cascade lên cha cao hơn
              if (!removedFrom[parent]) removedFrom[parent] = [];
              if (!removedFrom[parent].includes(v)) removedFrom[parent].push(v);
            }
          });
        });
      });

      // ── 2. DOWNWARD: Cha bỏ tích → Con cũng bỏ ──
      dependencies.forEach(({ parent, children }) => {
        if (!sets[parent]) return;
        children.forEach(child => {
          if (!sets[child]) return;
          Array.from(sets[child]).forEach(v => {
            // Nếu cha không còn option v → xóa ở con (chỉ đáp án bình thường)
            if (!sets[parent].has(v) && !isSpecial(v)) {
              sets[child].delete(v);
            }
          });
        });
      });

      // ── 3. CLEANUP: Xóa EXCLUSIVE mồ côi ──
      // Nếu SubQ chỉ còn EXCLUSIVE mà mất hết đáp án bình thường (do DOWNWARD) → xóa EXCLUSIVE
      // Chỉ xóa khi trước đó CÓ đáp án bình thường (phân biệt với EXCLUSIVE do user chủ ý chọn)
      subQuestionLogic.forEach(key => {
        if (!sets[key]) return;
        const hasNormal = Array.from(sets[key]).some(v => !isSpecial(v));
        const prevHadNormal = (prev[key] || []).map(Number).some(v => !isSpecial(v));
        if (!hasNormal && prevHadNormal && sets[key].has(EXCLUSIVE)) {
          sets[key].delete(EXCLUSIVE);
        }
      });
    }

    /** Áp dụng kết quả từ sets vào mảng updated */
    function applySetsToUpdated() {
      subQuestionLogic.forEach(key => {
        if (sets[key]) {
          updated[key] = Array.from(sets[key]).map(String).sort();
        }
      });
    }

    /**
     * XỬ LÝ EXCLUSIVE
     * Gồm 3 logic chính:
     *   1. EXCLUSIVE mới chọn: giữ chỉ EXCLUSIVE, clear đáp án 1-8 ở children, disable
     *   2. EXCLUSIVE cũ + đáp án mới: bỏ EXCLUSIVE (user muốn chọn đáp án bình thường)
     *   3. Disable: khóa đáp án 1-9 của row có EXCLUSIVE, khóa 1-8 của children
     *
     * ⚠️ SubQ1 là ngoại lệ — không bị clear/disable khi SubQ2 chọn EXCLUSIVE
     *
     * @returns {boolean} true nếu có EXCLUSIVE mới được trigger
     */
    function handleExclusiveLogic() {
      let triggered = false;

      subQuestionLogic.forEach(rowKey => {
        let currentSet = new Set(updated[rowKey].map(Number));
        let prevSet = new Set((prev[rowKey] || []).map(Number));

        // ── 1. EXCLUSIVE mới được chọn ──
        if (currentSet.has(EXCLUSIVE) && !prevSet.has(EXCLUSIVE)) {
          currentSet = new Set([EXCLUSIVE]); // Chỉ giữ EXCLUSIVE, bỏ hết đáp án bình thường
          triggered = true;

          // Clear đáp án bình thường (1-8) ở tất cả children, giữ lại 9 và 10
          clearChildrenNormalAnswers(rowKey);
        }
        // ── 2. Đã có EXCLUSIVE + thêm đáp án bình thường → bỏ EXCLUSIVE ──
        else if (currentSet.has(EXCLUSIVE) && prevSet.has(EXCLUSIVE)) {
          const hasNormal = Array.from(currentSet).some(v => !isSpecial(v));
          if (hasNormal) {
            currentSet.delete(EXCLUSIVE);
          }
        }

        // ── 3. Disable logic ──
        if (currentSet.has(EXCLUSIVE)) {
          disableSelfAnswers(rowKey);          // Disable 1-9 của chính row này
          disableChildrenAnswers(rowKey);       // Disable 1-8 của children (trừ SubQ1)
        }

        // Cập nhật mảng updated
        updated[rowKey] = Array.from(currentSet)
          .map(String)
          .sort((a, b) => Number(a) - Number(b));

        // ── 4. Disable đặc biệt cho SubQ1 ──
        // SubQ1 chỉ cho phép chọn các đáp án mà nó đang có (từ parent propagation)
        // Khi SubQ1 rỗng → không disable gì (cho phép tự do chọn lại)
        handleSubQ1DisableLogic(rowKey, currentSet);
      });

      return triggered;
    }

    /**
     * PARENT CONSISTENCY SAU EXCLUSIVE
     * Khi child chọn EXCLUSIVE → child mất đáp án bình thường → cần xóa ở parent
     * nếu không còn child nào giữ đáp án đó.
     *
     * Duyệt ngược (deepest → shallowest) để cascade đúng
     * ⚠️ SubQ2 được bảo vệ — không bị xóa đáp án
     */
    function handleParentConsistencyAfterExclusive() {
      [...dependencies].reverse().forEach(({ parent, children }) => {
        if (isProtectedParent(parent)) return; // SubQ2 giữ đáp án

        let parentSet = new Set(updated[parent].map(Number));

        // Thu thập đáp án bình thường còn lại ở tất cả children
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
    }

    /** Áp dụng thay đổi cuối cùng vào Vue state và emit events */
    function applyUpdates() {
      if (JSON.stringify(updated) !== JSON.stringify(newVal)) {
        self.selected = updated;

        // Emit input cho tất cả các key thay đổi
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

      // Lưu state hiện tại
      self.disabled = disabledList;
      self.prevSelection = JSON.parse(JSON.stringify(updated));
    }

    // ════════════════════════════════════════════════════════════════════
    //                      HÀM CON HỖ TRỢ
    // ════════════════════════════════════════════════════════════════════

    /** Tìm các row vừa chọn EXCLUSIVE mới (có EXCLUSIVE hiện tại, không có trong prev) */
    function findNewlyExclusiveRows() {
      const result = new Set();
      subQuestionLogic.forEach(key => {
        const curr = sets[key] || new Set();
        const prevSet = new Set((prev[key] || []).map(Number));
        if (curr.has(EXCLUSIVE) && !prevSet.has(EXCLUSIVE)) {
          result.add(key);
        }
      });
      return result;
    }

    /**
     * Tìm các row sẽ bị clear bởi EXCLUSIVE cha
     * ⚠️ SubQ1 là ngoại lệ — không bị clear khi SubQ2 chọn EXCLUSIVE
     */
    function findRowsToBeClearedByExclusive(newlyExclusiveRows) {
      const result = new Set();
      newlyExclusiveRows.forEach(rowKey => {
        const dep = dependencies.find(d => d.parent === rowKey);
        if (dep) {
          dep.children.forEach(c => {
            if (isSubQ1Exception(rowKey, c)) return;
            result.add(c);
          });
        }
      });
      return result;
    }

    /**
     * Clear đáp án bình thường (1-8) ở tất cả children của parent
     * Giữ lại đáp án 9 (FAOPTION) và 10 (EXCLUSIVE)
     * ⚠️ SubQ1 là ngoại lệ — không bị clear khi SubQ2 chọn EXCLUSIVE
     */
    function clearChildrenNormalAnswers(parentKey) {
      let deps = dependencies.find(d => d.parent === parentKey);
      if (!deps) return;
      deps.children.forEach(childKey => {
        if (isSubQ1Exception(parentKey, childKey)) return;
        updated[childKey] = (updated[childKey] || []).filter(v => isSpecial(Number(v)));
      });
    }

    /** Disable đáp án 1-9 của chính row (khi row có EXCLUSIVE) */
    function disableSelfAnswers(rowKey) {
      for (let i = 1; i <= 9; i++) {
        disabledList.push(`${self.question.qid}_${rowKey}_${i}`);
      }
    }

    /**
     * Disable đáp án 1-8 ở tất cả children (khi parent có EXCLUSIVE)
     * (Lưu ý: SubQ1 cũng bị disable 1-8 khi SubQ2 chọn EXCLUSIVE, dù không bị clear đáp án)
     */
    function disableChildrenAnswers(parentKey) {
      let deps = dependencies.find(d => d.parent === parentKey);
      if (!deps) return;
      deps.children.forEach(childKey => {
        // Bỏ isSubQ1Exception ở đây để SubQ1 cũng bị disable 1-8
        for (let i = 1; i <= 8; i++) {
          disabledList.push(`${self.question.qid}_${childKey}_${i}`);
        }
      });
    }

    /**
     * Disable đặc biệt cho SubQ1:
     * - Khi SubQ1 có đáp án bình thường → disable các đáp án KHÔNG được chọn (lock lại)
     * - Khi SubQ1 rỗng hoàn toàn → không disable gì (cho phép tự do chọn lại)
     */
    function handleSubQ1DisableLogic(rowKey, currentSet) {
      if (rowKey !== "1" || currentSet.has(EXCLUSIVE)) return;

      const hasNormalAnswer = Array.from(currentSet).some(v => !isSpecial(v));
      if (!hasNormalAnswer) return; // Rỗng → tự do chọn

      for (let i = 1; i <= 10; i++) {
        if (!updated[rowKey].includes(String(i))) {
          disabledList.push(`${self.question.qid}_${rowKey}_${i}`);
        }
      }
    }
  },
  { deep: true }
);