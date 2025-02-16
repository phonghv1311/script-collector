const currentQuestionIdx = 1;
const availableQuestions = [1,2,3,4,6,7,8,9,10,11];
let lastQuestion = 1;

const qCodeCondition = localStorage.getItem('QID_CONDITION')
console.log(self.result, qCodeCondition)
for (const questionIdx of availableQuestions) {
  if (self.result[`${qCodeCondition}__${questionIdx}`] !== "1") {
        lastQuestion = questionIdx;
    }
}

console.log(lastQuestion, currentQuestionIdx)
if (currentQuestionIdx === lastQuestion) {
    const btnSubmit = document.querySelector('#live-chat #survey .submit-button')

    btnSubmit.addEventListener('click', async function(e) {
        e.preventDefault();
        const isValid = await window.customEnterSubmit.$refs.surveySubmitObserver.validate()
        if(isValid){
            self.$emit('move-next', true)
        }
    });
}