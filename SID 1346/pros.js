// style css zoom
var style = document.createElement('style');
style.id = 'q4style'
style.type = 'text/css';
style.innerHTML = `
.dialog .modal-card-body {
    padding: 2rem;
}

.dialog footer {
    padding: 10px 14px;
}

.dialog footer .button {
    font-size: 1rem !important;
}
`;
document.getElementsByTagName('head')[0].appendChild(style);
// end style css

const arrQuestion = ['PROS_1', 'PROS_2', 'PROS_3'] // all question code of FA
const messages = {
	en: 'Please answer at least 1 of the following questions',
	vi: 'Vui lòng trả lời tối thiểu 1 trong các câu hỏi sau',
} // all message by language

// hide question script
const allQuestion = document.querySelectorAll('#survey .columns .question')
if (allQuestion.length > 0) {
	allQuestion[allQuestion.length - 1].style.display = 'none'
}
// end hide question script


window.removeEventListener("keypress", window.customEnterSubmit.enterListener); // remove event enter for first

// get btn submit
// TH desktop
const elementBtn = document.querySelectorAll('#survey .form-submit .button') // btn desktop
const btnSubmit = elementBtn[1] || elementBtn[0]
btnSubmit.removeAttribute('type')

// TH Mobile
const elementBtnMobile = document.querySelectorAll('#survey .form-nav .nav .button') // btn mobile
let btnSubmitMobile = null
if (elementBtnMobile.length > 0) {
	btnSubmitMobile = elementBtnMobile[1] || elementBtnMobile[0]
	btnSubmitMobile.removeAttribute('type')
}
// end get button submit

// get question display
const arrRefQcode = []
arrQuestion.forEach((qcode) => {
	const refQCode = window.customEnterSubmit.$refs[`ref${qcode}`]
	if (refQCode) {
		arrRefQcode.push(refQCode[0])
	}
})

//show popup
function showPopup() {
	let isValidate = false
	arrRefQcode.forEach((qcode) => {
		if (self.value[qcode.question.qid] && self.value[qcode.question.qid].split(/\s+/).filter(word => word.length > 0) > 3) {
			isValidate = true
		}
	})

	if (isValidate) {
		resetEventHandler()
		self.$emit('move-next', true)
		return;
	}

	const dialog = document.querySelector('.dialog')
	if (dialog) {
		return;
	}
	self.$buefy.dialog.alert({
		message: messages[self.lang] || messages.en,
		confirmText: 'Close',
	})
}

// event for click
const eventHandler = function (e) {
	if (!arrRefQcode) {
		self.$emit('move-next', true)
		return;
	}
	showPopup();
	e.preventDefault();
};
//event for enter
const eventEnterHandler = function (e) {
	if (e.key === 'Enter' || e.keyCode === 13) {
		if (!arrRefQcode) {
			self.$emit('move-next', true)
			return;
		}
		showPopup();
		e.preventDefault();
	}
};

// check when user input value
self.$watch('value', () => {
	let checkValidate = false
	arrRefQcode.forEach((qcode) => {
		if (self.value[qcode.question.qid] && self.value[qcode.question.qid].split(/\s+/).filter(word => word.length > 0) > 3) {
			checkValidate = true
		}
	})

	if (checkValidate) {
		resetEventHandler()
	} else {
		addEventHandler()
	}
})

function resetEventHandler() {
	window.addEventListener("keypress", window.customEnterSubmit.enterListener);
	window.removeEventListener("keypress", eventEnterHandler);
	btnSubmit.removeEventListener("click", eventHandler);
	if (btnSubmitMobile) {
		btnSubmitMobile.removeEventListener("click", eventHandler);
	}
}

// reset when have button back
function resetClickBackButton() {
	if (elementBtn[1]) {
		elementBtn[0].addEventListener('click', () => {
			resetEventHandler()
		})
	}
	if (elementBtnMobile[1]) {
		elementBtnMobile[0].addEventListener('click', () => {
			resetEventHandler()
		})
	}
}
resetClickBackButton()
// end reset

function addEventHandler() {
	if (btnSubmitMobile) {
		btnSubmitMobile.addEventListener("click", eventHandler);
	}
	btnSubmit.addEventListener("click", eventHandler);
	window.addEventListener("keypress", eventEnterHandler);
}
addEventHandler() // run

console.log('ok')