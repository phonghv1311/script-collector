// const element = document.querySelector('#survey-scroller');
// if (element) {
//     element.style.display = 'none';
// }

// if(!window.customLoading) window.customLoading = self.$buefy.loading.open()

// 1. Lấy dữ liệu từ localStorage: chỉ lấy key Q7_{n} (n là số nguyên)
const q7Data = Object.entries(localStorage)
    .filter(([key]) => /^Q7_\d+$/.test(key))
    .reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
    }, {});

// 2. Tách mỗi value "text1 / text2" thành 2 key riêng: _n_1 và _n_2
const objectInput = {};

for (const [key, value] of Object.entries(q7Data)) {
    const [textA = '', textB = ''] = value.split(' / ');

    objectInput[`${question.qid}_${key}_1_`] = textA.trim();
    objectInput[`${question.qid}_${key}_2_`] = textB.trim();
}

await self.$emit("input", objectInput);
// await self.$emit("move-next", true);