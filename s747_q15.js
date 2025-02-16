const qid_Q15 = question.qid

let answer1 = null;
let answer2 = null;

// reload when input change
self.$watch('value', function(newVal, oldVal){
    // check number
    if(question.code === 'Q15'){
        // lấy tất cả input
        const input = document.querySelectorAll('input');
        for (let i = 0; i < input.length; i++) {
            let inputValue = input[i].value;
            input[i].value = inputValue.replace(/[,\.]/g, oldVal);
        }
    }
    // end check number
    if (question.code !== 'Q15') return;
    if (newVal[qid_Q15 + '_1_']) answer1 = Number(newVal[qid_Q15 + '_1_']);
    if (newVal[qid_Q15 + '_2_']) answer2 = Number(newVal[qid_Q15 + '_2_']);
})
// end logic

// logic submit show popup
const buttonQ15 = document.querySelectorAll('.button');
if (!buttonQ15 || buttonQ15.length < 1) return;
// Set the ID for the element button
buttonQ15[1].id = 'btn__submit-Q15';
buttonQ15[3].id = 'btn__submit_2-Q15';

const buttonClickQ15 = document.querySelector('#btn__submit-Q15');
const buttonClickQ152 = document.querySelector('#btn__submit_2-Q15');


// alert text for script
let messageQ15 = ' 個人年収以上の世帯年収の数値をご記入ください。';
if (self.lang !== 'ja') {
    messageQ15 = ' 個人年収以上の世帯年収の数値をご記入ください。';
}
// end alert

// style css popup
function dialogPopupQ15() {
    Swal.fire({
        title: '',
        text: messageQ15,
        confirmButtonText: 'OK',
    }).then((result) => {
        if (result.isConfirmed) {
            buttonClickQ15.setAttribute('type', 'submit');
            buttonClickQ152.setAttribute('type', 'submit');
        }
    });

    // Create a style element
    const styleElement = document.createElement('style');
    styleElement.textContent = '.swal2-popup { font-family: sans-serif; } #swal2-title { font-size: 1.5rem; font-weight: 500 } #swal2-title, #swal2-html-container { text-align: start; color: #1c1c21; } .swal2-actions { justify-content: flex-end; padding-right: 20px; } .swal2-confirm::before { border: unset !important; } .swal2-confirm { background-color: #00bd9d !important; margin: unset !important; box-shadow:none; outline: none !important; transition: none !important; border: unset !important; } .swal2-loader { border-color: none !important; } .swal2-styled.swal2-confirm:focus { box-shadow: none !important; }';
    document.head.appendChild(styleElement);
}
// end style

// logic showpoup
function showPopupQ15() {
    if (answer1 >= 1900 && answer1 <= 2023 && answer2 >= 1 && answer2 <= 12) {
        self.$emit('move-next', true);
        return;
    }
    buttonClickQ15.removeAttribute('type');
    buttonClickQ152.removeAttribute('type');
    dialogPopupQ15();
}

// logic button submit
window.scriptQ15 = function (e) {
    const elementPop = document.querySelector('.swal2-container');
    if (elementPop) return;
    if (question.code !== 'Q15') return;
    if (answer1 >= 1900 && answer1 <= 2023 && answer2 >= 1 && answer2 <= 12) {
        if (e.key === 'Enter' || e.keyCode === 13) {
            self.$emit('move-next', true);
        }
    };
    buttonClickQ15.removeAttribute('type');
    buttonClickQ152.removeAttribute('type');
    if (e.key === 'Enter' || e.keyCode === 13) {
        buttonClickQ15.click();
        e.preventDefault();
    }
};

// call function showpopup by action enter and click
window.removeEventListener("keypress", window.customEnterSubmit.enterListener);
window.addEventListener("keypress", window.scriptQ15);
buttonClickQ15.addEventListener("click", function (e) {
    if (question.code !== 'Q15') return;
    showPopupQ15();
    e.preventDefault();
});
buttonClickQ152.addEventListener("click", function (e) {
    if (question.code !== 'Q15') return;
    showPopupQ15();
    e.preventDefault();
});