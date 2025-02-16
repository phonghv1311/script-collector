// const default by question.
const rank = 1 // need change follow rank
const totalAnswer = 19 // set default by answer Q2_rank.

// start add img in title
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


// get array text for options
let arrText = []
for (let i = 1; i <= totalAnswer; i++) {
  const txt = localStorage.getItem(`rank_${rank}_${i}`)
  if (txt) {
    arrText.push(txt)
  }
}
// end get array text options
if (arrText.length < 1) {
  return;
}

// start CASE desktop
// set text for option desktop
const txtAnswers = document.querySelectorAll('.is-desktop .text-answer') // get options need attach
if (txtAnswers) {
  txtAnswers.forEach((ele, key) => {
    ele.innerHTML = arrText[key] || ''
  })
}
// end set text desktop

const options = txtAnswers.length
const opChoose = arrText.length
// start hide options for desktop
const eleTr = document.querySelectorAll('#survey .is-desktop .table tr')
if (Number(opChoose) !== Number(txtAnswers.length) && eleTr) {
  const colgroup = document.querySelectorAll('colgroup col')
  eleTr.forEach((tr) => {
    for (let j = 1; j <= options; j++) {
      const eleTd = tr.children[Number(opChoose) + j] || null
      if (eleTd) {
        colgroup[j].style.display = 'none'
        eleTd.style.display = 'none'
      }
    }
  })
}
// end start hide desktop
// end CASE desktop


// start CASE mobile
// set and hide text for option mobile
const contentMb = document.querySelectorAll('.is-mobile .collapse .card-content .content') // get options need attach
if (contentMb) {
  contentMb.forEach((content) => {
    if (content.children.length > 0) {
      content.children.forEach((field, k) => {
        if (arrText[k]) {
          const txtSpan = field.children[0].children[2].children[0] // field -> 0: label -> 2: span.control-label -> 0: text span
          if (txtSpan) txtSpan.innerHTML = arrText[k]
        } else {
          field.style.display = 'none'
        }
      })
    }
  })
}
// end set and hide text mobile

// set title selected mobile

const collapse = document.querySelectorAll('.is-mobile .collapse')
if (collapse) {
  collapse.forEach((ele) => {
    ele.addEventListener('click', eventHandler)
  })
}

function eventHandler() {
  const collapse = document.querySelectorAll('.is-mobile .selected-option')
  if (collapse) {
    collapse.forEach((ops) => {
      if (ops.children.length > 0) {
        ops.children.forEach((op, idx) => {
          if (arrText[idx]) {
            const txtSpan = op.children[1].children[0] // option -> 0: p -> 1: title -> 0: text span
            if (txtSpan) txtSpan.innerHTML = arrText[idx]
          }
        })
      }
    })
  }
}

// end CASE mobile
console.log('done Q3')