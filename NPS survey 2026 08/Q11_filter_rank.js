const ranks = [1, 2, 3]; // need change follow rank

const rankElements = document.querySelectorAll('p.rank');

ranks.forEach((r, index) => {
    const savedValue = localStorage.getItem(`SID_${self.sid}_rank_${r}`);
    if (savedValue && rankElements[index]) {
        rankElements[index].innerHTML = savedValue;
    }
});