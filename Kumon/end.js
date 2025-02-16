setTimeout(() => {
  handleStyle(self, question, question.code.replace("Q", ""));

  const icParty = 'https://koeeru.com/wp-content/uploads/2025/01/icon-party.png';
  const textQ = {
    en: "Thank you!",
    ja: "Thank you!"
  }

  const qColumn = document.querySelector('.question.column');
  qColumn.style.gap = '38px !important';

  const btnFooter = document.querySelector('#btn_footer');
  btnFooter.style.display = 'none';

  const questionText = document.querySelector('.question-text');
  questionText.innerHTML = `アンケートは以上です。お忙しい中ご協力いただき、まことにありがとうございました。<p class="question-text__code"></p>`;

  const txtQ = document.querySelector('#text-question');
  txtQ.style.display = 'none';

  const numberQ = document.querySelector('#number-question');
  numberQ.textContent = textQ[self.lang];
  numberQ.style.fontSize = '24px';


  const newQuestionCode = document.createElement('div')
  newQuestionCode.setAttribute('id', 'contact-content')
  newQuestionCode.innerHTML = `
    <div id="btn_contact">お問合せ先</div>
    <p>株式会社公文教育研究会</p>
    <p>会員サービスチーム「お客様の声」係</p>
    <p>E-mail: Kumon-kaiin@kumon.co.jp</p>
    `;

  const newQuestion = document.querySelector('#new-question');
  newQuestion.style.width = '200px';

  const cardContent = document.querySelector('.card-content');
  cardContent.style.display = 'flex';
  cardContent.style.flexFlow = 'column';

  const divQuestion = document.querySelector('.page-wrap .question')
  divQuestion.appendChild(newQuestionCode)

  const btnEnd = document.querySelector('#btn_end');
  const newImg = document.createElement('div')
  newImg.innerHTML = `<img src="${icParty}" alt="Logo" id="ic_party">`
  const newEle = newImg.firstChild
  btnEnd.appendChild(newEle);
  btnEnd.addEventListener('click', () => {
    self.$emit('move-next', true);
    localStorage.clear();
  });

  var style = document.createElement('style');
  style.id = `${question.code}_style`
  style.type = 'text/css';
  style.innerHTML = `
  #text-question, #btn_footer {
      display: none;
  }
  #new-question {
      width: 200px;
  }
  .card-content {
      display: flex;
      flex-flow: column;
  }
  .question.column {
      gap: 38px;
      padding-bottom: 15px;
  }

  progress::-webkit-progress-bar {
      background-color: #7DCDF4 !important;
  }
`;
  document.getElementsByTagName('head')[0].appendChild(style);

}, 10)