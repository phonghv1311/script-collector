const rank = 1 // rank : 1, 2, 3
const q3Fa = 1 // change stt of fa, example: 1, 2, 3
const totalAnswer = 19 // total answer of Q2

// get array text for options
let arrText = []
for (let i = 1; i <= totalAnswer; i++) {
  const txt = localStorage.getItem(`rank_${rank}_${i}`)
  if (txt) {
    arrText.push(txt)
  }
}

const eleFa = document.querySelector(`#survey .text-answer-fa-${q3Fa}`)
if (arrText && eleFa) {
  eleFa.innerHTML = arrText[q3Fa - 1]
}