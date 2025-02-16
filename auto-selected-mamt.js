
// disabled all input type checkbox
const inputCheckbox = document.querySelectorAll('.checkbox input')
for (let i = 0; i < inputCheckbox.length; i++) {
    inputCheckbox[i].setAttribute("disabled", true)
}

// auto select MAMT
self.value[`${question.qid}_1_1`] = '1'
self.value[`${question.qid}_1_2`] = '1'
self.value[`${question.qid}_1_3`] = '1'

self.selected[1] = ['1', '2', '3'] // [1] is sub question 1
console.log('ok')