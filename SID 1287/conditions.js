setTimeout(() => {
	const colorDefault = '#f3b312' // color all
	const colorProgress = '#0b5462' // color value of progress
	const bgProgress = '#f3b312' // color background progress
	const colorLine = '#f3b312' // color of line FA
	const linkAvatar = 'https://admin.collector.koeeru.com/ckfinder/survey_ZJHF5RQXWZ/images/tohoku-logo-small.png'

	var style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = `
#chats > div > div > div:nth-child(1) {
    display: none;
}
#chats .avatar {
    background-image:url('${linkAvatar}');
    width: 5rem;
    height: 6rem;
    min-width: 5rem;
    min-height: 6rem;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
}
#chats .question-item {
    margin-bottom: 1.1rem;
}
#chats .img-avatar {
    display: none;
}
#chats .answer-item,
.button.is-primary.is-hovered,
.button.is-primary{
    background-color: ${colorDefault};
}
.button.is-primary.is-outlined{
    color: ${colorDefault};
    border-color: ${colorDefault};
}
#survey .form-nav button:hover{
    border-color: ${colorDefault};
}
.progress-wrapper .progress-bar,
.button.is-primary.is-outlined:hover, 
.button.is-primary:hover {
    color: #ffffff !important;
    background-color: ${colorDefault} !important;
}
textarea.fa-input,
.is-borderless input {
    border-bottom: 1px solid ${colorLine} !important;
}

progress.progress.is-tiny.is-dark-green::-webkit-progress-value { background: ${colorProgress}; }
.progress-wrapper.is-not-native::-webkit-progress-bar,.progress::-webkit-progress-bar { background-color: ${bgProgress} }
`;

	const pathChart = window.location.pathname
	if (pathChart.includes("chat")) {
		document.getElementsByTagName('head')[0].appendChild(style);
	}
})

//disable from here if wanting to check
const url = window.location.href;
const params = new URLSearchParams(new URL(window.location.href).search);
let email = (params.get('email') !== 'null' && params.get('email') !== null) ? "1" : null
const gender = (params.get('gender') !== 'null' && params.get('gender') !== null) ? "1" : null
const yob = (params.get('yob') !== 'null' && params.get('yob') !== null) ? "1" : null
const firstName = (params.get('firstName') !== 'null' && params.get('firstName') !== null) ? "1" : null
const lastName = (params.get('lastName') !== 'null' && params.get('lastName') !== null) ? "1" : null
const nickname = (params.get('nickname') !== 'null' && params.get('nickname') !== null) ? "1" : null
const country = (params.get('country') !== 'null' && params.get('country') !== null) ? "1" : null
const nationality = (params.get('nationality') !== 'null' && params.get('nationality') !== null) ? "1" : null
const referCode = (params.get('referCode') !== 'null' && params.get('referCode') !== null) ? "1" : null
const prefecture = (params.get('prefecture') !== 'null' && params.get('prefecture') !== null) ? "1" : null

if (lastName) {
	self.selected.push("1")
}
if (firstName) {
	self.selected.push("2")
}
if (nickname) {
	self.selected.push("3")
}
if (email) {
	// Get param email
	const regex = /tohokufanclub\.com/;
	const match = params.get('email').match(regex);
	if (match) {
		email = ''
	} else {
		self.selected.push("4")
	}
}
if (gender) {
	self.selected.push("6")
}
if (yob) {
	self.selected.push("7")
}
if (country) {
	self.selected.push("8")
}
if (prefecture) {
	self.selected.push("9")
}
if (nationality) {
	self.selected.push("10")
}
if(referCode) {
	self.selected.push("11")
}

await self.$emit("input", {
	[self.questionKey(question.qid, null, 1)]: lastName,
	[self.questionKey(question.qid, null, 2)]: firstName,
	[self.questionKey(question.qid, null, 3)]: nickname,
	[self.questionKey(question.qid, null, 4)]: email,
	[self.questionKey(question.qid, null, 6)]: gender,
	[self.questionKey(question.qid, null, 7)]: yob,
	[self.questionKey(question.qid, null, 8)]: country,
	[self.questionKey(question.qid, null, 9)]: prefecture,
	[self.questionKey(question.qid, null, 10)]: nationality,
	[self.questionKey(question.qid, null, 11)]: referCode,
});

localStorage.setItem('QID_CONDITION', question.qid)
// await self.$emit('move-next', true)
console.log('has condition', self)