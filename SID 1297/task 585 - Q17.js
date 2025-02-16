// zoom image
const images = document.querySelectorAll('#survey .field img') // get element image
if (images) {
  // handler click image
  images.forEach((img) => {
    img.addEventListener('click', function (e) {
      e.preventDefault()
      // Get the current outerHTML string
      let htmlString = img.outerHTML
      // Add styles to the element
      htmlString = htmlString.replace('>', 'class="zoom-img">')

      // show popup display img
      self.$buefy.dialog.alert({
        message: htmlString,
        size: 'is-large',
        confirmText: 'Close'
      })
    })
  })
}
// end code zoom image



// start code save img for localstorage
// function handler localstograte
const txtQuestion = 'Q17'  // rank answer of Q17
function handlerLocalStograte(qcode, acode) {
  // save local image url
  const subQuestion = question.sub_questions.find(q => Number(q.code) === Number(qcode))
  localStorage.setItem(`img_${txtQuestion}_${acode}`, subQuestion.question[self.lang])
}

// function reset localstograte if unclick
function resetLocalStograte(obj = {}) {
  console.log(obj)
  const defaultAnswer = 5 // must choose 5 answer can change by conditions
  for (let j = 1; j <= defaultAnswer; j++) {
    if (!obj) {
      localStorage.removeItem(`img_${txtQuestion}_${j}`)
    }
    if (!obj[j]) {
      localStorage.removeItem(`img_${txtQuestion}_${j}`)
    }
  }
}


// handler save data for localstograte and click image
const totalSubQuestion = question.sub_questions.length || 20
self.$watch('value', (newSelected, oldSelected) => {
  if (JSON.stringify(newSelected) === JSON.stringify(oldSelected)) return;
  const objAnswers = {}
  for (let i = 1; i <= totalSubQuestion; i++) {
    const keySelected = `${question.qid}_${i}_`
    if (self.value[keySelected]) {
      objAnswers[self.value[keySelected]] = i
      handlerLocalStograte(i, self.value[keySelected])
    }
  }

  localStorage.setItem(`answers_${txtQuestion}`, JSON.stringify(objAnswers)) // save answer choose
  resetLocalStograte(objAnswers)
})
// end code save img for local storage

// start code hide img has  selected in Q1
const answers = localStorage.getItem('answers')
if (answers) {
  const listKey = {}
  const arrAnswerCode = Object.values(JSON.parse(answers)) // get array code q1 choose
  question.sub_questions.forEach((q, k) => {
    if (arrAnswerCode.includes(Number(q.code))) {
      listKey[k] = 1 // set key after random
    }
  })

  const fields = document.querySelectorAll('#survey .question .field')
  if (fields) {
    fields.forEach((field, key) => {
      if (listKey[key]) {
        field.style.display = 'none' // hide answer by code has choose of q1
      }
    })
  }
}
// end code hide img selected in Q1

console.log('done Q17')