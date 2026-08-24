const resultAnswers = self.resultQcode || {};
const subCodes = [1, 2, 3];
const qCode = 'Q9_1';
let extractedTexts = [];

subCodes.forEach(code => {
    const answer = resultAnswers[`${qCode}_${code}_`] || null;
    if (answer && subCodes.includes(Number(answer))) {
        const text = localStorage.getItem(`SID_${self.sid}_${qCode}_${code}`);
        extractedTexts.push(text);
    }
});

// gán vào sau thẻ br đầu tiên trong class question-text__question
if (extractedTexts.length > 0) {
    const validTexts = extractedTexts.filter(Boolean); // Lọc các text null/undefined
    if (validTexts.length > 0) {
        const questionElement = document.querySelector('.question-text__question');
        if (questionElement) {
            const textToInsert = `<br><p>${validTexts.join('<br>')}</p><br>`;
            questionElement.innerHTML = questionElement.innerHTML.replace(/(<br\s*\/?>)/i, `$1${textToInsert}`);
        }
    }
}
