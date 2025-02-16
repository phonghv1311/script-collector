// set Library popup
function loadSweetAlertLibrary() {
  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/sweetalert2@11.0.19/dist/sweetalert2.min.js';
  document.head.appendChild(script);
}
// Call the function to load the SweetAlert library
loadSweetAlertLibrary();
// css
function loadSweetAlertStylesheet() {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://cdn.jsdelivr.net/npm/sweetalert2@11.0.19/dist/sweetalert2.min.css';
  link.type = 'text/css';
  document.head.appendChild(link);
}
// Call the function to load the SweetAlert stylesheet
loadSweetAlertStylesheet();
// end set Library popup

// get question (important)
const refQ37 = window.customEnterSubmit.$refs['refQ37'][0] // change question with code, example: Q37 to Q87 then refQ87
const qid_Q37 = refQ37.question.qid
// end get question

// logic set value input
let answer1 = null;
let answer2 = null;
let answer3 = null;
self.$watch('value', function (newVal) {
  if (question.code !== 'Q37') return;
  let input_Q37 = document.querySelectorAll('#survey input');
  // check value is number
  for (let i = 0; i < input_Q37.length; i++) {
    let inputValue_Q37 = input_Q37[i].value;
    let sanitizedValue = inputValue_Q37.replace(/[,\.]/g, "");
    input_Q37[i].value = sanitizedValue;
  }

  // rest value
  answer1 = null;
  answer2 = null;
  answer3 = null;
  // end

  // set value
  if (newVal[qid_Q37 + '_1_']) answer1 = Number(newVal[qid_Q37 + '_1_']);
  if (newVal[qid_Q37 + '_2_']) answer2 = Number(newVal[qid_Q37 + '_2_']);
  if (newVal[qid_Q37 + '_3_']) answer3 = Number(newVal[qid_Q37 + '_3_']);
})
// end logic set value input

// logic submit show popup
const buttonQ37 = document.querySelectorAll('#survey .button');
if (!buttonQ37 || buttonQ37.length < 1) return;
// Set the ID for the element button
buttonQ37[0].id = 'btn__submit-Q37';
buttonQ37[1].id = 'btn__submit_2-Q37';
const buttonClickQ37 = document.querySelector('#btn__submit-Q37');
const buttonClickQ372 = document.querySelector('#btn__submit_2-Q37');
// end set id button


// text alert for script
let message = 'text alert'

// event for click
var eventHandler = function (e) {
  if (question.code !== 'Q37') {
    self.$emit('move-next', true)
    return
  };
  showPopupQ37();
  e.preventDefault();
};
// end event

// function style popup
function dialogPopupQ37() {
  Swal.fire({
    title: '',
    text: message,
    confirmButtonText: 'OK',
  }).then((result) => {
    if (result.isConfirmed) {
      buttonClickQ37.setAttribute('type', 'submit');
      buttonClickQ372.setAttribute('type', 'submit');
    }
  });

  // Create a style element
  const styleElement = document.createElement('style');
  styleElement.textContent = '.swal2-popup { font-family: sans-serif; } #swal2-title { font-size: 1.5rem; font-weight: 500 } #swal2-title, #swal2-html-container { text-align: start; color: #1c1c21; } .swal2-actions { justify-content: flex-end; padding-right: 20px; } .swal2-confirm::before { border: unset !important; } .swal2-confirm { background-color: #00bd9d !important; margin: unset !important; box-shadow:none; outline: none !important; transition: none !important; border: unset !important; } .swal2-loader { border-color: none !important; } .swal2-styled.swal2-confirm:focus { box-shadow: none !important; }';
  document.head.appendChild(styleElement);
}
// end function style

// conditions check value show popup or dont show (important)
function allowValue() {
  if (!answer1 || typeof (answer1) !== "number" || typeof (answer2) !== "number" || typeof (answer3) !== "number") {
    return false
  }
  if (answer1 >= 1 && answer2 >= 0 && answer3 >= 0 && answer1 >= answer2 && answer2 >= answer3 && answer1 <= 30 && answer2 <= 30 && answer3 <= 30) {
    return true
  }

  return false;
}
// end conditions

// logic showpoup (important)
function showPopupQ37() {
  if (allowValue()) {
    buttonClickQ372.removeEventListener("click", eventHandler);
    self.$emit('move-next', true);
    return true;
  }

  buttonClickQ37.removeAttribute('type');
  buttonClickQ372.removeAttribute('type');
  if (answer1 < 1 || answer2 < 0 || answer3 < 0) {
    message = '请检查您的答案 ';
  }
  if (answer1 > 30 || answer2 > 30 || answer3 > 30) {
    message = '请最多输入30';
  }
  if (answer1 < answer2) {
    message = 'a.确认输入数字要使“正在使用的镜头总支数”≧b.“购买的另售镜头支数”。';
  }
  if (answer2 < answer3) {
    message = 'b.请确定输入数字要使“购买的另售镜头支数”≧c.“与适马／腾龙／其他与使用相机不同的制造商的镜头支数”。';
  }
  dialogPopupQ37();
}
// end logic show popup

// logic button submit (important)
window.scriptQ37 = function (e) {
  const elementPop = document.querySelector('.swal2-container');
  if (elementPop) return;
  if (question.code !== 'Q37') return;

  buttonClickQ37.removeAttribute('type');
  buttonClickQ372.removeAttribute('type');
  if (e.key === 'Enter' || e.keyCode === 13) {
    buttonClickQ37.click();
    e.preventDefault();
  }
};
window.removeEventListener("keypress", window.customEnterSubmit.enterListener);
window.addEventListener("keypress", window.scriptQ37);
buttonClickQ37.addEventListener("click", function (e) {
  if (question.code !== 'Q37') return;
  showPopupQ37();
  e.preventDefault();
});
buttonClickQ372.addEventListener("click", eventHandler);
// end logic submit or click button

console.log('ok');