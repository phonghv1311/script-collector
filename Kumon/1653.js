const vueInstance = window.customEnterSubmit
const survey = vueInstance.survey
survey.supported_languages = survey.supported_languages.filter((lang) => lang !== 'ja')
self.$store.commit('SET_SURVEY', survey)

// Set the flag when the page is being unloaded
window.addEventListener('beforeunload', function () {
  sessionStorage.clear(); // test nhanh hay comment
});

// Clear session storage when the page is about to be hidden or unloaded
window.addEventListener('pagehide', function () {
  sessionStorage.clear(); // Clear session storage
});


const links = [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'crossorigin' },
  { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100..900&display=swap' }
];

links.forEach(({ rel, href, crossorigin }) => {
  const link = document.createElement('link');
  link.rel = rel;
  link.href = href;
  if (crossorigin) link.crossOrigin = crossorigin;
  document.head.appendChild(link);
});

const customDiv = document.querySelector('.custom-bottom')
if (!customDiv) {
  // custom variable
  const logo = 'https://admin.collector.koeeru.com/ckfinder/survey_ZH73DHLOUQ/images/Kumon-Logo.png';
  const logoKoeeru = 'https://koeeru.com/wp-content/themes/koeeru-new/assets/image/common/logo.svg';
  const textBack = {
    ja: '戻る',
    'zh-TW': '返回',
    pt: 'Voltar',
    th: 'กลับ',
    id: 'Kembali',
    en: 'Back'
  }
  const textNext = {
    ja: '次へ',
    'zh-TW': '下一步',
    pt: 'Próximo',
    th: 'ถัดไป',
    id: 'Berikutnya',
    en: 'Next'
  }

  // Find the element with id "survey"
  const divContainer = document.querySelector('.container')
  const divSurvey = document.getElementById('survey')

  // create bottom
  const divBottom = document.createElement('div')
  divBottom.setAttribute('class', 'custom-bottom')
  divContainer.appendChild(divBottom) // set

  // add button for bottom
  const customBottom = document.querySelector('.custom-bottom')
  // add logo for header
  if (customBottom) {
    const newBottom = document.createElement('div')
    newBottom.innerHTML = `<div class="custom-submit">
              <div class="progressBox">
              </div>

              <div id="btn_footer">
                  <button type="button" class="button btn__back">
                      <div class="box-btn"><span class="icon"><i class="mdi mdi-arrow-left mdi-24px"></i></span><span class="txt-back">${textBack[self.lang] || textBack.ja}</span></div>
                  </button>
                  <button type="button" class="button btn__next">
                      <div class="box-btn"><span>${textNext[self.lang] || textNext.ja}</span><span class="icon"><i class="mdi mdi-arrow-right mdi-24px"></i></span></div>
                  </button>
              </div>
          </div>`
    customBottom.appendChild(newBottom.firstChild)

    // add progress
    const progressWrapper = document.querySelector('.progress-wrapper')
    const progressBox = document.querySelector('.progressBox')

    if (progressWrapper && progressBox) {

      // set %
      const progressElement = document.querySelector('.progress');
      if (progressElement) {
        // Get the max and value attributes
        const max = progressElement.getAttribute('max');
        const value = progressElement.getAttribute('value');

        const percentage = Math.round((value / max) * 100);
        const percentageText = document.createElement('span');
        percentageText.setAttribute('id', 'percentage')
        percentageText.textContent = ` ${percentage}%`;

        progressBox.appendChild(percentageText);
      }

      // set progress
      progressBox.appendChild(progressWrapper)

      // set logo 
      // const newImg = document.createElement('div')
      // newImg.innerHTML = `<img src="${logoKoeeru}" alt="Logo" id="logo-koeeru">`
      // const newEle = newImg.firstChild
      // newEle.classList.add('logo-koeeru');

      // progressBox.appendChild(newEle);
    }
  }

  // create header
  const divHeader = document.createElement('div')
  divHeader.setAttribute('class', 'custom-header')
  divContainer.insertBefore(divHeader, divSurvey) //set
  const customHeader = document.querySelector('.custom-header')

  // add logo for header
  if (customHeader) {
    const newImg = document.createElement('div')
    newImg.innerHTML = `<img src="${logo}" alt="Logo">`
    const newEle = newImg.firstChild
    newEle.classList.add('logo')

    customHeader.appendChild(newEle)
  }


  // style css
  var style = document.createElement('style');
  style.id = `${question.code}_style`
  style.type = 'text/css';
  style.innerHTML = `

    .has-text-success {
      display: none;
    }
    #percentage {
      font-size: 14px;
      font-weight: 700;
      line-height: 21px;
      text-align: left;
      text-underline-position: from-font;
      text-decoration-skip-ink: none;
    }
      
      #survey span, #survey p, #survey, #percentage, .collpase-title {
        font-family: Noto Sans JP !important;
      }

      .section {
          position: relative;
          padding-top: 80px;
      }

      .container {
          max-width: 992px !important;
          position: relative;
          display: flex;
          flex-flow: column;
          align-items: center;
      }
      .custom-header {
          position: absolute;
          width: 80%;
          top: -3rem;
          height: 80px;
          background: #9CCEF1;
          display: flex;
          justify-content: center;
      }

      .logo {
          align-self: center;
          padding-left: 1rem;
          object-fit: contain;
          max-width: 40% !important;
      }
      #logo-koeeru {
          width: 84px;
          height: 16px;
      }

      #survey {
          background-color: #FFFAEE !important;
          border-radius: 16px;
          width: 100%;
      }

      .button {
        border-width: 3px !important;
      }

      .page-wrap .question .question-content {
          box-shadow: none !important;
          background-color: unset !important;
      }

      #title-text {
        font-size: 24px;
        font-weight: 700;
        line-height: 36px;
        text-align: left;
        text-underline-position: from-font;
        text-decoration-skip-ink: none;
      }

      .form-nav, .form-submit {
          display: none !important;
      }

      #btn_footer {
          display: flex;
          gap: 16px;
      }

      .btn__back, .btn__next {
          border-radius: 16px;
          color: #56B5FF !important;
          padding: 0 64px !important;
          opacity: 1 !important;
          font-weight: bold;
          min-width: 250px;
      }

      .btn__next {
          background: #9CCEF1 !important;
          color: #FFFFFF !important;
      }

      .button, .button.is-focused, .button:focus {
          border-color: #9CCEF1 !important;
      }

      .custom-submit {
          justify-content: space-between;
          align-items: center;
          width: 100%;
          display: flex !important;
      }

      .custom-bottom {
          width: 100%;
          margin-top: 13px;
      }

      .progressBox {
          width: 90%;
          margin-bottom: 20px;
      }

      .progress, .progress-wrapper.is-not-native {
          width: 90% !important;
          max-width: 470px !important;
          height: 24px;
      }

      progress::-webkit-progress-bar {
          background-color: #E1ECF2 !important;
      }

      progress::-moz-progress-bar {
        background-color: #7DCDF4 !important; /* Progress color */
      }
      progress::-ms-progress-bar {
        background-color: #7DCDF4 !important; /* Progress color */
      }
      progress::-webkit-progress-value {
        background-color: #7DCDF4 !important; /* Progress color */
      }
      progress::-ms-fill {
        background-color: #7DCDF4 !important; /* Progress color */
      }

      .progress-wrapper:not(:last-child) {
          margin-bottom: 0.8rem !important;
      }

      .page-wrap {
          display: flex;
          margin: auto !important;
          margin-bottom: 0 !important;
          align-items: center;
          min-height: calc(100vh - 20rem) !important;
      }

      .question.column {
          display: flex;
          padding: 90px;
          width: 100% !important;
          background: no-repeat;
          position: relative;
      }

      .question-content.card {
          align-self: center;
      }

      .textarea[rows] {
          height: auto !important;
          background: rgb(255, 255, 255);
          border: 0;
          border-radius: 12px;
          padding: 20px 34px;
          overflow: auto;
        }

        .button.is-focused:not(:active), .button:focus:not(:active) {
          box-shadow: none !important;
        }

        .box-btn {
          display: flex;
          font-size: 24px;
          font-weight: 700;
        }

      .page-wrap .question.supported-keyboard .answer .button .option {
        font-size: 16px;
        font-weight: 400;
        line-height: 24px;
        text-align: center;
      }

      #header-end {
        font-size: 18px;
        font-weight: 400;
        line-height: 28px;
        color: #000000;
        text-align: center;
      }

      #btn_end {
        font-size: 24px;
        font-weight: 700;
        line-height: 36px;
        margin-top: 26px;
        width: fit-content;
        align-self: center;
        border-radius: 48px;
        background-color: #FAAF18;
        padding: 4px 36px;
        color: #ffffff;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-flow: row-reverse;
        cursor: pointer;
      }

      #contact-content {
        font-size: 18px;
        font-weight: 400;
        line-height: 28px;
        display: flex;
        flex-flow: column;
        gap: 3px;
        color: #000;
      }

      #btn_contact {
        background-color: #00A9E0;
        width: fit-content;
        border-radius: 48px;
        padding: 4px 24px;
        font-size: 14px;
        font-weight: 700;
        line-height: 21px;
        color: #fff;
      }

      @media screen and (max-width: 920px) {
          #ic_party {
            width: 42px;
          }
          #btn_end {
            font-size: 18px;
            line-height: 27px;
            padding: 10px 15px;
          }

          .section {
            padding: 3rem 0 !important;
            padding-top: 80px !important;
            padding-bottom: 100px !important;
          }
          .page-wrap {
            padding: 100px 28px;
          }

          .question.column {
            padding: 0;
          }

          .custom-header {
            top: -2rem;
            height: 62px;
          }

          .custom-submit {
            flex-flow: column;
          }

          .custom-bottom {
            padding: 0 28px;
          }

          .progress, .progress-wrapper.is-not-native {
            max-width: 100% !important;
            width: 100% !important;
          }

          #logo-koeeru {
            position: absolute;
            bottom: -5rem;
          }

          .btn__back, .btn__next {
            padding: 0 40px !important;
            min-width: 200px;
          }

          
        #title-text {
          font-size: 22px;
          font-weight: 700;
          line-height: 33px;
          text-align: left;
          text-underline-position: from-font;
          text-decoration-skip-ink: none;
        }

        .box-btn {
          font-size: 18px;
        }

        .page-wrap .question.supported-keyboard .answer .button .option {
          font-size: 16px;
          font-weight: 400;
          line-height: 24px;
        }

        .checkbox,
        .radio,
        label,
        .button,
        .checkbox input, .radio input,
        .b-radio.radio input[type=radio]+.check {
          cursor: unset !important;
          -webkit-tap-highlight-color: transparent !important;
        }

        label,
        .checkbox:hover, .radio:hover,
        .checkbox:focus, .radio:focus {
          background: unset !important;
          outline: none;
          cursor: unset !important;
          -webkit-tap-highlight-color: transparent !important;
        }
      }

      @media screen and (max-width: 460px) {
        .btn__back, .btn__next {
          padding: 0 20px !important;
          min-width: 140px;
        }
      }
  `;
  document.getElementsByTagName('head')[0].appendChild(style);
  // end style css
}

// event button next
const btnNext = document.querySelector('.btn__next')
if (btnNext) {
  btnNext.addEventListener('click', (e) => {
    e.preventDefault()
    self.$emit('move-next', true)
  })
}

const questionText = document.querySelector('.question-text');
questionText.style.display = 'none';

const btnBack = document.querySelector('.btn__back');
btnBack.style.display = 'none';

const script = document.createElement('script');
// Define your function as a string
script.textContent = `

        function handleEventEnter() {
            const input = document.querySelector('textarea');
            input.addEventListener('keydown', function (event) {
                if (event.key === 'Enter') {
                    event.preventDefault();

                    const start = input.selectionStart; 
                    const end = input.selectionEnd;
                    const value = input.value;
                    input.value = value.substring(0, start) + '\\n' + value.substring(end);
                    input.selectionStart = input.selectionEnd = start + 1;
                }
            });
        }

      function resetColorHelp() {
        const eleHelp = document.querySelectorAll('.help');

        const eleCard = document.querySelectorAll('.card-content');
        eleCard.forEach((ele) => {
          ele.addEventListener('click', function () {
            eleHelp.forEach((help) => {
              help.style.color = '#000000';
            });
          })
        });
      }
      function checkSelected() {
        let data = {}
        const collapseContent = document.querySelectorAll('.collapse');
        collapseContent.forEach((content, index) => {
          data[index] = false;
          content.querySelectorAll('.field').forEach((field) => {

            const checkedRadio = field.querySelector('input[type="radio"]:checked');
            if (checkedRadio) {
              data[index] = true;
            }
          });
        });

        const firstFalseKey = Object.keys(data).find(key => data[key] === false);
        if (firstFalseKey !== undefined) {
        const n = firstFalseKey - 1;
          if (n !== 0) {
            collapseContent[firstFalseKey].scrollIntoView({ behavior: 'smooth' });
          } else {
            collapseContent[firstFalseKey - 1].scrollIntoView({ behavior: 'smooth' });
          }
        }
      }

      function disabledCollapse (self, question) {
        self.isOpen = 9999;
      }

      const handleButtonClick = async (e, question, self) => {
          e.preventDefault();
          const eleHelp = document.querySelectorAll('.help');
          const isValid = await window.customEnterSubmit.$refs.surveySubmitObserver.validate();
          if(!isValid){
            eleHelp.forEach((help) => {
              help.style.color = 'red';
            });
            checkSelected();
          } else {
              eleHelp.forEach((help) => {
                help.style.color = '#000000';
              });
          }
            
          sessionStorage.setItem('result_' + question.code, JSON.stringify(self.value));
          await self.$emit('move-next', true);
      }

      function handleStyle(self, question, newNumberQuestion) {
        // const dynamic by code Single answer martrix
        // dynamic question code 
        const newTextQuestion = {
          en: "Question",
          ja: "質問",
          'zh-TW': "問題",
          pt: "Pergunta",
          id: "Pertanyaan",
          th: "คำถามที่",
        };
        const textSubmnit = {
          en: 'Submit',
          'zh-TW': "提交",
          pt: "Enviar",
          id: "Kirim",
          th: "ส่ง",
        }
        const textBack = {
          ja: '戻る',
          'zh-TW': '返回',
          pt: 'Voltar',
          th: 'กลับ',
          id: 'Kembali',
          en: 'Back'
        }
        const textNext = {
          ja: '次へ',
          'zh-TW': '下一步',
          pt: 'Próximo',
          th: 'ถัดไป',
          id: 'Berikutnya',
          en: 'Next'
        }
        // end text btn
        
        const btnNext1 = document.querySelector('.btn__next .box-btn span')
        if (btnNext1) {
          btnNext1.textContent = textNext[self.lang] || textNext.en
        }
        const btnBack1 = document.querySelector('.btn__back .box-btn .txt-back')
        if (btnBack1) {
          btnBack1.textContent = textBack[self.lang] || textBack.en
        }


        const qcode = question.code
        const resultCode = JSON.parse(sessionStorage.getItem('result_' + qcode));

        if (resultCode) {
          self.selected = [];
          Object.entries(resultCode).forEach(([key, value]) => {
            self.value[key] = value;
            self.result[key] = value;
          });

          const collapseContent = document.querySelectorAll('.collapse .content');
          if (collapseContent) {
            collapseContent.forEach((content, index) => {
              content.querySelectorAll('.field').forEach((field, idx) => {
                const tmpValue = self.value[\`\${question.qid}_\${index + 1}_\`];
                if (tmpValue && Number(idx + 1) === Number(tmpValue)) {
                  const selectedRadio = field.querySelector('input[type="radio"]');
                  selectedRadio.checked = true;
                }
              });
            });
          }


          const objectInput = {};
          const hasOtherValue = self.value[\`\${question.qid}__\${question.answers.length}\`] || null;
          const cardContentField = document.querySelectorAll('.card-content .field label')
          if (cardContentField) {
            cardContentField.forEach((field, idx) => {
                if (question.type === 'SA') {
                  const tmpValue = self.value[\`\${question.qid}\`];
                  if (tmpValue && Number(idx + 1) === Number(tmpValue)) {
                    field.classList.add('is-primary', 'is-selected');
                    self.$emit("input", { [question.qid]: \`\${idx+1}\` });
                  }
                } else {
                  const tmpValue = self.value[\`\${question.qid}__\${idx + 1}\`];
                  if (tmpValue && self.selected) {
                    self.selected.push(\`\${idx + 1}\`)
                    objectInput[\`\${self.questionKey(question.qid, null, idx + 1)}\`] = '1';
                  }
                }
            })            
          }
            
          if (objectInput) {
              self.$emit("input", objectInput);
          }

          const textarea = document.querySelector('textarea');
          if (textarea) {
            textarea.textContent = self.value[question.qid];
          }
        }

        document.querySelector('.btn__back').removeAttribute('disabled');

        const { type, code } = question
        const getNumber = str => +str.replace(/\D/g, '');
        const qcodeNext = 'Q' + (Number(newNumberQuestion) + 1);
        const styleElement = document.getElementById(qcodeNext + '_style');
        if (styleElement) styleElement.remove();
        // event button next
        const btnNext = document.querySelector('.btn__next')
        btnNext.addEventListener('click', (e) => {handleButtonClick(e, question, self)})

        const btnBack = document.querySelector('.btn__back');
        btnBack.style.display = 'flex';
        btnBack.addEventListener('click', async (e) => {
          e.preventDefault()
          document.querySelector('.btn__back').setAttribute('disabled', 'disabled');
          await self.$emit('move-back', true);
        })

        const questionCode = document.querySelector('.question-text__code')
        questionCode.textContent = "";

        // set new  element question code
        const newText = document.createElement('div')
        newText.setAttribute('id', 'text-question')
        newText.textContent = newTextQuestion[self.lang]

        const newNumber = document.createElement('div')
        newNumber.setAttribute('id', 'number-question')
        newNumber.textContent = newNumberQuestion

        const newQuestionCode = document.createElement('div')
        newQuestionCode.setAttribute('id', 'new-question')

        newQuestionCode.appendChild(newText);
        newQuestionCode.appendChild(newNumber);

        const divQuestion = document.querySelector('.page-wrap .question')
        divQuestion.appendChild(newQuestionCode)
        // set %
        const progressElement = document.querySelector('.custom-bottom .progress');
        if (progressElement) {
          progressElement.setAttribute('max', 29);
          // Get the max and value attributes
          const max = progressElement.getAttribute('max');
          const value = progressElement.getAttribute('value');

          const percentage = Math.round((value / max) * 100);
          const percentageText = document.querySelector('#percentage');
          if(question.code === "Q24") {
            percentageText.textContent = '100%';
            progressElement.value = 28;
            progressElement.removeAttribute('max');

            const btnNext = document.querySelector('.btn__next .box-btn span')
            if (btnNext) {
              btnNext.textContent = textSubmnit[self.lang] || textSubmnit.en
            }
          }
          else {
            percentageText.textContent = percentage + '%';
          }
        }


        var style = document.createElement('style');
        style.id = \`\${code}_style\`;
        style.type = 'text/css';

        // TH SAMT
        if (type === 'SAM') {
          const divContents = document.querySelectorAll('.content')
          divContents.forEach((divContent) => {
            divContent.children.forEach((divAnswer, idx) => {
              const divCheck = divAnswer.querySelector('span.check')
              if (divCheck) {
                const uniqueId = 'check_' + idx; // Creating a unique ID
                divCheck.id = uniqueId; // Assigning the unique ID to the element
                const style = document.createElement('style');
                style.textContent = \`#\${uniqueId}::before { content: "\${idx + 1}" !important; }\`;
                document.head.appendChild(style);
              }
            })
          })


            const collapse = document.querySelectorAll('.collapse');
            const cardHeaderTitle = document.querySelectorAll('.card-header-title');


            collapse.forEach((element, idx) => {
                const newEl = document.createElement('div')
                newEl.innerHTML = \`<div class="collpase-title">\${cardHeaderTitle[idx].innerText}</div>\`
                element.appendChild(newEl)
            })

            const collapseTrigger = document.querySelectorAll('.collapse-trigger');
            collapseTrigger.forEach(el => {
                el.remove();
            })

            var stylePt = ''
                if (self.lang === 'pt') {
                  stylePt = \`@media screen and (max-width: 460px) {
                            .b-radio.radio .control-label {
                              font-size: 11.5px !important;
                            }
                            .collpase-title {
                              font-size: 12px !important;
                            }
                              .page-wrap .question .question-text .question-text__question {
                                font-size: 16.5px !important;
                              }
                         }
                              
                         .question .question-content .card-content .is-mobile .content .field {
                            margin-top: 13px !important;
                          }
                        \`
                }

          style.innerHTML = \`
              .page-wrap {
                  padding: 100px 96px 24px 96px;
                  gap: 36px;
              }

              #new-question {
                  background: #7DCDF4;
                  position: absolute;
                  width: 160px;
                  height: 48px;
                  top: -1.3rem;
                  left: -0.4rem;
                  clip-path: polygon(50% 0%, 100% 0%, 88% 44%, 100% 85%, 100% 85%, 4% 85%, 5% 106%, 0% 100%, 0% 0%);
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  padding-bottom: 6px;
                  color: #ffffff;
                  font-weight: bold;
              }

              #new-question #text-question {
                  font-size: 16px;
                  align-self: flex-end;
                  padding-bottom: 6px;
              }
              #new-question #number-question {
                  font-size: 30px;
              }

              .card-header-icon, .selected-option {
                  display: none !important;
              }

              .question-text__code {
                  position: absolute;
                  width: 30px;
                  height: 0;
                  border-top: 16px solid #ffffff;
                  border-left: 16px solid transparent;
                  border-right: 16px solid transparent;
                  bottom: -0.8rem;
                  left: calc(50% - 12px);
              }

              .page-wrap .question .question-text {
                  margin-bottom: 0 !important;
                  padding: 25px 28px !important;
                  border-radius: 8px;
                  background-color: #ffffff;
                  position: relative;
                  color: #000000 !important;
              }

              .page-wrap .question .question-text .question-text__question {
                  font-size: 18px !important;
                  color: #000000 !important;
              }
              .page-wrap .question .question-text .help {
                  font-weight: bold;
                  color: #000000;
                  font-size: 14px;
              }

              .question.column {
                  flex-flow: column;
                  gap: 23px;
                  padding: 58px 64px;
                  background: #E1ECF2;
                  border-radius: 8px;
              }

              .question-content.card {
                  width: 100%;
              }

              .collapse.card.p-2.mb-2 {
                  padding: 25px 28px !important;
                  border-radius: 8px;
              }

              .collapse-content {
                  display: block !important;
                  padding: 0 30px;
              }

              .question .question-content .card-content .is-desktop {
                  display: none !important;
              }

              .question .question-content .card-content .is-mobile {
                  display: flex !important;
                  gap: 26px;
                  flex-flow: column;
              }

              .page-wrap .question .question-content .card-content {
                  margin-top: 0 !important;
                  background: unset;
                  border-radius: unset;
                  padding: unset;
              }

              .question .question-content .card-content .is-mobile .content {
                  display: flex !important;
                  width: 100% !important;
                  gap: 38px;
                  justify-content: space-around;
              }
              
              .question .question-content .card-content .is-mobile .content .field {
                  padding: 0;
                  margin-bottom: 0 !important;
                  border: unset !important;
                  max-width: 98px;
                  max-height: 100px;
                  text-align: center;
                  width: 100% !important;
              }
              .question .question-content .card-content .is-mobile .content .field label {
                  display: flex;
                  flex-flow: column-reverse;
                  width: 100% !important;
                  gap: 16px;
                  justify-content: space-between;
              }
              .b-radio.radio .control-label {
                font-size: 14px !important;
                font-weight: 400;
                line-height: 21px;
                text-align: center;
                padding-left: unset !important;
              }

              .single-answer-matrix .is-mobile .card-header {
                  border-bottom: unset !important;
                  margin-bottom: 34px;
              }
              .single-answer-matrix .is-mobile .card-header .card-header-control {
                  width: fit-content;
                  padding: 4px 24px;
                  background-color: #00A9E0;
                  border-radius: 56px;
                  color: #FFFFFF;
              }
              .single-answer-matrix .is-mobile .card-header .card-header-title {
                  width: fit-content;
                  font-size: 14px !important;
                  font-weight: 700 !important;
                  padding: 0;
                  color: #ffffff !important;
                  line-height: 21px;
              }

              span.check {
                  width: 52px !important;
                  height: 52px !important;
                  padding: 0;
                  border: 4px solid #E9E9E9 !important;
                  border-radius: 50%;
              }
              .b-radio.radio input[type=radio]+.check:before {
                  content: "1" !important;
                  position: unset;
                  margin: auto;
                  width: auto;
                  height: auto;
                  background: transparent;
                  font-size: 24px;
                  align-items: center;
                  justify-content: center;
                  transform: scale(1) !important;
                  padding: 0;
              }
              .b-radio.radio input[type=radio]:checked+.check,
              label.b-checkbox.checkbox.button.is-primary {
                  border-color: #7DCDF4 !important;
                  background-color: #D0F0FF !important;
                  color: #000;
                  font-size: 16px;
              }

              .single-answer-matrix {
                  width: 100% !important;
              }
              .collapse.card {
                  margin-bottom: unset !important;
                  box-shadow: unset !important;
                  display: flex;
                  flex-flow: column-reverse;
                  gap: 30px;
              }
              
              .collpase-title {
                  width: fit-content;
                  padding: 4px 24px;
                  background: #00A9E0;
                  color: #fff;
                  border-radius: 56px;
                  font-size: 14px;
                  font-weight: 700;
                  line-height: 21px;
                  margin-bottom: 15px;
              }

              .b-radio.radio input[type=radio]:focus:checked+.check,
              label.b-radio.radio.button.is-primary.is-selected.is-focused {
                  box-shadow: none !important;
              }

              @media screen and (max-width: 920px) {
                .page-wrap {
                  padding: 85px 12px 40px 12px;
                }

                .question .question-content .card-content .is-mobile .content {
                  gap: 4px;
                }

                .collapse-content {
                  padding: 0;
                }

                .b-radio.radio input[type=radio]+.check:before {
                  font-size: 16px;
                  font-weight: bold;
                }

                .collapse.card.p-2.mb-2 {
                  padding: 25px 16px 45px 16px !important;
                }

                span.check {
                  width: 42px !important;
                  height: 42px !important;
                }

                .question.column {
                    gap: 32px;
                    padding: 42px 16px;
                }


                .b-radio.radio .control-label {
                  font-size: 12px !important;
                  font-weight: 400;
                  line-height: 18px;
                }

                .textarea[rows] {
                  padding: 18px;
                }
              }

              \${stylePt}
          \`;
        }
        // END TH SAMT 

        if (type === 'FA') {
          const eleTextarea = document.querySelector('textarea')
          eleTextarea.setAttribute('rows', '10')
          style.innerHTML = \`
              .page-wrap .question .question-content .card-content {
                padding: 0;
              }
            \`;
        }

        if (type === 'SA' || type === 'MA') {
          style.innerHTML = \`
              .page-wrap .question .question-content .card-content {
                  background: #ffffff;
                  border-radius: 8px;
                  padding: 22px 128px;
              }

              .page-wrap .question.supported-keyboard .answer .button .keyboard {
                  display: none;
              }

              .page-wrap .question.supported-keyboard .answer .button {
                  justify-content: center !important;
                  border-radius: 56px;
              }
              label.b-radio.radio.button {
                  padding: 10px;
                  border-radius: 56px;
                  border-color: #E9E9E9 !important;
                  color: #000000;
                  font-size: 16px;
              }

              label.b-radio.radio.button.is-primary.is-selected {
                  background: #D0F0FF !important;
                  border-color: #7DCDF4 !important;
              }


              @media screen and (max-width: 920px) {
                .page-wrap .question .question-content .card-content {
                  padding: 16px;
                }
              }
          \`;
        }
        
        if (style) {
          document.getElementsByTagName('head')[0].appendChild(style);
        }

        const container = document.querySelector('#survey-scroller');
        container.scrollTo({ top: 0, behavior: 'smooth' });


        // TH type is Text display
        if (type === 'TD') {
            const newQuestion = document.querySelector('#new-question')
            if (newQuestion) {
                newQuestion.style.display = 'none'
            }

            const newText = document.querySelector('.question-text')
            if (newText) {
                newText.style.display = 'none'
            }

            const eleQuestion = document.querySelector('.question')
            if (eleQuestion) {
                eleQuestion.style.background = 'unset !important'
            }

            const styleLang = document.getElementById('Lang_style_custom')
            if (styleLang) {
                styleLang.remove();
            }
        }
      }
  `;

// Append the script to the head
document.head.appendChild(script);

// set for Q1 %
const progressElement = document.querySelector('.progress');
if (progressElement) {
  // Get the max and value attributes
  const max = progressElement.getAttribute('max');
  const value = progressElement.getAttribute('value');

  const percentage = Math.round((value / max) * 100);
  const percentageText = document.querySelector('#percentage');
  percentageText.textContent = percentage + '%';
}