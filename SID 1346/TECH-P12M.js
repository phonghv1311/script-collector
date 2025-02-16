const expCode = 'EXP' // question EXP code
const respondentTest = 'test_v1' // khi nao test xong xoa cả dòng

if (Number(result[expCode]) === 1) {
	await self.$emit("input", {[question.qid]: '1'})
	return;
} else if (Number(result[expCode]) === 2) {
	await self.$emit("input", {[question.qid]: '2'})
	return;
}

// get answers submiited
const domain = 'https://api.collector.koeeru.com/v1/responses'
const params = {
	sid: self.sid,
	limit: 500,
	query: respondentTest // khi nao test xong xoa cả dòng
}
let res = await self.$axios.get(domain, { params })
if(Number(res.data.record_count) === 0) {
	await self.$emit("input", {[question.qid]: '1'})
	return;
}
if (res.data.record_count > params.limit) {
	params.limit = res.data.record_count
	res = await self.$axios.get(domain, { params })
}

const strACode99 = '__99'
const answersSubmitted = res.data.data.filter(
	(submitted) =>
		submitted.submitted_at
		&& submitted.rid !== 'test_friend'
		&& !Object.keys(submitted).some((key) => key.includes(strACode99))
);

if(answersSubmitted.length < 1) {
	await self.$emit("input", {[question.qid]: '1'})
	return;
}

// set const
const numberExp = 2 // total submitted of answer 1, 2, 3
const exp2    = answersSubmitted.filter(obj => Number(obj[question.qid]) === Number(numberExp)).length
let percent = (exp2 * 100) / answersSubmitted.length
if(percent < 50) {
	percent = ((exp2 + 1) * 100) / answersSubmitted.length
}

if (percent >= 50) {
	await self.$emit("input", {[question.qid]: '1'})
} else {
	await self.$emit("input", {[question.qid]: `${numberExp}`})
}
console.log('ok')