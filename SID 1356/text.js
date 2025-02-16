const customDiv = document.querySelector('.custom-bottom')
if (!customDiv) {
	// custom variable
	const logo = 'https://www.kumon.com/assets/images/kumon_logo.png'
	const textBack = {
		ja: '戻る' // default
	}
	const textNext = {
		ja: '次へ' // default
	}

	// Find the element with id "survey"
	const divContainer = document.querySelector('.container')
	const divSurvey = document.getElementById('survey')

	// create bottom
	const divBottom = document.createElement('div')
	divBottom.setAttribute('class', 'custom-bottom')
	divContainer.appendChild(divBottom) // set

	// add button for bottom
	const customBottom = document.querySelector('.custom-bottom')
	// add logo for header
	if (customBottom) {
		const newBottom = document.createElement('div')
		newBottom.innerHTML = `<div class="custom-submit">
	<button type="button" class="button btn__back">
		<span class="icon"><i class="mdi mdi-arrow-left mdi-24px"></i></span><span>${textBack[self.lang] || textBack.ja}</span>
	</button>

	<div class="progressBox">
	</div>

	<button type="button" class="button btn__next">
		<span>${textNext[self.lang] || textNext.ja}</span><span class="icon"><i class="mdi mdi-arrow-right mdi-24px"></i></span>
	</button>
</div>`
		customBottom.appendChild(newBottom.firstChild)

		// add progress
		const progressWrapper = document.querySelector('.progress-wrapper')
		const progressBox = document.querySelector('.progressBox')
		if (progressWrapper && progressBox) {
			progressBox.appendChild(progressWrapper)
		}
	}

	// create header
	const divHeader = document.createElement('div')
	divHeader.setAttribute('class', 'custom-header')
	divContainer.insertBefore(divHeader, divSurvey) //set
	const customHeader = document.querySelector('.custom-header')

	// add logo for header
	if (customHeader) {
		const newImg = document.createElement('div')
		newImg.innerHTML = `<img src="${logo}" alt="Logo">`
		const newEle = newImg.firstChild
		newEle.classList.add('logo')

		customHeader.appendChild(newEle)
	}


	// style css
	var style = document.createElement('style');
	style.id = 'q4style'
	style.type = 'text/css';
	style.innerHTML = `.card-content {
    overflow: auto !important;
    max-height: 50vh !important;
}
.form-nav, .form-submit {
    display: none !important;
}
.container {
    max-width: 992px !important;
}
.is-half {
    width: 90% !important;
}
.section {
    padding: 0;
}
.container, .card {
    background: #FFFAEE !important;
}
.custom-header, .custom-bottom {
    height: 80px;
    background: #9CCEF1;
    display: flex;
    position: relative;
}
.logo {
    align-self: center;
    padding-left: 1rem;
    height: 60px;
    object-fit: contain;
    max-width: 40% !important;
}
.question-text__code {
    width: fit-content !important;
    padding: 8px 24px !important;
    border-radius: 16px !important;
    background: #9CCEF1 !important;
    color: #fff !important;
    font-weight: 700 !important;
    font-size: 20px !important;
}
.custom-submit {
    justify-content: space-between;
    align-items: center;
    width: 80%;
    display: flex !important;
}
.custom-bottom {
    justify-content: center;
}
.progressBox {
    width: 30%
}
.btn__back, .btn__next {
    background: #FFFFFF!important;
    border-radius: 16px;
    color: #56B5FF !important;
    padding: 10px 24px !important;
    opacity: 1 !important;
}
.page-wrap {
    display: flex;
    margin: auto !important;
    margin-bottom: 0 !important;
    align-items: center;
}

.page-wrap .question.supported-keyboard .answer .button {
    background: unset !important;
    border: unset !important;
    color: #1A1612 !important;
}
.card-content .field .answer .b-checkbox {
    background: unset !important;
    border: unset !important;
    color: #1A1612 !important;
}
.card-content .field .answer .keyboard {
    background: #F2F2F2 !important;
    border: 1px solid #C1C1C1 !important;
    border-radius: 8px !important
}
.card-content .field .answer label.b-checkbox.checkbox.button.is-primary {
    background: unset !important;
    color: #1A1612 !important;
}
.page-wrap .question.supported-keyboard .answer .button.is-primary .keyboard {
    background: #E3B371 !important;
}

.question .question-content .card-content {
    padding: 8px 0 !important;
}
.question .question-content .card-content .is-desktop {
    display: none !important;
}
.question .question-content .card-content .is-mobile {
    display: block !important;
}

.question .question-content .card-content .is-mobile .card-content {
    background: #FFF !important;
    margin: 0 !important;
    padding: 0 !important;
}

.question .question-content .card-content .is-mobile .content {
    display: flex !important;
    width: 100% !important;
}
.question .question-content .card-content .is-mobile .content .field {
    padding: 0;
    margin-bottom: 0 !important;
    min-width: 20%;
}
.question .question-content .card-content .is-mobile .content .field label {
    display: flex;
    flex-flow: column-reverse;
    width: 100% !important;
}
span.control-label {
    padding: 0;
    padding: 2px !important;
    min-height: 50px;
    display: flex;
    align-items: center;
}
span.control-label span {
    width: 100% !important;
    text-align: center !important;
    font-size: 9px !important;
}
span.check {
    width: 100% !important;
    height: 54px !important;
    padding: 0;
    margin: 0 !important;
    border: unset !important;
    border-radius: unset !important;
    border-top: 1px solid #595959 !important;
}
.b-radio.radio input[type=radio]:checked+.check {
    background: #E3B371;
}
.b-radio.radio input[type=radio]+.check:before {
    content: "1" !important;
    position: unset;
    margin: auto;
    width: auto;
    height: auto;
    background: #FFF;
    font-size: 30px;
    align-items: center;
    justify-content: center;
    transform: unset;
    padding: 6px 16px;
}
.textarea[rows] {
    height: auto !important;
    background: rgb(255, 255, 255);
    border: 1px solid #A7A39E; 
}
.card-header-icon, .selected-option {
    display: none !important;
}
.collapse-content {
display: block !important;
}
.single-answer-matrix {
	width: 100% !important;
}
.single-answer-matrix .is-mobile .card-header {
   border-bottom: unset !important;
   
}

progress::-webkit-progress-bar {
  background-color: #FFF !important;
}
progress::-webkit-progress-value {
  background-color: #E3B371 !important;
}
.collapse.card {
    margin-bottom: unset !important;
    box-shadow: unset !important;
}
label.b-radio.radio.button.is-primary.is-selected.is-focused {
    box-shadow: none !important;
}
.single-answer-matrix .is-mobile .card-header .card-header-title {
    font-size: 1.4rem !important;
}

@media screen and (min-width: 540px) {
	.single-answer-matrix {
        padding: 30px 30px;
	}
	.question.column.is-8 {
        padding: 30px 50px !important;
	}
	span.control-label span {
	    font-size: 13px !important;
	}
}
@media screen and (min-width: 760px) {
	.is-half {
	    width: 80% !important;
	}
	.single-answer-matrix {
        padding: 30px 50px;
	}
	span.control-label span {
	    font-size: 18px !important;
	}
}
@media screen and (min-width: 992px) {
	.single-answer-matrix {
        padding: 20px 80px;
	}
	.question.column.is-8 {
        padding: unset !important;
	}
}
`;
	document.getElementsByTagName('head')[0].appendChild(style);
	// end style css
}

// event button next
const btnNext = document.querySelector('.btn__next')
if (btnNext) {
	btnNext.addEventListener('click', (e) => {
		e.preventDefault()
		self.$emit('move-next', true)
	})
}