//start create function set auto disabled
function autoSelectAndDisable(acode, qcode) {
  const answerLength = question.answers.length // current is 19

  // acode is answer
  // answerLength is answer length
  if (qcode !== "1" && acode === answerLength) return;

  // TH chon answer 1->4
  if (acode <= 4) {
    // disable start answer 5 -> 18
    for (let i = 5; i < answerLength; i++) {
      disableOptions(i)
    }
  }

  // TH chon answer 5->9
  if (acode >= 5 && acode <= 9) {
    // disable start answer 1 -> 4
    for (let i = 1; i < 5; i++) {
      disableOptions(i)
    }

    // disable start answer 10 -> 18
    for (let i = 10; i < answerLength; i++) {
      disableOptions(i)
    }
  }

  // TH chon answer 10->18
  if (acode >= 10 && acode <= 18) {
    // disable start answer 1 -> 10
    for (let i = 1; i < 10; i++) {
      disableOptions(i)
    }
  }
}
function disableOptions(i) {
  const questionLength = question.sub_questions.length
  // j start sub question 2
  for (let j = 2; j <= questionLength; j++) {
    self.disabled.push(`${question.qid}_${j}_${i}`)
    self.value[`${question.qid}_${j}_${i}`] = null
    // remove with op disbaled
    removeValueDisable(i, j)
  }
}
function removeValueDisable(i, j) {
  let index = self.selected[j]?.indexOf(i.toString());
  if (index !== -1) {
    self.selected[j].splice(index, 1);
  }
}
// end function set auto disabled

self.$watch('value', (newSelected, oldSelected) => {
  if (JSON.stringify(newSelected) === JSON.stringify(oldSelected)) return;
  //reset disabled option
  self.disabled = [];

  for (const squestion in newSelected) {
    const [, qcode, acode] = squestion.split('_') // [id, 1, 1]
    if (qcode === "1" && acode && self.value[`${question.qid}_${qcode}_${acode}`]) {
      const answerLength = question.answers.length
      for (let i = 1; i <= answerLength; i++) {
        if (i === answerLength) i = 99
        if (i != acode) {
          self.disabled.push(`${question.qid}_${qcode}_${i}`)
          self.value[`${question.qid}_${qcode}_${i}`] = null
        }
      }
      self.selected[qcode] = [acode]

      autoSelectAndDisable(acode, qcode) // after use disabled
    }
  }
})
self.showMobileView = true;

// reset new header for the first reload page
const newElements = document.querySelectorAll('.child-div');
newElements.forEach(function (newElement) {
  newElement.remove();
});

//  start call attach tag sub
function attachTagSub(parentDiv) {
  // for answer 1-4
  insertChildDiv('香港島', parentDiv.firstChild);
  // for answer 5-9
  insertChildDiv('九龍', parentDiv.children[5]);
  // for answer 10-18
  insertChildDiv('新界', parentDiv.children[11]);

  function insertChildDiv(text, targetElement) {
    const childDiv = document.createElement('div');
    childDiv.setAttribute('class', 'child-div');
    childDiv.style.fontWeight = 'bold';
    childDiv.textContent = text;

    if (targetElement) {
      parentDiv.insertBefore(childDiv, targetElement);
    }
  }
}
const elements = document.querySelectorAll('.content');
if (elements.length > 0) {
  for (let i = 0; i < elements.length; i++) {
    attachTagSub(elements[i])
  }
}
// end attach
console.log('ok')