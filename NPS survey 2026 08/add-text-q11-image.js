const storedValue = localStorage.getItem(`SID_${self.sid}_SQ11`);
const targetElements = document.querySelectorAll('.answer-sq11');

if (storedValue) {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = storedValue;
    
    tempDiv.querySelectorAll('p').forEach(p => {
        p.replaceWith(...p.childNodes, document.createElement('br'));
    });
    
    const finalHTML = tempDiv.innerHTML;

    targetElements.forEach(element => {
        element.innerHTML = finalHTML;
    });
}