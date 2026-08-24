const element = document.querySelector('#survey-scroller')
if (element) {
    element.style.display = 'block';
}

//set custom font
let font = document.createElement('link');
font.rel = 'stylesheet';
font.href = 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap';
document.getElementsByTagName('head')[0].appendChild(font);


//set custom css
const primaryColor = '#E10D12'; // Primary color (background, borders)
const textColorLight = '#ffffff'; // Light text color (e.g. text on primary background)
const textColorDark = '#000000'; // Dark text color (e.g. text on light background or borders)

var style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = `
html body {
    font-family: 'Helvetica', sans-serif !important;
}

.question-text__question {
    font-size:1rem;
    line-height:1.5rem;
    font-weight:600;
}

.keyboard {
    border:none !important;
    color: ${primaryColor} !important;
    min-height: unset;
    min-width: unset;
    font-family: 'Helvetica', sans-serif;
    font-size: 1.5rem
}
.question-text__code {
    color: ${primaryColor} !important;
}
.b-radio.radio.button {border-radius: 30px;}
.button.is-primary,
.button.is-primary.is-active,
.button.is-primary:active,
.button.is-primary.is-hovered,
.button.is-primary:hover{
    background-color: ${primaryColor} !important;
    color: ${textColorLight} !important;
    box-shadow: unset !important;
}

.b-radio.radio:hover input[type=radio]:not(:disabled)+.check,
.b-radio.radio input[type=radio]:checked+.check,
.b-radio.radio input[type=radio]:focus+.check,
.input:active, .input:focus, .is-active.input, .is-active.textarea, .is-focused.input, .is-focused.textarea, .select select.is-active, .select select.is-focused, .select select:active, .select select:focus, .taginput .is-active.taginput-container.is-focusable, .taginput .is-focused.taginput-container.is-focusable, .taginput .taginput-container.is-focusable:active, .taginput .taginput-container.is-focusable:focus, .textarea:active, .textarea:focus
{
    border-color: ${primaryColor} !important;
    box-shadow: unset !important;
}

.b-radio.radio input[type=radio]+.check:before,
.datepicker .datepicker-table .datepicker-body .datepicker-cell.is-selected
{
    background-color: ${primaryColor} !important;
}

.b-radio.radio.button.is-primary{
    box-shadow: unset !important;
    border: 2px solid ${primaryColor} !important;
    color: ${textColorDark};
}

.option {
    font-size:1.2rem;
    font-weight:500;
}

.column.form-submit{
    justify-content: center;
}

button[type=submit]{
    padding: 25px 90px;
    background: ${primaryColor};
    border-radius: 40px;
    border: none;
    font-size:1.2rem;
    font-weight:500;
    font-family: 'Helvetica', sans-serif;
}

.help{
    background: ${primaryColor};
    display: inline-block;
    padding: 0px 10px;
    color: ${textColorLight} !important;
    border-radius: 3px;
}

.page-wrap .question.supported-keyboard .answer .button {
    border-top-right-radius: 100px;
    border-bottom-right-radius: 100px;
    border-bottom-left-radius: 100px;
    border-top-left-radius: 100px;
    padding: 8px 12px;
}
.page-wrap .question.supported-keyboard .answer .button.is-primary .keyboard {
    border-radius: 50%;
}

textarea.fa-input,
.is-borderless input {
    border-bottom: 1px solid ${primaryColor} !important;
}

.has-text-success {
    color: ${primaryColor} !important;
}

.category-title {
    font-size: 1.3rem !important;
    font-weight: bold !important;
    text-decoration: underline !important;
    color: ${primaryColor}!important;	
    }

.section {
  padding: 1rem 1.5rem;
}

.progress.progress.is-tiny.is-dark-green::-webkit-progress-value {
    background: ${primaryColor};
}

.progress.progress.is-tiny.is-dark-green::-moz-progress-bar {
    background: ${primaryColor};
}

.button.is-primary.is-outlined { display: none!important; }
`;
document.getElementsByTagName('head')[0].appendChild(style);

// code display logo
const hasImg = document.getElementById('element-img')
if (hasImg) {
    hasImg.remove()
}
const surveyController = document.querySelector("#survey-scroller")
const newDiv = document.createElement("div")
const img = document.createElement("img")
img.src = "https://admin.collector.koeeru.com/ckfinder/survey_GILT2VJPXF/images/LOGO%E2%91%A0(1).jpg" // Replace with the actual path to your image

img.style.width = '27%'

const withScreen = window.innerWidth
if(withScreen && withScreen <= 768) {
    img.style.width = '100%'
}

newDiv.id = "element-img"
newDiv.appendChild(img)
newDiv.style.padding = '5px'
newDiv.style.textAlign = 'center';
surveyController.insertBefore(newDiv, surveyController.firstChild)
