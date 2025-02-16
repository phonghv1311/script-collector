const rank = 1 // rank answer of Q17
const txtQuestion = 'Q17' // set text question is Q17
// add img in title
const imgRank = localStorage.getItem(`img_${txtQuestion}_${rank}`)
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

console.log('done Q18')