function disabledLimitByCondition(limit) {
    self.$watch('value', (newSelected, oldSelected) => {
        if (JSON.stringify(newSelected) === JSON.stringify(oldSelected)) return;
        //reset disabled option
        self.disabled = [];

        const answerLength = question.answers.length + 1

        for (const squestion in newSelected) {
            const [qid, qcode, acode] = squestion.split('_') // [id, 1, 1]
            const selected = Object.keys(newSelected).filter(v => v.startsWith(`${qid}_${qcode}`) && newSelected[v] === '1').length
            if (selected >= limit) {
                for (let i = 1; i < answerLength; i++) {
                    const key = `${qid}_${qcode}_${i}`
                    if (parseInt(newSelected[key]) !== 1) {
                        self.disabled.push(key)
                    }

                }
            }
        }
    })
}
