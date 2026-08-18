const element = document.querySelector('#survey-scroller');
const codeOther = 13;
const answers = question.answers
if (answers.length !== 1) {
    if(window.customLoading) { window.customLoading.close(); }
    element.style.display = 'block';
    return;
}

await self.$emit("input", { [question.qid]: `${answers[0].code}` })

if (answers[0].code === codeOther) {
    if(window.customLoading) { window.customLoading.close(); }
    element.style.display = 'block';
    return;
}

if (!window.customLoading) { window.customLoading = self.$buefy.loading.open(); }

element.style.display = 'none';
await self.$emit('move-next', true)