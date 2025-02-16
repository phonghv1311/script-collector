//Q2 final

setTimeout(() => {
  const eleQuestion = document.querySelector('.columns .question:nth-child(2)');
  if (eleQuestion) eleQuestion.style.display = 'none';
}, 1000)

// start code for set input FA
// FA hidden questions if any
const eleQuestion = document.querySelector('.columns .question:nth-child(2)');
if (eleQuestion) eleQuestion.style.display = 'none';

// delete input when back
const elements = document.querySelectorAll('.new-input');
elements.forEach(function (element) {
  element.remove();
});

// function render text
function renderText() {
  const arrLang = {
    'en': 'Please enter your answer.',
    'en-AU': 'Please enter your answer.',
    'en-GB': 'Please enter your answer.',
    'zh-CN': '请输入您的答案。',
    'zh-TW': '請輸入你的回答。',
    'fr': 'Entrez votre réponse.',
    'de': 'Bitte geben Sie Ihre Antwort ein.',
    'it': 'Inserisci la tua risposta.',
    'es': 'Por favor escribe tu respuesta.',
  }

  return arrLang[self.lang] || 'Placholder defaut if null';
}

// function create input and text, style
function createTextareaPc(parentElement) {
  const txtPlaceholder = renderText()
  parentElement.style.cssText = 'display: flex; justify-content: space-between;';
  const textarea = document.createElement('textarea');
  textarea.setAttribute('rows', '1');
  textarea.setAttribute('placeholder', txtPlaceholder);
  textarea.setAttribute('class', 'textarea fa-input new-input');
  textarea.style.height = '32px';
  textarea.style.maxWidth = '72%';
  textarea.style.minWidth = '100px';
  textarea.style.padding = '0';
  textarea.style.paddingLeft = '5px';
  textarea.style.paddingTop = '5px';

  parentElement.appendChild(textarea);
}
function createTextareaMb(parentElement) {
  const txtPlaceholder = renderText()
  const textarea = document.createElement('textarea');
  textarea.setAttribute('rows', '1');
  textarea.setAttribute('placeholder', txtPlaceholder);
  textarea.setAttribute('class', 'textarea fa-input new-input');
  textarea.style.cssText = 'height: 32px;';
  textarea.style.padding = '0';
  textarea.style.paddingLeft = '5px';
  textarea.style.paddingTop = '5px';

  const oneChild = parentElement.children[1] || parentElement.children[0];
  if (oneChild) {
    parentElement.insertBefore(textarea, oneChild);
  }
}
// function create new input
const createNewInput = async () => {
  // get element of PC to create input
  // PC
  const parentElement = document.querySelector('.is-desktop .table');
  if (parentElement) {
    const lastDivElement = parentElement.querySelector('tr:last-child td');
    if (lastDivElement) createTextareaPc(lastDivElement);
  }

  // get element of Mobile to create input

  // Mobile
  const parentElementMb = document.querySelector('.is-mobile'); // get content mobile
  if (parentElementMb) {
    const tagCategory = parentElementMb.querySelector('.category-content:last-child .collapse'); // TH content is list category-content
    if (tagCategory) {
      createTextareaMb(tagCategory);
    } else {
      const tagCollapse = parentElementMb.querySelector('.collapse:last-child'); // TH content is list collapse
      if (tagCollapse) {
        createTextareaMb(tagCollapse);
      }
    }
  }
  // end mobile
}


// auto set FA
const setValueFa = async () => {
  const QFA = 'Q2_FA' // only change question FA at here
  const inputElement = document.querySelectorAll('.new-input');
  const questionFA = window.customEnterSubmit.questions.find((question) => question.code === QFA)
  inputElement.forEach(function (element) {
    element.addEventListener('input', (event) => {
      // Handle input change event here
      const inputValue = event.target.value;
      self.value[questionFA.qid] = inputValue
    });
  });
}
// end code set input FA

// run function create new input
setTimeout(async () => {
  await createNewInput()
  await setValueFa()
}, 1000)

console.log('ok')