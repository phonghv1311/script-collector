const selectedAnswers = []
const arrCode = ['Q13', 'Q14', 'Q15', 'Q16', 'Q17'] // question code order by STT Q13 -> Q17
const arrLengthCode = [35, 33, 41, 19, 12] // number length of answers in question order by STT Q13 -> Q17

arrCode.forEach((code, idx) => {
	for (let i = 1; i <= arrLengthCode[idx]; i++) {
		if (result[`${code}__${i}`]) {
			let aCode = i;
			for (let j = 0; j < idx; j++) {
				aCode += arrLengthCode[j];
			}
			selectedAnswers.push(aCode);
		}
	}
});

if(selectedAnswers.length > 0) {
	const inputAnswers = []
	for(let a = 1; a <= question.answers.length; a++) {
		if(selectedAnswers.includes(a)) {
			self.selected.push(`${a}`)
			inputAnswers[self.questionKey(question.qid, null, a)] = '1';
		}
	}
	await self.$emit("input", inputAnswers)
}
console.log('ok')