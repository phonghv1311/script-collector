const totalRank = question.answers.length || 5
// get localstograte
const objectSelected = {}
for (let i = 1; i <= totalRank; i++) {
  self.selected.push(`${i}`)
  objectSelected[self.questionKey(question.qid, null, i)] = '1'

  setImgForAnswer(i)
}

await self.$emit("input", objectSelected)
// await self.$emit('move-next', true) // open when PROD run
// end code


// start set image
function setImgForAnswer(acode) {
  const txtAnswers = document.querySelectorAll('.txt-answer')
  const imgRank = localStorage.getItem(`img_${acode}`)
  if (imgRank && txtAnswers[acode - 1]) {
    const newImg = document.createElement('div')
    newImg.style.width = '100%'
    newImg.innerHTML = imgRank
    const newEle = newImg.firstChild

    txtAnswers[acode - 1].appendChild(newEle)
  }

}
// end

console.log('Done Q1 filter')