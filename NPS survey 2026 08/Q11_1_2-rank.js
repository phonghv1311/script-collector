const qRank = question.sub_questions

if (qRank.length === 1) {
    if(!window.customLoading) window.customLoading = self.$buefy.loading.open()
    const element = document.querySelector('#survey-scroller');
    if (element) {
        element.style.display = 'none';
    }


    // Trường hợp có 1 đáp án duy nhất, ta gán luôn rank là 1 
    const changes = {
        [`${question.qid}_${qRank[0].code}_`]: 1
    };

    self.$emit("input", changes);
    
    // Đồng bộ vào state selected của component
    if (self.selected && !self.selected.includes(qRank[0].code)) {
        self.selected.push(qRank[0].code);
    }

    self.$emit('move-next', true);
    return;
}

// handler save data for localstograte
self.$watch('value', (newSelected, oldSelected) => {
  if (JSON.stringify(newSelected) === JSON.stringify(oldSelected)) return;

  const result = [];

  question.sub_questions.forEach(sub => {
    const keySelected = `${question.qid}_${sub.code}_`;
    const rankValue = newSelected[keySelected];

    if (rankValue) {
      // Đặt code của sub_question vào index tương ứng với rank (rank 1 -> index 0)
      result[Number(rankValue) - 1] = sub.code;
    }
  });

  // Lọc các giá trị null/undefined nếu có rank chưa được chọn
  const cleanResult = result.filter(code => code != null);

  localStorage.setItem(`SORT_${self.sid}_${question.code}`, JSON.stringify(cleanResult));
})