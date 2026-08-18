// const default by question.
const ranks = [1, 2, 3] // need change follow rank

// function handler localstograte
function handlerLocalStograte(acode, rankValue) {
  const questionRank = question.sub_questions.find(a => Number(a.code) === Number(acode))
  if (questionRank) {
    const aText = questionRank.question[self.lang]
    localStorage.setItem(`SID_${self.sid}_rank_${rankValue}`, `${aText}`)
  }
}

// handler save data for localstograte
self.$watch('value', (newSelected, oldSelected) => {
  if (JSON.stringify(newSelected) === JSON.stringify(oldSelected)) return;
  
  // Clear the top_1, top_2, top_3 values from localStorage before re-evaluating
  ranks.forEach(r => localStorage.removeItem(`SID_${self.sid}_rank_${r}`));

  for (let i = 1; i <= question.sub_questions.length; i++) {
    const keySelected = `${question.qid}_${i}_`;
    const rankValue = newSelected[keySelected]
    // Only save if the selected value corresponds to rank 1, 2, or 3
    if (rankValue && ranks.includes(Number(rankValue))) {
      handlerLocalStograte(i, Number(rankValue))
    }
  }
})