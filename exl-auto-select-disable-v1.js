self.prevSelection = JSON.parse(JSON.stringify(self.selected));
self.$watch(
  'selected',
  function (newVal) {
    let updated = JSON.parse(JSON.stringify(newVal));
    let prev = self.prevSelection || {};

    // =========================
    // ✅ INIT
    // =========================
    let s1 = new Set(updated["1"].map(Number));
    let s2 = new Set(updated["2"].map(Number));
    let s3 = new Set(updated["3"].map(Number));
    let s4 = new Set(updated["4"].map(Number));
    let s5 = new Set(updated["5"].map(Number));
    let s6 = new Set(updated["6"].map(Number));
    let s7 = new Set(updated["7"].map(Number));
    let s8 = new Set(updated["8"].map(Number));

    let disabledList = [];

    const currCount = Object.values(newVal).flat().length;
    const prevCount = Object.values(prev).flat().length;
    const isAdding = currCount > prevCount;

    const EXCLUSIVE = 10;
    const FAOPTION = 9;

    // =========================
    // ✅ STEP 1: OVERRIDE EXCLUSIVE (DOWNSTREAM WINS)
    // =========================

    // S2 overrides S1
    // s1.forEach(v => {
    //   if (v !== EXCLUSIVE && s1.has(EXCLUSIVE)) {
    //     s2.delete(EXCLUSIVE);
    //   }
    // });

    // // S3 overrides S2 and S1
    // s3.forEach(v => {
    //   if (v !== EXCLUSIVE) {
    //     if (s2.has(EXCLUSIVE)) s2.delete(EXCLUSIVE);
    //     if (s1.has(EXCLUSIVE)) s1.delete(EXCLUSIVE);
    //   }
    // });

    // // S4 overrides S1
    // s4.forEach(v => {
    //   if (v !== EXCLUSIVE && s1.has(EXCLUSIVE)) {
    //     s1.delete(EXCLUSIVE);
    //   }
    // });

    // =========================
    // ✅ STEP 2: DEPENDENCY
    // =========================
    const isSpecial = v => v === EXCLUSIVE || v === FAOPTION;

    if (isAdding) {
      // UPWARD propagation (ignore exclusive and FA)
      s1.forEach(v => {
        if (!isSpecial(v)) s2.add(v);
      });

      s3.forEach(v => {
        if (!isSpecial(v)) {
          s2.add(v);
        //   s1.add(v);
        }
      });

      s4.forEach(v => {
        if (!isSpecial(v)) {
            s2.add(v);
            s3.add(v);
        }
      });

      s5.forEach(v => {
        if (!isSpecial(v)) {
            s2.add(v);
            s3.add(v);
        }
      });

      s6.forEach(v => {
        if (!isSpecial(v)) {
            s2.add(v);
            s3.add(v);
        }
      });

      s7.forEach(v => {
        if (!isSpecial(v)) {
            s2.add(v);
            s3.add(v);
        }
      });

      s8.forEach(v => {
        if (!isSpecial(v)) {
            s2.add(v);
        }
      });   

    } else {
      // DOWNWARD cleanup (ignore exclusive and FA)
      [s1, s3, s4, s5, s6, s7, s8].forEach(set => {
        Array.from(set).forEach(v => {
          if (!s2.has(v) && !isSpecial(v)) {
            set.delete(v);
          }
        });
      });

      // S3 must exist in S2 (ignore exclusive and FA)
      [s4, s5, s6, s7].forEach(set => {
        Array.from(set).forEach(v => {
          if (!s3.has(v) && !isSpecial(v)) {
            set.delete(v);
          }
        });
      });
    }

    const subQuestionLogic = ["1", "2", "3", "4", "5", "6", "7", "8"];

    // =========================
    // ✅ APPLY DEPENDENCY RESULT
    // =========================
    updated["1"] = Array.from(s1).map(String).sort();
    updated["2"] = Array.from(s2).map(String).sort();
    updated["3"] = Array.from(s3).map(String).sort();
    updated["4"] = Array.from(s4).map(String).sort();
    updated["5"] = Array.from(s5).map(String).sort();
    updated["6"] = Array.from(s6).map(String).sort();
    updated["7"] = Array.from(s7).map(String).sort();
    updated["8"] = Array.from(s8).map(String).sort();

    // =========================
    // ✅ STEP 3: EXCLUSIVE (LOCAL, IMPROVED)
    // =========================
    subQuestionLogic.forEach(rowKey => {
      let currentSet = new Set(updated[rowKey].map(Number));
      let prevSet = new Set((prev[rowKey] || []).map(Number));

      // Only trigger when 7 newly selected
      if (currentSet.has(EXCLUSIVE) && !prevSet.has(EXCLUSIVE)) {
        currentSet = new Set([EXCLUSIVE]);
      }

      // Disabled logic (only when 7 is active)
      if (currentSet.has(EXCLUSIVE)) {
        for (let i = 1; i <= 9; i++) {
          disabledList.push(`${self.question.qid}_${rowKey}_${i}`);
        }
      }

      updated[rowKey] = Array.from(currentSet)
        .map(String)
        .sort((a, b) => Number(a) - Number(b));

      if(rowKey === "1" && !currentSet.has(EXCLUSIVE)) {
        for(let i = 1; i <= 10; i++) {
            if (!updated[rowKey].includes(String(i))) {
                disabledList.push(`${self.question.qid}_${rowKey}_${i}`);
            }
        }
      }
    });

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