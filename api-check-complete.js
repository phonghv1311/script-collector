
const domain = 'https://api-dev.collector.koeeru.com/v1/surveys/' + self.sid + '/' + question.code + '/count'
const params = {
	type: 'complete'
}
let res = await self.$axios.get(domain, { params })
const count = res.data.data