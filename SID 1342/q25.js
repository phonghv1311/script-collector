self.showMobileView = true;

// insert ans from SAMT
// const spanSub = document.querySelectorAll('#survey .card-header-title span.txt-sub-question');
// const arrText = question.sub_questions.map((_, idx) => localStorage.getItem(`sub_${idx + 1}`)).filter(txt => txt);
// arrText.forEach((text, index) => {
// 	if (spanSub[index]) {
// 		spanSub[index].textContent = text;
// 	}
// });
// end insert answers from SAMT

// randomize answers MAMT
const groups = [
	[1, 2, 3, 4, 5, 6, 7, 8],
	[9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
];
const firstValueLastBox = 21; // code of last box want fix

//fill missing answer codes
groups.push(
	question
		.answers
		.filter((answer) => !groups.flat().includes(parseInt(answer.code)))
		.map(answer => parseInt(answer.code))
)

const answers = shuffle(groups).reduce((acc, group) => {
	const items = group.map(function (code) {
		return question.answers.find(answer => parseInt(answer.code) === code)
	})

	return [
		...acc,
		...items
	]
}, [])

question.answers = answers

function shuffle(array) {
	let currentIndex = array.length, randomIndex;

	// While there remain elements to shuffle.
	while (currentIndex > 0) {

		// Pick a remaining element.
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		// And swap it with the current element.
		[array[currentIndex], array[randomIndex]] = [
			array[randomIndex], array[currentIndex]];
	}

	// fixed question
	const keyAnswer = array.findIndex(element => element.length === 1);
	const valueAnswer = array.find(element => element.length === 1);
	if (keyAnswer && valueAnswer) {
		array.splice(keyAnswer, 1);
		array.push(valueAnswer)
	}
	//end

	// fixed box
	array.sort((a, b) => (a.includes(firstValueLastBox) ? 1 : -1));
	// end fixed box

	return array;
}


//add block name
const newElements = document.querySelectorAll('.child-div');
newElements.forEach(function (newElement) {
	newElement.remove();
});

const firstValueOfBox = [1, 9, 21];
const arrDivChild = {
	1: {
		ja: '[ ソニー FE（フルサイズEマウント） ズームレンズ]'
	},
	9: {
		ja: '[ ソニー E（APS-C Eマウント） ズームレンズ]'
	},
	21: {
		ja: '[ ソニー FE（フルサイズEマウント） 単焦点レンズ]'
	},
}

function attachTagSub(parentDiv) {
	const keys = []
	firstValueOfBox.forEach(acode => {
		const keyBox = question.answers.findIndex(obj => Number(obj.code) === Number(acode));
		keys.push(keyBox)
	});
	keys.sort((a, b) => a - b)
	keys.forEach((key, idx) => {
		const acode = Number(question.answers[key].code)
		insertChildDiv(arrDivChild[acode][self.lang] || arrDivChild[acode]['ja'], parentDiv.children[key + idx]);
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
console.log('ok')