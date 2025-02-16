self.$watch('value', (newSelected, oldSelected) => {
  if (JSON.stringify(newSelected) === JSON.stringify(oldSelected)) return;
  //reset disabled option
  self.disabled = [];

  for (const squestion in newSelected) {
    const [, qcode, acode] = squestion.split('_') // [id, 1, 1]
    if (qcode === "1" && acode && self.value[`${question.qid}_${qcode}_${acode}`]) {
      const answerLength = question.answers.length + 1

      for (let i = 1; i <= answerLength; i++) {
        if (i != acode) {
          self.disabled.push(`${question.qid}_${qcode}_${i}`)
          self.value[`${question.qid}_${qcode}_${i}`] = null
        }
      }

      self.selected[qcode] = [acode]
    }
  }

})
self.showMobileView = true;


const elements = document.querySelectorAll('.content');
if (elements.length > 0) {
  for (let i = 0; i < elements.length; i++) {
    attachTagSub(elements[i])
  }
}
function attachTagSub(parentDiv) {
  // for answer 1-4
  // Create a new div element
  const childDiv = document.createElement('div');
  childDiv.setAttribute('class', 'child-div');
  childDiv.textContent = '香港島';

  // Get the first child element within the parent div
  const firstChild = parentDiv.firstChild;

  // Insert the new div before the first child
  parentDiv.insertBefore(childDiv, firstChild);
  // end

  // for answer 5-9
  const newDiv = document.createElement('div');
  newDiv.textContent = '九龍';
  newDiv.setAttribute('class', 'child-div');

  const fourthChild = parentDiv.children[5];

  if (fourthChild) {
    parentDiv.insertBefore(newDiv, fourthChild);
  }
  // end

  // for answer 10-18
  const newDiv2 = document.createElement('div');
  newDiv2.textContent = '新界';
  newDiv.setAttribute('class', 'child-div');

  const tenChild = parentDiv.children[11];

  if (tenChild) {
    parentDiv.insertBefore(newDiv2, tenChild);
  }
  // end
}