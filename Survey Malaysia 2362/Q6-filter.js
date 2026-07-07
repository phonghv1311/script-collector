const element = document.querySelector('#survey-scroller');
if (element) {
    element.style.display = 'none';
}

if(!window.customLoading) window.customLoading = self.$buefy.loading.open()


/**
 * Đếm số lượng đáp án dựa trên giá trị mục tiêu
 * @param {Object} obj - Object chứa kết quả (vd: self.resultQcode)
 * @param {String} prefix - Tiền tố của key (vd: 'Q5_')
 * @param {Number} maxIdx - Số lượng câu hỏi tối đa (vd: 31)
 * @param {any} target - Giá trị đáp án cần đếm (vd: 1)
 * @returns {Number} Số lượng đáp án khớp
 */
const countAnswers = (obj = {}, prefix, maxIdx, target) => 
  Array.from({ length: maxIdx }).reduce((count, _, i) => {
    const val = obj[`${prefix}_${i + 1}_`];
    return count + (val != null && Number(val) === target);
  }, 0);

const countQ = countAnswers(self.resultQcode, 'Q5', 31, 1);
await self.$emit("input", { [question.qid]: countQ === 0 ? '1' : '2' });
await self.$emit('move-next', true);