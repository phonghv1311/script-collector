if(window.customLoading) window.customLoading.close();
const displayEle = document.querySelector('#survey-scroller');
if (displayEle) {
    displayEle.style.display = 'block';
}


if(!window.customLoading) window.customLoading = self.$buefy.loading.open();
const hiddenEle = document.querySelector('#survey-scroller');
if (hiddenEle) {
    hiddenEle.style.display = 'none';
}
