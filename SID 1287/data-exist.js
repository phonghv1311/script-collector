// const domainCompany = 'http://localhost:8080' // local
const domainCompany = 'https://community-dev.tohokufanclub.com' // dev
// const domainCompany = 'https://community.tohokufanclub.com' // prod

const eventMessage = async (event) => {
    window.removeEventListener('message', eventMessage)
    if (event.origin !== domainCompany) return;

    if (event.data.includes('account-setting-user:')) {
        const data = event.data.replace(/^account-setting-user:/, '')
        const accountSetting = JSON.parse(data)

        console.log(accountSetting, 'acc')
        if (accountSetting.lastname) {
            self.selected.push("1")
        }
        if (accountSetting.firstname) {
            self.selected.push("2")
        }
        if (accountSetting.nickname) {
            self.selected.push("3")
        }
        if (accountSetting.email) {
            self.selected.push("4")
        }
        if (accountSetting.postal) {
            self.selected.push("5")
        }
        if (accountSetting.gender) {
            self.selected.push("6")
        }
        if (accountSetting.yob) {
            self.selected.push("7")
        }
        if (accountSetting.country) {
            self.selected.push("8")
        }
        if (accountSetting.prefecture) {
            self.selected.push("9")
        }
        if (accountSetting.nationality) {
            self.selected.push("10")
        }

        await self.$emit("input", {
            [self.questionKey(question.qid, null, 1)]: accountSetting.lastname ? '1' : "",
            [self.questionKey(question.qid, null, 2)]: accountSetting.firstname ? '1' : "",
            [self.questionKey(question.qid, null, 3)]: accountSetting.nickname ? '1' : "",
            [self.questionKey(question.qid, null, 4)]: accountSetting.email ? '1' : "",
            [self.questionKey(question.qid, null, 5)]: accountSetting.postal ? '1' : "",
            [self.questionKey(question.qid, null, 6)]: accountSetting.gender ? '1' : "",
            [self.questionKey(question.qid, null, 7)]: accountSetting.yob ? '1' : "",
            [self.questionKey(question.qid, null, 8)]: accountSetting.country ? '1' : "",
            [self.questionKey(question.qid, null, 9)]: accountSetting.prefecture ? '1' : "",
            [self.questionKey(question.qid, null, 10)]: accountSetting.nationality ? '1' : "",
        });

        setTimeout(async () => {
            await self.$emit('move-next', true)
        }, 10)
    }
}

localStorage.setItem('QID_CONDITION', question.qid)
window.parent.postMessage('check-account-setting-user', '*');
window.addEventListener('message', eventMessage)