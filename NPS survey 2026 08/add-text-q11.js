{/* <span class="answer-sq11">SQ11</span> */}

const storedValue = localStorage.getItem(`SID_${self.sid}_SQ11`);
const targetElements = document.querySelectorAll('.answer-sq11');

if (storedValue) {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = storedValue;

    tempDiv.querySelectorAll('img').forEach(img => img.remove());

    const finalText = tempDiv.textContent;

    targetElements.forEach(element => {
        element.textContent = finalText;
    });
}

