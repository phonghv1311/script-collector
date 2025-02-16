self.showMobileView = true;

//add block name
const newElements = document.querySelectorAll('.child-div');
newElements.forEach(function (newElement) {
	newElement.remove();
});

const arrDivChild = {
	0: {
		ja: '[ ソニー FE（フルサイズEマウント） ズームレンズ]'
	},
	24: {
		ja: '[ ソニー E（APS-C Eマウント） ズームレンズ]'
	},
	35: {
		ja: '[ ソニー FE（フルサイズEマウント） 単焦点レンズ]'
	},
	60: {
		ja: '[ ソニー E（APS-C Eマウント）  単焦点レンズ]'
	},
	68: {
		ja: '[ シグマ フルサイズEマウント ズームレンズ]'
	},
	78: {
		ja: '[ シグマ APS-C Eマウントズームレンズ'
	},
	80: {
		ja: '[ シグマ フルサイズEマウント 単焦点レンズ]'
	},
	105: {
		ja: '[ シグマ APS-C Eマウント単焦点レンズ]'
	},
	109: {
		ja: '[ タムロン フルサイズEマウントズームレンズ]'
	},
	121: {
		ja: '[ タムロン APS-C Eマウントズームレンズ]'
	},
	125: {
		ja: '[ タムロン フルサイズEマウント単焦点レンズ]'
	},
	128: {
		ja: '[ その他　Eマウントレンズメーカー ]'
	},
}

function attachTagSub(parentDiv) {
	Object.entries(arrDivChild).forEach((divElement,idx) => {
		const textHeader = divElement[1][self.lang] + `_header ${idx}` || divElement[1]['ja']
		insertChildDiv(textHeader, parentDiv.children[Number(divElement[0]) + idx]);
	})
	function insertChildDiv(text, targetElement) {
		const childDiv = document.createElement('div');
		childDiv.setAttribute('class', 'child-div');
		childDiv.style.fontWeight = 'bold';
		childDiv.style.textDecoration = 'underline';
		childDiv.style.marginBottom = '15px';
		childDiv.style.color = '#1c1c21';
		childDiv.textContent = text;

		if (targetElement) {
			parentDiv.insertBefore(childDiv, targetElement);
		}
	}
}
const elementContents = document.querySelectorAll('.content')
if (elementContents.length > 0) {
	for (let i = 0; i < elementContents.length; i++) {
		attachTagSub(elementContents[i])
	}
}
// end add block name

// start hide answers
const codeFilter = 'F18' // change by filter
const numbersObject = Object.keys(result)
	.filter((key) => key.startsWith(codeFilter) && result[key] !== null)
	.map((key) => parseInt(key.replace(`${codeFilter}__`, "")))
	.reduce((obj, number) => ({ ...obj, [number]: true }), {});

// function hide header, If you don't use it, please comment
const numberArray = Object.keys(numbersObject) // answers [0, 25, 26, 61 ...]
const keysArray = Object.keys(arrDivChild);
console.log(numberArray, keysArray)

function hideHeader(elementContent) {
	Object.entries(arrDivChild).forEach((divChild, index) => {
		const indexDivChild = Number(divChild[0]) + index
		const isLessThanNumber = numberArray.some(key => {
			const numericFirst = Number(divChild[0])
			const numericNext = Number(keysArray[index + 1])

			return Number(key) > numericFirst && Number(key) <= numericNext
		});
		if (!isLessThanNumber) {
			if (elementContent.children[indexDivChild]) {
				elementContent.children[indexDivChild].style.display = 'none'
			}
		}
	})

	const maxNumber = Math.max(...numberArray.map(Number));
	const maxKey = Math.max(...keysArray.map(Number));
	if (Number(maxNumber) >= Number(maxKey)) {
		const indexDivChild = Number(maxKey + keysArray.length - 1)
		if (elementContent.children[indexDivChild]) {
			elementContent.children[indexDivChild].style.display = 'block'
		}
	}
}
// end function hide header

const contents = document.querySelectorAll('#survey .question .is-mobile .content')
Array.from(contents).forEach((content) => {
	// hide answer
	const elementAnswers = content.querySelectorAll('.field')
	Array.from(elementAnswers).forEach((answer, idx) => {
		if (!numbersObject[idx + 1]) {
			answer.style.display = 'none';
		}
	});

	// Call function hide header, If you don't use it, please comment
	hideHeader(content)
});

// end hide answers

// start disable answer selected
self.$watch('value', (newSelected, oldSelected) => {
	if (JSON.stringify(newSelected) === JSON.stringify(oldSelected)) return;
	//reset disabled option
	self.disabled = []

	for (const squestion in newSelected) {
		const [, qcode] = squestion.split('_');
		const acode = self.value[`${question.qid}_${qcode}_`] || null;

		for (let i = 2; i <= question.sub_questions.length; i++) {
			if (acode && (Number(qcode) === 1 || (Number(qcode) !== i && i > Number(qcode)))) {
				self.disabled.push(`${question.qid}_${i}_${acode}`);
				if (self.value[`${question.qid}_${i}_`] && acode === self.value[`${question.qid}_${i}_`]) {
					self.value[`${question.qid}_${i}_`] = null;
				}
			}
		}

		// save answer after select

		localStorage.removeItem(`sub_${qcode}`);
		if (acode) {
			saveAnswerSelected(qcode, acode)
		}
	}
})

function saveAnswerSelected(qcode, acode) {
	contents.forEach((content) => {
		const elementAnswers = content.querySelectorAll('.field')
		const answer = Array.from(elementAnswers).find((_, idx) => Number(acode) === (idx + 1));
		if (answer) {
			const element = answer.querySelector('span.control-label span');
			localStorage.setItem(`sub_${qcode}`, element.textContent);
		}
	});
}

// end disable answer selected

console.log('ok')