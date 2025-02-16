// random show video
const videos = [
    'https://tochigi.s3-ap-southeast-1.amazonaws.com/ckfinder/survey_JI6GBMEL7Z/videos/ENG/15s/SNS_Art_English.mp4',
    'https://tochigi.s3-ap-southeast-1.amazonaws.com/ckfinder/survey_JI6GBMEL7Z/videos/ENG/15s/SNS_City_English.mp4',
    'https://tochigi.s3-ap-southeast-1.amazonaws.com/ckfinder/survey_JI6GBMEL7Z/videos/ENG/15s/SNS_Cusine_English.mp4',
    'https://tochigi.s3-ap-southeast-1.amazonaws.com/ckfinder/survey_JI6GBMEL7Z/videos/ENG/15s/SNS_Nature_English.mp4',
    'https://tochigi.s3-ap-southeast-1.amazonaws.com/ckfinder/survey_JI6GBMEL7Z/videos/ENG/15s/SNS_Outdoor_English.mp4',
    'https://tochigi.s3-ap-southeast-1.amazonaws.com/ckfinder/survey_JI6GBMEL7Z/videos/ENG/15s/SNS_Relaxation_English.mp4',
    'https://tochigi.s3-ap-southeast-1.amazonaws.com/ckfinder/survey_JI6GBMEL7Z/videos/ENG/15s/SNS_Tradition_English.mp4'
  ]
  // check video played and create new array
  let newVideos = videos
  // get cookie video played
  function getCookies(cookieNames) {
    const cookies = {};
    document.cookie.split('; ').forEach(cookie => {
      const [name, value] = cookie.split('=');
      if (cookieNames.includes(name)) {
        cookies[name] = value;
      }
    });
    return cookies;
  }
  const ojbCookie = getCookies(['Q23_1']); // array question video played
  const arrCookie = Object.values(ojbCookie).map(value => parseInt(value));
  newVideos = videos.filter((_, index) => !arrCookie.includes(index));
  console.log(arrCookie, newVideos);
  
  const randomInt = Math.floor(Math.random() * newVideos.length)
  if(newVideos[randomInt]) {
    const videoEle = document.querySelector('video')
    if(videoEle) {
      videoEle.src = newVideos[randomInt]
      videoEle.load()
    }
  }