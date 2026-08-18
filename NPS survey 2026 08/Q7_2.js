
const messages = {
  ja: '最大3つ、最低',
};

const messagesSlug = {
  ja: 'つの回答を選択してください。',
};

const messagesClose = {
  ja: '閉じる',
};

const max = 3;

const total = question.sub_questions.length;
const number = total > max ? max : total;

// Biến lưu trữ số lượng được chọn để handler có thể đọc
let currentCount = 0;

self.$watch('value', (newSelected, oldSelected) => {
  if (JSON.stringify(newSelected) === JSON.stringify(oldSelected)) return;
  
  // Cách ngắn gọn để đếm số lượng đáp án được chọn
  currentCount = Object.values(newSelected).filter(Boolean).length;
});

const eventHandler = function (e) {

    const oldValue = self.value; 
    const oldRank = Object.values(oldValue).filter(Boolean).length;

  if (total === currentCount || currentCount === max || oldRank === total || oldRank === max) {
    window.addEventListener("keypress", window.customEnterSubmit.enterListener);
    self.$emit('move-next', true);
    return;
  }

  // Chặn submit form tự nhiên để xử lý bằng custom alert
  if (e) {
    e.preventDefault();
    e.stopPropagation();
  }

  const dialog = document.querySelector('.dialog');
  if (dialog) return;

  const lang = self.lang || 'ja';
  const msg = (messages[lang] || messages.ja) + number + (messagesSlug[lang] || messagesSlug.ja);
  const textClose = messagesClose[lang] || messagesClose.ja;

  self.$buefy.dialog.alert({
    message: msg,
    confirmText: textClose,
  });
};

window.removeEventListener("keypress", window.customEnterSubmit.enterListener);

// Gắn sự kiện sau khi giao diện đã render xong
setTimeout(() => {
  const buttons = document.querySelectorAll('#survey-scroller button[type="submit"]');
  buttons.forEach(btn => {
    btn.addEventListener("click", eventHandler);
  });
}, 500);

