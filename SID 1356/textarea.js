const btnNext = document.querySelector('.btn__next')
if (btnNext) {
	btnNext.addEventListener('click', (e) => {
		e.preventDefault()
		self.$emit('move-next', true)
	})
}

// move back
const btnBack = document.querySelector('.btn__back')
if (btnBack) {
	btnBack.addEventListener('click', (e) => {
		e.preventDefault()
		self.$emit('move-back', true)
	})
}

// Assuming you have a textarea element with an ID of "myTextarea"
const textarea = document.querySelector('textarea');
if (textarea) {
	textarea.rows = 15;
}