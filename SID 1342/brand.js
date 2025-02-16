
const totalQuestion = ['Brand_1', 'Brand_2', 'Brand_3'] // total of question FA
const arrText = {}
for(let i = 1; i <= totalQuestion.length; i++) {
	arrText[i] = localStorage.getItem(`sub_${i}`)
}
console.log(arrText)

totalQuestion.forEach((qCode, idx) => {
	const refQCode = window.customEnterSubmit.$refs[`ref${qCode}`][0]
	if (refQCode && arrText[idx + 1]) {
		self.value[refQCode.question.qid] = arrText[idx + 1]
		self.$emit("input", {[refQCode.question.qid]: `${arrText[idx + 1]}`})
	}
})

console.log(self)