if(window.customLoading) window.customLoading.close()



    
const element = document.querySelector('#survey-scroller');
if (element) {
    element.style.display = 'none';
}

if(!window.customLoading) window.customLoading = self.$buefy.loading.open()
