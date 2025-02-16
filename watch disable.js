//sub 1 SA
self.$watch('value', (newSelected, oldSelected) => {
  if (JSON.stringify(newSelected) === JSON.stringify(oldSelected)) return;
  //reset disabled option
  self.disabled = [];

  for (const squestion in newSelected) {
    const [, qcode, acode] = squestion.split('_') // [id, 1, 1]
    if (qcode === "1" && acode && self.value[`${question.qid}_${qcode}_${acode}`]) {
      const answerLength = question.answers.length
      for (let i = 1; i <= answerLength; i++) {
        if (i === answerLength) i = 99
        if (i != acode) {
          self.disabled.push(`${question.qid}_${qcode}_${i}`)
          self.value[`${question.qid}_${qcode}_${i}`] = null
        }
      }

      self.selected[qcode] = [acode]
      autoSelectAndDisable(acode, qcode)
    }
  }
})
self.showMobileView = true;