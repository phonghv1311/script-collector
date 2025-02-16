// const domainCompany = 'http://localhost:8080' // local
const domainCompany = 'https://community-dev.tohokufanclub.com' // dev
// const domainCompany = 'https://community.tohokufanclub.com' // prod

//  default always have en
const messages = {
    en: 'Invalid code information',
    ja: '無効な電子メール情報'
}
const messagesResend = {
    en: 'Verified code fail',
    ja: '無効な電子メール情報'
}
const btnConfirm = {
    en: 'Resend code',
    ja: 'Resend Code JA'
};

const btnCancel = {
    en: 'Cancel',
    ja: 'Cancel-JA'
};

const btnSubmit = document.querySelector('#live-chat #survey .submit-button')

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

    window.parent.postMessage(`verification-email-code:${self.result[question.qid]}`, '*');
    window.addEventListener('message', eventMessage)
}

// event for click
const eventHandler = function (e) {
    if (question.code !== 'VerifyCode') {
        btnSubmit.removeEventListener('click', eventHandler)
        self.$emit('move-next', true)
        return
    };
    showPopup();
    e.preventDefault()
}

const eventMessage = function (event) {
    window.removeEventListener('message', eventMessage)
    if (event.origin !== domainCompany) return;
    if (event.data.includes('verified-code:')) {
        const verified = event.data.replace(/^verified-code:/, '')
        if (Number(verified) === 1) {
            btnSubmit.removeEventListener('click', eventHandler)
            self.$emit('move-next', true)
            return;
        } else {
            self.$buefy.dialog.confirm({
                message: messagesResend[self.lang] || messagesResend.en,
                confirmText: btnConfirm[self.lang] || btnConfirm.en,
                cancelText: btnCancel[self.lang] || btnCancel.en,
                onConfirm: () => {
                    resendCode();
                    self.$buefy.dialog.close();
                }
            })
        }
    }
}
window.removeEventListener('message', eventMessage)
btnSubmit.removeEventListener('click', eventHandler)
btnSubmit.addEventListener('click', eventHandler)

// resend code
function resendCode() {
    window.parent.postMessage('send-email-verification-code', '*');
    window.addEventListener('message', eventMessage)
}
resendCode(); // call for the first

console.log('send code')