const qCode = question.code;
const subs = [1,2,3];

question.sub_questions.forEach(sub => {
  const aText = sub.question[self.lang]
  localStorage.removeItem(`SID_${self.sid}_${qCode}_${sub.code}`)
  
  if (aText && subs.includes(Number(sub.code))) {
    localStorage.setItem(`SID_${self.sid}_${qCode}_${sub.code}`, `${aText}`)
  }
})