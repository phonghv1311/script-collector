// Email

var style = document.createElement('style');
style.id = 'q4style'
style.type = 'text/css';
style.innerHTML = `
.dialog .modal-card .modal-card-foot {
    min-width: 300px;
    padding: 8px !important;
}
.dialog .modal-card .modal-card-foot .button {
    padding: 0 10px !important;
}
`;

document.getElementsByTagName('head')[0].appendChild(style);
// end style css

// const domainCompany = 'http://localhost:8080' // local
const domainCompany = 'https://community-dev.tohokufanclub.com'
const messages = {
    en: 'Invalid email information',
    ja: '無効な電子メール情報'
}
const btnConfirm = {
    en: 'Ok',
    ja: 'Ok-JA'
};
const btnCancel = {
    en: 'Cancel',
    ja: 'Cancel-JA'
};

const btnSubmit = document.querySelector('#live-chat #survey .submit-button')
const footerNav = document.querySelector('.footer-nav')
if (footerNav) {
    footerNav.style.setProperty('z-index', '40', 'important');
}

function showPopup() {
    const dialog = document.querySelector('.dialog')
    if (dialog) {
        return;
    }
    const isValid = window.customEnterSubmit.$refs.surveySubmitObserver.validate()
    if (!isValid) {
        self.$buefy.dialog.alert({
            message: messages[self.lang] || messages.en,
            confirmText: 'Close',
        })
        return;
    }

    window.parent.postMessage(`email-register:${self.result[question.qid]}`, '*');
    window.addEventListener('message', eventMessage)
}


// event for click
const eventHandler = function (e) {
    if (question.code !== 'Email') {
        btnSubmit.removeEventListener('click', eventHandler)
        self.$emit('move-next', true)
        return
    };
    showPopup();
    e.preventDefault()
}
const eventMessage = function (event) {
    window.removeEventListener('message', eventMessage)
    console.log(event, 'eeee')
    if (event.origin !== domainCompany) return;
    if (event.data.includes('exist-email')) {
        const existEmail = event.data.replace(/^exist-email:/, '')
        if (Number(existEmail) !== 1) {
            btnSubmit.removeEventListener('click', eventHandler)
            localStorage.setItem('duplicated_email', 0)
            self.$emit('move-next', true)
            return;
        } else {
            self.$buefy.dialog.confirm({
                message: messages[self.lang] || messages.en,
                confirmText: btnConfirm[self.lang] || txtBtn.en,
                cancelText: btnCancel[self.lang] || txtBtn.en,
                onConfirm: () => {
                    localStorage.setItem('duplicated_email', 1)
                    self.$emit('move-next', true)
                }
            })
        }
    }
}
btnSubmit.addEventListener('click', eventHandler)