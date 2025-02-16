const subQ11 = 'Q1_1_1';
const subQ12 = 'Q1_1_2';
if (result[subQ11] || result[subQ12]) {
    const subQuestionLength = question.sub_questions.length;
    const acode = '3';
    for (let i = 1; i <= subQuestionLength; i++) {
        self.disabled.push(`${question.qid}_${i}_${acode}`)
    }
}

// start set input for element
// delete input when back
const elements = document.querySelectorAll('.new-input');
elements.forEach(function (element) {
    element.remove();
});
// hidden col
const eleQuestion = document.querySelector('.columns .question:nth-child(2)');
if (eleQuestion) eleQuestion.style.display = 'none';

// PC
const parentElement = document.querySelector('.is-desktop .table');
if (parentElement) {
    const lastDivElement = parentElement.querySelector('tr:last-child td');
    if (lastDivElement) createTextareaPc(lastDivElement);
}

// mobile
const parentElementMb = document.querySelector('.is-mobile');
if (parentElementMb) {
    const lastDivElement = parentElementMb.querySelector('.collapse:last-child');
    if (lastDivElement) createTextareaMb(lastDivElement);
}


// function
function createTextareaPc(parentElement) {
    parentElement.style.cssText = 'display: flex; justify-content: space-between;';
    const textarea = document.createElement('textarea');
    textarea.setAttribute('rows', '1');
    textarea.setAttribute('placeholder', '回答を入力してください。');
    textarea.setAttribute('class', 'textarea fa-input new-input');
    textarea.style.height = '32px';
    textarea.style.maxWidth = '72%';
    textarea.style.minWidth = '100px';

    parentElement.appendChild(textarea);
}

function createTextareaMb(parentElement) {
    const textarea = document.createElement('textarea');
    textarea.setAttribute('rows', '1');
    textarea.setAttribute('placeholder', '回答を入力してください。');
    textarea.setAttribute('class', 'textarea fa-input new-input');
    textarea.style.cssText = 'height: 32px;';


    const oneChild = parentElement.children[1];
    if (oneChild) {
        parentElement.insertBefore(textarea, oneChild);
    }
}

// auto set FA
const inputElement = document.querySelectorAll('.new-input');
const Q2FA = window.customEnterSubmit.questions.find((question) => question.code === 'Q2_FA')
self.value[Q2FA.qid] = ''

inputElement.forEach(function (element) {
    element.addEventListener('input', (event) => {
        // Handle input change event here
        const inputValue = event.target.value;
        self.value[Q2FA.qid] = inputValue
    });
});

// end set input for element

// start show popup
// Call the function to load the SweetAlert library
function loadSweetAlertLibrary() {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/sweetalert2@11.0.19/dist/sweetalert2.min.js';
    document.head.appendChild(script);
}
loadSweetAlertLibrary();
// css
function loadSweetAlertStylesheet() {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/npm/sweetalert2@11.0.19/dist/sweetalert2.min.css';
    link.type = 'text/css';
    document.head.appendChild(link);
}
loadSweetAlertStylesheet();
// end load the SweetAlert library

// logic show popup
let showQ2FA = true;
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
    if (self.value[Q2FA.qid]) return true;

    return false
}
// end logic conditions

// logic popup
function showPopup() {
    const isCondition = allowConditions()
    if (!showQ2FA || isCondition) {
        self.$emit('move-next', true)
        return;
    }
    buttonClick.removeAttribute('type');
    buttonClick2.removeAttribute('type');
    dialogPopup();
}

// button submit
window.scriptQ2FA = function (e) {
    const elementPop = document.querySelector('.swal2-container');
    if (elementPop) return;

    const isCondition = allowConditions()
    if (!showQ2FA || isCondition) {
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
window.addEventListener("keypress", window.scriptQ2FA);

buttonClick.addEventListener("click", function (e) {
    showPopup();
    e.preventDefault();
});
buttonClick2.addEventListener("click", function (e) {
    showPopup();
    e.preventDefault();
});
// end show popup
console.log('ok')