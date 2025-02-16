const colFirst = document.querySelectorAll('table colgroup col:nth-of-type(1)') // lấy tất cả các columns table
for (let i = 0; i < colFirst.length; i++) {
    if (colFirst[i]) { // lấy column đầu tiên của 1 table và kiểm tra
        colFirst[i].style.width = '0.1%'
    }
}

// // hidden collapse
// const collapseTrigger = document.querySelectorAll('.collapse-trigger')
// if (collapseTrigger) {
//     for (let t = 0; t < collapseTrigger.length; t++) {
//         collapseTrigger[t].style.display = 'none'
//     }
// }

// handler color multiple help
const eleTable = document.querySelectorAll('.question')
function setColorHelp(eleTable) {
    if (!eleTable) return;
    for (let j = 1; j <= eleTable.length; j++) {
        const hasRequired = document.querySelector(`.question:nth-of-type(${j}) .has-text-danger`) // check css required
        const help = document.querySelector(`.question:nth-of-type(${j}) .help`)

        if(help) {
            help.style.color = '#929292' // reset color
        }
        if (hasRequired && help) {
            help.style.color = 'red'
        }
    }
}
document.getElementsByTagName('button').forEach(function (btn, index) {
    btn.addEventListener('click', function (e) {
        if (question.code === 'Q6_1') {
            setTimeout(() => {
                setColorHelp(eleTable)
            }, 10)
        }
    })
})



//  Q6_B1
const colFirst = document.querySelectorAll('table colgroup col:nth-of-type(1)') // lấy tất cả các columns table
for (let i = 0; i < colFirst.length; i++) {
    if (colFirst[i]) { // lấy column đầu tiên của 1 table và kiểm tra
        colFirst[i].style.width = '0.1%'
    }
}

// PC
const trTable = document.querySelectorAll('table tr:nth-of-type(2) td')
for (let j = 0; j < trTable.length; j++) {
    if (trTable[j]) { // lấy column đầu tiên của 1 table và kiểm tra
        trTable[j].style.display = 'none'
    }
}

// mobile
const tagField = document.querySelectorAll('.field')
const inpCheck = document.querySelectorAll('.field input')
const spanCheck = document.querySelectorAll('.field span.check')
if (tagField && inpCheck && spanCheck) {
    for (let k = 0; k < inpCheck.length; k++) {
        if (inpCheck[k]) { // lấy input đầu tiên của 1 field và kiểm tra
            inpCheck[k].style.display = 'none'
        }

        if (spanCheck[k]) { // lấy span đầu tiên của 1 field và kiểm tra
            spanCheck[k].style.display = 'none'
        }

        if (tagField[k]) {
            tagField[k].style.justifyContent = 'center'
        }
    }
}

// hidden collapse
const collapseTrigger = document.querySelectorAll('.collapse-trigger')
if(collapseTrigger) {
    for (let t = 0; t < collapseTrigger.length; t++) {
        collapseTrigger[t].style.display = 'none'
    }
}