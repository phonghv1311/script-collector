const btnSubmit = document.querySelector('#live-chat #survey .submit-button')
btnSubmit.addEventListener('click', async function(e) {
  e.preventDefault();
  const isValid = await window.customEnterSubmit.$refs.surveySubmitObserver.validate()
  if(isValid){
    self.$emit('move-next', true)
    window.parent.postMessage('complete-survey', '*')
  }

});