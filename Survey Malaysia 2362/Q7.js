if (window.customLoading) window.customLoading.close();

const element = document.querySelector('#survey-scroller');
if (element) {
    element.style.display = 'block';
}

// Reomve all key Q7_{Index} on local strograte
Object.keys(localStorage)
    .filter(key => key.startsWith('Q7_'))
    .forEach(key => localStorage.removeItem(key));

// 1. Lấy tất cả index từ localStorage có key Q4_{index}
const allIndices = Object.keys(localStorage)
    .filter(key => /^Q4_\d+$/.test(key))
    .map(key => parseInt(key.replace('Q4_', ''), 10));

// 2. Ưu tiên Q4_1: tách riêng, shuffle phần còn lại
const hasQ4_1 = allIndices.includes(1);
const rest = allIndices.filter(i => i !== 1);

// Fisher-Yates shuffle
for (let i = rest.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [rest[i], rest[j]] = [rest[j], rest[i]];
}

// Q4_1 luôn đứng đầu pool nếu có
const pool = hasQ4_1 ? [1, ...rest] : rest;

// 3. Ghép cặp liên tiếp từ pool đã random (tối đa 5 cặp)
const displayPairs = [];
for (let i = 0; i + 1 < pool.length && displayPairs.length < 5; i += 2) {
    displayPairs.push([pool[i], pool[i + 1]]);
}

// 3. Render "value key1 / value key2" vào các class HTML option_1 đến option_5
displayPairs.forEach((pair, index) => {
    const textToDisplay = `${localStorage.getItem(`Q4_${pair[0]}`) || 'Unknown'} / ${localStorage.getItem(`Q4_${pair[1]}`) || 'Unknown'}`;
    const optionClass = `.option_${index + 1}`;

    // querySelectorAll: tìm TẤT CẢ element tương ứng (cả desktop và mobile)
    const optionElements = element
        ? element.querySelectorAll(optionClass)
        : document.querySelectorAll(optionClass);

    if (optionElements.length === 0) return;
    localStorage.setItem(`Q7_${index + 1}`, textToDisplay);

    optionElements.forEach(el => {
        el.innerText = textToDisplay;
    });
});