// css popup
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

// logic show popup
let showQN16 = true;
self.$watch('value', (newSelected, oldSelected) => {
    if (JSON.stringify(newSelected) === JSON.stringify(oldSelected)) return;
    if(question.code === 'QN16') {
        showQN16 = true;
        return;
    }
    showQN16 = false;
})

const button = document.querySelectorAll('.button');
if (!button || button.length < 1) return;
// Set the ID for the element button
button[1].id = 'btn__submit';
button[3].id = 'btn__submit_2';

const buttonClick = document.querySelector('#btn__submit');
const buttonClick2 = document.querySelector('#btn__submit_2');

//script change text and show popup
let message = '少なくとも 1 つの質問に答えてください';
if (self.lang !== 'ja') {
    message = 'Please answer at least one question';
}
function dialogPopup() {
    Swal.fire({
        title: '',
        text: message,
        confirmButtonText: 'OK',
    }).then((result) => {
        if (result.isConfirmed) {
            buttonClick.setAttribute('type', 'submit');
            buttonClick2.setAttribute('type', 'submit');
        }
    });

    // Create a style element
    const styleElement = document.createElement('style');
    styleElement.textContent = '.swal2-popup { font-family: sans-serif; } #swal2-title { font-size: 1.5rem; font-weight: 500 } #swal2-title, #swal2-html-container { text-align: start; color: #1c1c21; } .swal2-actions { justify-content: flex-end; padding-right: 20px; } .swal2-confirm::before { border: unset !important; } .swal2-confirm { background-color: #00bd9d !important; margin: unset !important; box-shadow:none; outline: none !important; transition: none !important; border: unset !important; } .swal2-loader { border-color: none !important; } .swal2-styled.swal2-confirm:focus { box-shadow: none !important; }';
    document.head.appendChild(styleElement);
}

// logic conditions
function allowConditions() {
    let countInput = 0
    for(let i = 1; i <= 5; i++) {
        if(self.result[question.qid + '_' + i + '_']) {
            countInput++
        }
    }

    if(countInput >= 3) {
        return true
    }

    return false
}
// end logic conditions

// logic popup
function showPopup() {
    const isCondition = allowConditions()
    console.log(isCondition, showQN16, '1')
    if (!showQN16 || isCondition) {
        self.$emit('move-next', true)
        return;
    }
    buttonClick.removeAttribute('type');
    buttonClick2.removeAttribute('type');
    dialogPopup();
}

// button submit
window.scriptQN16 = function (e) {
    const elementPop = document.querySelector('.swal2-container');
    if (elementPop) return;

    const isCondition = allowConditions()
    if (!showQN16 || isCondition) {
        if (e.key === 'Enter' || e.keyCode === 13) {
            self.$emit('move-next', true)
            return;
        }
    }

    buttonClick.removeAttribute('type');
    buttonClick2.removeAttribute('type');
    if (e.key === 'Enter' || e.keyCode === 13) {
        buttonClick.click();
        e.preventDefault();
    }
};
window.removeEventListener("keypress", window.customEnterSubmit.enterListener);
window.addEventListener("keypress", window.scriptQN16);

buttonClick.addEventListener("click", function (e) {
    showPopup();
    e.preventDefault();
});
buttonClick2.addEventListener("click", function (e) {
    showPopup();
    e.preventDefault();
});