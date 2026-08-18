
const storedValue = localStorage.getItem(`SID_${self.sid}_SQ11`);
const targetElement = document.querySelector('.answer-sq11');

if (targetElement && storedValue) {
    targetElement.textContent = storedValue;
}