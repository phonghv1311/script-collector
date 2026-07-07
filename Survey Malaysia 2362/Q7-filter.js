const element = document.querySelector('#survey-scroller');
if (element) {
    element.style.display = 'none';
}

if(!window.customLoading) window.customLoading = self.$buefy.loading.open()

const countAnswers = (obj = {}, prefix, maxIdx) => 
  Array.from({ length: maxIdx }).reduce((count, _, i) => {
    const val = obj[`${prefix}__${i + 1}`];
    return count + (val != null);
  }, 0);

const countQ = countAnswers(self.resultQcode, 'Q4', 31);

let answerCode = '1';
if (countQ >= 2) {
    answerCode = '2'
}
if(countQ >= 4) {
    answerCode = '3'
}
if (countQ >= 6) {
    answerCode = '4'
}
if(countQ >= 8) {
    answerCode = '5'
}

await self.$emit("input", { [question.qid]: answerCode });
await self.$emit('move-next', true);