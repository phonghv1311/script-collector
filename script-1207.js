var style = document.createElement("style");
style.type = "text/css";
style.innerHTML = `
.button.is-primary { display: none!important; }

.survey-progress { display: none!important; }

.card-content p {
    position: relative;
}
.card-content p img:nth-child(2){
    height: 35px;
    width: 35px;
    position: absolute;
    bottom: 100px;
    left: 0;
    animation: move 3s ease-in infinite;
	animation-delay: 0;
	opacity: 1;
}

@keyframes move {
	0% {
		opacity: 0;
		-webkit-transform: translateX(100%);
		-moz-transform: translateX(100%);
		-ms-transform: translateX(100%);
		-o-transform: translateX(100%);
		transform: translateX(100%);
	}
	25% {
		opacity: 1;
	}
	50% {
		-webkit-transform: translateX(200%);
		-moz-transform: translateX(200%);
		-ms-transform: translateX(200%);
		-o-transform: translateX(200%);
		transform: translateX(200%);
	}
	75% {
		-webkit-transform: translateX(400%);
		-moz-transform: translateX(400%);
		-ms-transform: translateX(400%);
		-o-transform: translateX(400%);
		transform: translateX(400%);
	}
	100% {
		-webkit-transform: translateX(600%);
		-moz-transform: translateX(600%);
		-ms-transform: translateX(600%);
		-o-transform: translateX(600%);
		transform: translateX(600%);
	}
}
`;
document.getElementsByTagName("head")[0].appendChild(style);

window.removeEventListener("keypress", window.customEnterSubmit.enterListener);

const links = {
  en: {
    left: "https://maps.app.goo.gl/ypQ9uUaFgbGcFBpD7",
    right: "https://maps.app.goo.gl/Vfriudtx3bg1ENAR6",
  },
  ja: {
    left: "https://maps.app.goo.gl/mZHACshF3WDGws9M8",
    right: "https://maps.app.goo.gl/EytSUHsaiY7EteBx5",
  },
};

const openLink = (x, y) => {
  if (y < 66 || y > 82) {
    return;
  }
  if (x > 32 && x < 46) {
    window.open(links[self.lang].left); // click image left
    return;
  }
  if (x > 56 && x < 74) {
    window.open(links[self.lang].right); // click image right
    return;
  }
  console.log("out");
};

const clickHandler = function (event) {
  const offset = this.getBoundingClientRect(),
    relativeX = event.pageX - offset.left,
    relativeY = event.pageY - offset.top;
  const height = this.clientHeight,
    width = this.clientWidth;
  let hotspot = {
    x: (relativeX / width) * 100,
    y: (relativeY / height) * 100,
  };

  openLink(hotspot.x, hotspot.y); // function to open the link
  // use if-else to check the max/min x/y and hyperlink
};
const elementImg = document.querySelector("img");
elementImg.addEventListener("click", clickHandler);

// content

//   <p style = "text-align: center;">ご回答いただき誠にありがとうございました！</p>

// <p style="text-align: center;">地元の人がお勧めする大船Mapと島Map（江の島）は、下記リンクよりアクセスしてください！ <img alt="" src="https://admin.collector.koeeru.com/ckfinder/survey_1MWVMNML8G/images/Screenshot%202024-10-22%20104132(1).png" style="width:1500px" /> <span class="click-here"><img alt="" src="https://admin.collector.koeeru.com/ckfinder/survey_1MWVMNML8G/images/hand-point-right2.png" />Click Here</span></p>
