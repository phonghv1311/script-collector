// const default by question.
const rank = 1 // need change follow rank

// add img in title
const imgRank = localStorage.getItem(`img_${rank}`)
if (imgRank) {
  const titleQ2Rank = document.querySelector('.question-text__question')
  const newImg = document.createElement('div')
  newImg.style.width = '100%'
  newImg.innerHTML = imgRank
  const newEle = newImg.firstChild
  newEle.classList.add('img-rank')

  titleQ2Rank.appendChild(newEle)
}
// end set img in title


// start save text answer
const answers = document.querySelectorAll('#survey .question .answer .option')
// function handler localstograte
function handlerLocalStograte(acode) {
  const answerCode = question.answers.find(a => Number(a.code) === Number(acode))
  const aText = answerCode.answer[self.lang]
  // save local answer
  localStorage.setItem(`rank_${rank}_${acode}`, aText)
}

// function reset localstograte if unclick
function resetLocalStograte(acode) {
  // save local answer
  localStorage.removeItem(`rank_${rank}_${acode}`)
}


// handler save data for localstograte and click image
const totalAnswer = question.answers.length || 19
self.$watch('value', (newSelected, oldSelected) => {
  if (JSON.stringify(newSelected) === JSON.stringify(oldSelected)) return;
  for (let i = 1; i <= totalAnswer; i++) {
    const keySelected = `${question.qid}__${i}`
    if (self.value[keySelected]) {
      handlerLocalStograte(i)
    } else {
      resetLocalStograte(i)
    }
  }
})

console.log(`rank_${rank}`)