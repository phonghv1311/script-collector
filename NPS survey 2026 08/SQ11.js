self.$watch('value', (newSelected, oldSelected) => {
  if (JSON.stringify(newSelected) === JSON.stringify(oldSelected) || !newSelected[question.qid]) return;
  
  const selectedCode = String(newSelected[question.qid]);
  const matchedAnswer = question.answers.find(ans => String(ans.code) === selectedCode);
  
  if (matchedAnswer && matchedAnswer.answer) {
    const answerText = matchedAnswer.answer[self.lang] || Object.values(matchedAnswer.answer)[0];
    localStorage.setItem(`SID_${self.sid}_SQ11`, answerText);
  }
})