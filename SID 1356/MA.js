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
const keyboards = document.querySelectorAll('span.keyboard')
if (keyboards) {
	keyboards.forEach((keyboard) => {
		keyboard.textContent = ''
	});
}
