const messages = {

  ja: '回答内容を確認してください',

  en: 'Please check the answer.',

  'en-GB': 'Please check the answer.',

  fr: 'Veuillez vérifier la réponse.',

  de: 'Bitte überprüfen Sie den Inhalt der Antwort.',

};



// check click link

let clicked = false

const link = document.querySelector('a')



if (!link) { return; }

link.addEventListener('click', function () {

  clicked = true

})

// end check click link



let answer = null;

self.$watch('value', function (newVal) {

  if (newVal[question.qid]) answer = newVal[question.qid]

})



// logic check click button next or answer or back

const buttonQ13 = document.querySelectorAll('#survey .button');

if (!buttonQ13 || buttonQ13.length < 1) return;



const checkClicked = (e) => {

  if (!answer) {

    self.$emit('move-next', true)

    return;

  }

  if (clicked) {

    buttonQ13.forEach((btn, index) => {

      // th co button back

      if (index === 3 || index === 5) {

        btn.removeEventListener('click', checkClicked)

      }



      // TH ko co button back

      // if (index === 2 && index === 3) {

      //     btn.removeEventListener('click', checkClicked)

      // }

    })

    window.removeEventListener("keypress", window.scriptQ13);

    window.addEventListener("keypress", window.customEnterSubmit.enterListener);

    self.$emit('move-next', true)

    return;

  }



  const helpError = document.querySelector('.help')

  if (helpError) {

    helpError.textContent = messages[self.lang]

    helpError.setAttribute('class', 'help is-danger')

  }



  e.preventDefault()

}



// button click

buttonQ13.forEach((btn, index) => {

  // th co button back

  if (index === 3 || index === 5) {

    btn.addEventListener('click', checkClicked)

  }



  // TH ko co button back

  // if (index === 2 && index === 3) {

  //     btn.addEventListener('click', checkClicked)

  // }

})



// enter

window.scriptQ13 = function (e) {

  if (question.code !== 'Q13') { return; }

  if (e.key === 'Enter' || e.keyCode === 13) {

    checkClicked(e);

    e.preventDefault();

  }

};

window.addEventListener("keypress", window.scriptQ13);

window.removeEventListener("keypress", window.customEnterSubmit.enterListener);



console.log('ok');