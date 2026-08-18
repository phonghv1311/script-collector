// const element = document.querySelector('#survey-scroller');
// if (element) {
//     element.style.display = 'none';
// }

// if(!window.customLoading) window.customLoading = self.$buefy.loading.open()

// Dữ liệu thực tế 
const SQ5 = 'SQ5_';
const resultData = self.resultQcode;

const checkQuestionHasAnswer = (obj = {}, targetValues = []) => {
  const keys = Object.keys(obj);
  const stringifiedTargets = targetValues.map(String); // Đưa ra ngoài vòng lặp để tối ưu
  
  // Kiểm tra nếu CÓ bất kỳ key nào chứa 'SQ5_' VÀ có giá trị nằm trong mảng targetValues
  const hasTargetValue = keys.some(key => {
    // SỬA LỖI Ở ĐÂY: SQ5 đã là 'SQ5_' rồi, nên dùng luôn SQ5 thay vì `${SQ5}_` (sẽ thành 'SQ5__')
    return key.includes(SQ5) && stringifiedTargets.includes(String(obj[key]));
  });

  return !hasTargetValue;
};

// Gọi hàm với [7, 8, 9] (nếu object có value của key chứa string 'SQ5_' có value là 7, 8 hoặc 9 thì kết quả = false)
const exitst = checkQuestionHasAnswer(resultData, [7, 8, 9]);

if (exitst) {
    await self.$emit("input", {[question.qid]: '2'});
} else {
    await self.$emit("input", {[question.qid]: '1'});
}

// await self.$emit('move-next', true)