const vueInstance = window.customEnterSubmit
const survey = vueInstance.survey
survey.supported_languages = survey.supported_languages.filter((lang) => lang !== 'ja')
self.$store.commit('SET_SURVEY',  survey)

// code display image Bee
const hasImg = document.getElementById('element-img')
if (hasImg) {
    hasImg.remove()
}
const surveyController = document.querySelector("#survey-scroller")
const newDiv = document.createElement("div")
const img = document.createElement("img")
img.src = "https://admin.collector.koeeru.com/ckfinder/survey_CYZP2M8RHW/images/Picture3.jpg" // Replace with the actual path to your image
img.style.width = '110px'
const withScreen = window.innerWidth
if (withScreen && withScreen <= 768) {
    img.style.width = '80px'
}
newDiv.id = "element-img"
newDiv.appendChild(img)
newDiv.style.padding = '5px'
newDiv.style.textAlign = 'right'
surveyController.insertBefore(newDiv, surveyController.firstChild)
//set custom font
let font = document.createElement('link');
font.rel = 'stylesheet';
font.href = 'https://fonts.googleapis.com/css2?family=Goldman:wght@400;700&display=swap';
document.getElementsByTagName('head')[0].appendChild(font);


//set custom css
var style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = `
.keyboard {
    min-width: 42px !important;
}
.vue-dropzone {
    border: 3px dashed #019E41 !important;
}
.dropzone-custom-title {
    color: #019E41 !important;
}
textarea.fa-input {
    border-bottom: 1px solid #019E41 !important;
}
#question-content img {
    max-height: 300px;
}
  .has-text-success {
    display: none;
  }
.mobile-progress { display: none; }
.is-hidden-touch {
    display: flex !important;
}
#element-img {
    position: relative;
    top: 6%;
    right: 10%;
}
#element-img img {
    width: 160px !important;
}
.category-title {
    font-weight: bold !important;
}
.form-nav {
    flex-direction: column-reverse;
    gap: 10px;
}
.page-wrap {
    min-height: calc(100vh - 20rem);
}
.button.is-primary.is-focused:not(:active), .button.is-primary:focus:not(:active) {
    box-shadow: unset !important;
}

@media screen and (min-width: 769px){
    .columns .supported-keyboard.is-8 {
        width: 50% !important;
    }
    .question.column.is-8 {
        width: 50% !important;
    }
}


@media screen and (max-width: 1024px){
    .section {
        padding: 0.5rem 3rem 3rem 3rem;
    }
}


.question-text__question {
    color: #363636 !important;
    font-size:1rem !important;
    line-height:1.5rem;
    font-weight:bold;
}

.page-wrap .question .question-text {
    background-position: bottom;
    background-size: 10px 10px;
    background-repeat: repeat-x;
    padding-bottom: 2rem;
    margin-bottom:0.5rem !important;
}
.keyboard {
    border:none !important;
    color: #019E41 !important;
    min-height: unset;
    min-width: unset;
    font-family: 'Goldman', cursive, sans-serif;
    font-size: 1.7rem
}
.b-radio.radio.button {border-radius: 30px;}
.button.is-primary,
.button.is-primary.is-active,
.button.is-primary:active,
.button.is-primary.is-hovered,
.button.is-primary:hover{
    background-color: #0389D1;
}

.b-radio.radio.button.is-primary{
    background-color: #fff;
    border: 2px solid #0389D1;
    color: #000;
    box-shadow: none !important;
}

.column.form-submit{
    justify-content: center;
}
button[type=submit]{
    padding: 25px 90px;
    background: rgb(3,137,209);
    background: linear-gradient(90deg, rgb(3,137,209) 22%, rgb(3,137,209) 100%);
    border-radius: 40px;
    border: none;
    font-size:1.2rem;
    font-weight:bold;
}
.help{
    background: #019E41;
    display: inline-block;
    padding: 0px 10px;
    color: #ffffff !important;
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
.button.is-primary {
    background-color: #0389D1 !important;
    color: #fff !important;
}
.custom-bottom {
        width: 100%;
        margin-top: 13px;
    }

    .progressBox {
        width: 90%
    }

    .progress, .progress-wrapper.is-not-native {
        width: 100% !important;
        max-width: 470px !important;
        height: 24px;
    }

    progress::-webkit-progress-bar {
        background-color: #E1ECF2 !important;
    }

    progress::-moz-progress-bar {
      background-color: #0389D1 !important; /* Progress color */
    }
    progress::-ms-progress-bar {
      background-color: #0389D1 !important; /* Progress color */
    }
    progress::-webkit-progress-value {
      background-color: #0389D1 !important; /* Progress color */
    }
    progress::-ms-fill {
      background-color: #0389D1 !important; /* Progress color */
    }

.button.is-primary.is-outlined { display: none!important; }

button[type=button]{
    padding: 25px 90px;
    background: rgb(3,137,209);
    background: linear-gradient(90deg, rgb(3,137,209) 22%, rgb(3,137,209) 100%);
    border-radius: 40px;
    border: none;
    font-size:1.2rem;
    font-weight:bold;color: #ffffff !important;
}


@media screen and (max-width: 768px){
    #element-img {
        margin-bottom: 50px;
    }
    button[type=button], button[type=submit]{
        padding: 18px 58px;
    }
    button, label {
        cursor: unset !important;
    }
}
`;
document.getElementsByTagName('head')[0].appendChild(style);
document.getElementsByClassName('button is-outlined')[0].style.display='none';