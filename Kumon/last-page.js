const firstElement = document.querySelector('.d-flex.vh-100.p-3.mx-auto.flex-column.bg-light-blue')
if (firstElement) firstElement.remove();
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

const logo = 'https://www.kumon.com/assets/images/kumon_logo.png';

const divContainer = document.getElementById("reward-page");
// content
const newEleContent = document.createElement('div')
newEleContent.classList.add('last-page')
newEleContent.classList.add('container')
newEleContent.innerHTML = `
<div id="logo">
  <img src="${logo}" alt="Logo">
</div>
<div id="container">
  <div id="content">
       <h1>当選おめでとうございます！</h1>
      <p>QUOカードPayバリュコード</p>
      <p class="example-code">ギフト券番号<br>example_code</p>
      <p>アンケートは以上です。<br>お忙しい中ご協力いただき、<br>まことにありがとうございました。</p>
      <p>ご回答頂きました皆様にプレゼントします</p>
      <a href="#" class="button">プレゼントを受け取る</a>
      <p class="footer-custom">上記URLはQUOカードPayアプリをお持ちのお客様は、<br>バリューコードを保存してご利用ください。</p>
  </div>
</div>
`;
divContainer.appendChild(newEleContent);

var style = document.createElement('style');
style.id = 'reward_id'
style.type = 'text/css';
style.innerHTML = `
#app {
  display: flex;
}
#reward-page {
  position: relative;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  align-self: center;
}
.last-page {
  position: relative;
  background-color: #FFFAEE;
  border-radius: 16px;
  width: 100%;
  height: 100%;
  justify-content: center;
  display: flex;
  flex-flow: column;
  align-items: center;
  margin: 90px;
  padding: 13px;
  padding: 0 96px 96px;
  max-width: 100% !important;
  overflow-y: unset !important;
}
#container {
  align-self: center;
  justify-content: center;
  background-color: #E1ECF2;
  padding: 64px;
  border-radius: 8px;
  height: 100%;
  margin-top: 85px;
  width: 100%;
}
#content {
  background-color: #fff;
  padding: 30px;
  border-radius: 8px;
  text-align: center;
  height: 100%;
  align-items: center;
  display: flex;
  flex-flow: column;
  justify-content: center;
}
#logo {
  padding: 18px 280px;
  background-color: #9CCEF1;
  border-radius: 56px;
  top: -3rem;
  position: absolute;
}

h1 {
          color: #00796b;
      }
      .example-code {
          font-weight: bold;
          margin: 20px 0;
      }
      .footer-custom {
          margin-top: 20px;
          font-size: 0.9em;
          color: #555;
      }
      .button {
          background-color: #00796b;
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          text-decoration: none;
      }
      .button:hover {
          background-color: #005f50;
      }


  @media screen and (max-width: 920px) {
    #logo {
      padding: 12px 72px;
    }
    .last-page {
      padding: 13px;    
    }
      #container {
        padding: 16px;
        margin-top: 70px;
      }
`;

document.getElementsByTagName('head')[0].appendChild(style);
