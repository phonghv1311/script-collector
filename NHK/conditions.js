setTimeout(() => {
  const colorDefault = '#00b092' // color all
  const colorProgress = '#00b092' // color value of progress
  const bgProgress = '#00b092' // color background progress
  const colorLine = '#00b092' // color of line FA


  // set avatar by domain
  let linkAvatar = 'https://admin.collector.koeeru.com/ckfinder/survey_LZXLT4DWRW/images/NHK_World_svg.png'
  const domain = window.location.ancestorOrigins ? window.location.ancestorOrigins[0] : null;
  if (domain === 'https://collector.koeeru.com') {
      linkAvatar = 'https://koeeru.com/wp-content/uploads/2022/06/cropped-favicon-180x180.png';
  }
  if (domain === 'https://muic-community-dev.koeeru.com') {
      linkAvatar = 'https://community.tabeeru.com/images/voice-for-osaka-logo-bold-1.svg';
  }


  // display country
  let display = 'block';
  if (domain === 'https://muic-community-dev.koeeru.com') {
      display = 'none';
  }
  // end

  var style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = `
#chats > div > div > div:nth-child(1), #chats > div > div > div:nth-child(2) {
  display: none;
}

#chats > div > div > div:nth-child(3),
#chats > div > div > div:nth-child(7),
#chats > div > div > div:nth-child(11),
#chats > div > div > div:nth-child(12) {
  display: ${display};
}

#chats .avatar {
  background-image:url('${linkAvatar}');
  // width: 5rem;
  // height: 6rem;
  // min-width: 5rem;
  // min-height: 6rem;
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
let email = (params.get('email') !== 'null' && params.get('email') !== null) ? "1" : ""
const gender = (params.get('gender') !== 'null' && params.get('gender') !== null) ? "1" : ""
const yob = (params.get('yob') !== 'null' && params.get('yob') !== null) ? "1" : ""
const firstName = (params.get('firstName') !== 'null' && params.get('firstName') !== null) ? "1" : ""
const lastName = (params.get('lastName') !== 'null' && params.get('lastName') !== null) ? "1" : ""
const nickname = (params.get('nickname') !== 'null' && params.get('nickname') !== null) ? "1" : ""

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
  const domainEmail = params.get('email').split("@")[1];
  console.log(domainEmail)
  if (domainEmail === 'tohokufanclub.com') {
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


const domain = window.location.ancestorOrigins ? window.location.ancestorOrigins[0] : null;
let dept = "1";
// hard code for test
if (domain === 'https://muic-community-dev.koeeru.com') {
  dept = "";
} else {
  self.selected.push("11")
}

await self.$emit("input", {
  [self.questionKey(question.qid, null, 1)]: lastName,
  [self.questionKey(question.qid, null, 2)]: firstName,
  [self.questionKey(question.qid, null, 3)]: nickname,
  [self.questionKey(question.qid, null, 4)]: email,
  [self.questionKey(question.qid, null, 6)]: gender,
  [self.questionKey(question.qid, null, 7)]: yob,
  [self.questionKey(question.qid, null, 11)]: dept,
});

// await self.$emit('move-next', true)
console.log('has condition', self)