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


const divContents = document.querySelectorAll('.content')

divContents.forEach((divContent) => {
	divContent.children.forEach((divAnswer, idx) => {
		const divCheck = divAnswer.querySelector('span.check')
		if (divCheck) {
			const uniqueId = `check_${idx}`; // Creating a unique ID
			divCheck.id = uniqueId; // Assigning the unique ID to the span element
			const style = document.createElement('style');
			style.textContent = `#${uniqueId}::before { content: "${idx + 1}" !important; }`;
			document.head.appendChild(style);
		}
	})
})