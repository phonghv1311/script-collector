//doc
self.$watch('value', (newSelected, oldSelected) => {
    if (JSON.stringify(newSelected) === JSON.stringify(oldSelected)) return;
    //reset disabled option
    self.disabled = [];
 
    for (const squestion in newSelected) {
        const [,qcode, acode] = squestion.split('_') // [id, 1, 1]

        if(qcode === "18" && acode && self.value[`${question.qid}_${qcode}_${acode}`]) {
             console.log(qcode, acode, '1', question)
            const subQuestionLength = question.sub_questions.length
           
           console.log(subQuestionLength, self.selected[1] = [])
            for (let i = 1; i < subQuestionLength; i++){
                self.disabled.push(`${question.qid}_${i}_${acode}`)
                self.value[`${question.qid}_${i}_${acode}`] = null
                self.selected[i] = self.selected[i].filter(item => item !== acode)
            }
        }
    }
})



// ngang
self.$watch('value', (newSelected, oldSelected) => {
    if (JSON.stringify(newSelected) === JSON.stringify(oldSelected)) return;
    //reset disabled option
    self.disabled = [];
 
    for (const squestion in newSelected) {
        const [,qcode, acode] = squestion.split('_') // [id, 1, 1]
 
        if(qcode === "1" && acode && self.value[`${question.qid}_${qcode}_${acode}`]) {
            const answerLength = question.answers.length + 1
           
            for (let i = 1; i <= answerLength; i++){
                if(i != acode) {
                    self.disabled.push(`${question.qid}_${qcode}_${i}`)
                    self.value[`${question.qid}_${qcode}_${i}`] = null
                }
            }

            self.selected[qcode] = [acode]
        }
    }
})