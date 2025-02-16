var style = document.createElement('style');
style.id = 'q4style';
style.type = 'text/css';
style.innerHTML = `
.card-content { display: none; }
.question-text { margin-bottom: 0 !important; }
.question-content { gap: 10px; display: flex; }
.question-content select {
    width: auto; padding: 10px; margin: 10px 0;
    border: 1px solid #ccc; border-radius: 4px;
    background-color: #FFF; font-size: 16px;
}
.question-content select:focus { border-color: #007bff; outline: none; }
.question-content button {
    padding: 12px 15px; border: none; border-radius: 4px;
    background-color: #007bff; color: white; font-size: 16px;
    cursor: pointer; flex: 1; margin-right: 10px;
    transition: background-color 0.3s;
}
.question-content button:hover { background-color: #0056b3; }
`;

document.getElementsByTagName('head')[0].appendChild(style);

// Create dropdowns
const container = document.querySelector('.question-content');

// Function to create a select element
const createSelect = (options) => {
    const select = document.createElement('select');
    select.innerHTML = options.map(opt => `<option value="${opt.value}">${opt.text}</option>`).join('');
    return select;
};

// Year Dropdown
const yearSelect = createSelect(Array.from({ length: 129 }, (_, i) => ({
    value: 2018 - i,
    text: 2018 - i
})));
container.appendChild(yearSelect);

// Month Dropdowns for different languages
const monthNames = {
    en: ['January', 'February', 'March', 'April', 'May', 'June',
         'July', 'August', 'September', 'October', 'November', 'December'],
    ja: ['1月', '2月', '3月', '4月', '5月', '6月',
         '7月', '8月', '9月', '10月', '11月', '12月'],
    zh: ['一月', '二月', '三月', '四月', '五月', '六月',
         '七月', '八月', '九月', '十月', '十一月', '十二月']
};

// Change 'lang' to the desired language code: 'en', 'ja', or 'zh'
const dataMonth = monthNames[self.lang] ?? monthNames.en;
const monthSelect = createSelect(dataMonth.map((month, index) => ({
    value: index + 1,
    text: month
})));
container.appendChild(monthSelect);

// Day Dropdown
const daySelect = document.createElement('select');
const updateDays = () => {
    const daysInMonth = new Date(yearSelect.value, monthSelect.value, 0).getDate();
    daySelect.innerHTML = Array.from({ length: daysInMonth }, (_, i) => {
        const day = i + 1;
        const suffix = day % 10 === 1 && day !== 11 ? 'st' :
                       day % 10 === 2 && day !== 12 ? 'nd' :
                       day % 10 === 3 && day !== 13 ? 'rd' : 'th';
        return `<option value="${day}">${day}${suffix}</option>`;
    }).join('');
    updateSelectedDate();
};

// Function to update and emit the selected date
const updateSelectedDate = () => {
    const year = yearSelect.value;
    const month = monthSelect.options[monthSelect.selectedIndex].text;
    const day = daySelect.value;
    const dateString = `${year}/${monthNameToNumber(month)}/${day}`;
    
    self.$emit('input', { [question.qid]: dateString });
};

// Event listeners for dropdown changes
[yearSelect, monthSelect, daySelect].forEach(select => {
    select.addEventListener('change', () => {
        if (select === yearSelect || select === monthSelect) updateDays();
        updateSelectedDate();
    });
});

// Initialize days and append day select
updateDays();
container.appendChild(daySelect);

// Convert month name to number dynamically
function monthNameToNumber(monthName) {
    const index = Object.values(monthNames).flat().indexOf(monthName);
    if (index === -1) throw new Error("Invalid month name");
    return index % 12 + 1; // Return month number (1-12)
}