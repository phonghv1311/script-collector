const element = document.querySelector('#survey-scroller');
if (element) {
    element.style.display = 'none';
}

if (!window.customLoading) window.customLoading = self.$buefy.loading.open()

const qid = question.qid;
let changes = {};
const resultQcode = self.resultQcode || {};
const qCode = 'Q9_1_';

// 1. Kiểm tra object value có tồn tại
if (resultQcode) {
    Object.entries(resultQcode).forEach(([key, value]) => {
        // 2. Lấy key chứa string `${qCode}`, value != null và value < 4
        if (key.includes(`${qCode}`) && value !== null && Number(value) < 4) {
            // 3. Lấy danh sách slug sau `${qCode}` (Ví dụ: 'Q9_1_1_' -> '1')
            const slug = key.replace(`${qCode}`, '').replace(/_$/, '');

            self.value[`${qid}_${slug}`] = '1';
            self.selected.push(`${slug}`);
            changes[`${qid}_${slug}`] = "1";
        }
    });

    await self.$emit('input', changes);
}

await self.$emit('move-next', true);