// code display image Bee
const hasImg = document.getElementById('element-img')
if (hasImg) {
    hasImg.remove()
}
const surveyController = document.querySelector("#survey-scroller")
const newDiv = document.createElement("div")
const img = document.createElement("img")
img.src = "https://syno.admin-dev.collector.koeeru.com/img/collector-logo.svg" // Replace with the actual path to your image

newDiv.id = "element-img"
newDiv.appendChild(img)
newDiv.style.padding = '20px'
surveyController.insertBefore(newDiv, surveyController.firstChild)

// hide button submit
const buttonSubmit = document.querySelector('.form-submit')
if (buttonSubmit) buttonSubmit.style.display = 'none'

// css text
const elementH1 = document.querySelectorAll('h1')
if (elementH1[0]) {
    elementH1[0].classList.add("button", "is-primary")
    elementH1[0].addEventListener("click", function (e) {
        console.log('ok')
        self.$emit('move-next', true)
    });
}