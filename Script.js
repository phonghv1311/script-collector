var style = document.createElement('style');
style.id = 'q4style'
style.type = 'text/css';
style.innerHTML = `
#survey {
    width: 100%;
}
.page-wrap {
    min-height: 90vh;
}

.columns{
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start !important;
    .question{
        flex: 0 0 50%;
        .field-label{
            display: none;
        }
    }
 
    .question:nth-child(2) {
        .input {
            min-height: 50px;
        }
        .card-content {
            padding-top: 1px;
        }
    }

    .column:last-child {
        align-self: flex-start;
        align-content: flex-start;
    }
}
`;
document.getElementsByTagName('head')[0].appendChild(style);

// css for mobile
const widthScreen = window.innerWidth
if (widthScreen <= 768) {
    style.innerHTML = `
    .page-wrap {
        min-height: 90vh;
    }

    .columns{
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: flex-start !important;
        display: flex;
        .question {
            .field-label{
                display: none;
            }
            .question-text {
                .question-text__question {
                    font-size: 1.3rem;
                }
                .help {
                    display: none;
                }
            }
        }
        .question:nth-child(1){
            flex: 0 0 70%;
        }
    
        .question:nth-child(2) {
            flex: 0 0 30%;
            .input {
                min-height: 50px;
            }
            .card-content {
                padding-top: 1px;
            }
        }


        .column:last-child {
            align-self: flex-start;
            align-content: flex-start;
        }
    }
    `;
    document.getElementsByTagName('head')[0].appendChild(style);
}
// end css


// css for left text
const divElement = document.querySelector('.container')
divElement.classList.add("is-flex", "is-align-items-center")
const textElement = document.createElement("div")
textElement.id = 'title-q4'
textElement.textContent = "TEST"
textElement.style.marginTop = '-12rem'
textElement.classList.add("pr-4")
// Add element to the document
divElement.insertBefore(textElement, divElement.firstChild)

const textContent = textElement.textContent;
const characters = textContent.split('');
const newText = characters.join('<br>');
textElement.innerHTML = newText;
// end css text


// handler logic click and input
const inputs = document.querySelectorAll('#survey > div.columns.page-wrap.is-centered.is-vcentered > div:nth-child(2) input');
inputs.forEach((input) => {
    input.setAttribute('disabled', true)
    input.setAttribute('required', true)
})

const firstQuestion = window.customEnterSubmit.questions.find((question) => question.code === 'Q4')
const secondQuestion = window.customEnterSubmit.questions.find((question) => question.code === 'Q5')

self.$watch('value', (newSelected, oldSelected) => {
    if (!firstQuestion || !secondQuestion) return
    if (JSON.stringify(newSelected) === JSON.stringify(oldSelected)) return;

    const divTotal = document.getElementById('total');
    if (divTotal) divTotal.remove();

    let total = 0
    let selectedCount = 0

    firstQuestion.answers.forEach((answer) => {
        const index = parseInt(answer.code);
        const opSelected = newSelected[self.questionKey(firstQuestion.qid, null, index)]


        const value = newSelected[secondQuestion.qid + '_' + index + '_']
        if (Number(opSelected) === 1) {
            inputs[index - 1].removeAttribute("disabled")
            selectedCount++

            if (value) {
                total += Number(value)
            }
        } else {
            inputs[index - 1].value = ''
            inputs[index - 1].setAttribute("disabled", "disabled")

            if (value) {
                newSelected[secondQuestion.qid + '_' + index + '_'] = null
            }
        }
    })

    // xử lý show total
    if ((selectedCount < 1 || total < 1) && divTotal) {
        divTotal.remove()
        return
    }
    if (selectedCount < 1 || total < 1) return

    const divQuestion = document.querySelector('.question:nth-child(2)');
    if (divQuestion && selectedCount > 0) {
        const newElement = document.createElement("div");
        const button = document.createElement("div");
        const span = document.createElement("span");
        newElement.appendChild(button);
        newElement.appendChild(span);

        // CSS
        newElement.style.width = '100%';
        newElement.id = "total";
        newElement.classList.add("is-flex", "is-justify-content-center", "is-fullwidth");
        button.classList.add("button", "is-primary", "is-align-self-center", "px-6", "mr-2");
        span.classList.add("is-align-self-center");

        // Set total value
        button.textContent = 'Total';
        span.textContent = total;

        // Add element to the document
        divQuestion.parentNode.insertBefore(newElement, divQuestion.nextSibling);
    }
    // end
})