
const element = document.querySelector('#survey-scroller');
if (window.customLoading) { window.customLoading.close(); }
element.style.display = 'block';

const qCode = 'Q11_1_2';
const savedData = localStorage.getItem(`SORT_${self.sid}_${qCode}`);
const ranks = savedData ? JSON.parse(savedData) : [];

if (ranks.length > 0) {
    const sortedList = [];
    
    // 1. Lấy các sub_question ra theo đúng thứ tự của ranks
    ranks.forEach(code => {
        const match = question.sub_questions.find(sq => String(sq.code) === String(code));
        if (match) sortedList.push(match);
    });

    // 2. Nối thêm các sub_question còn sót lại (không được chọn) vào cuối mảng
    question.sub_questions.forEach(sq => {
        if (!ranks.includes(String(sq.code))) {
            sortedList.push(sq);
        }
    });

    // 3. Thay thế toàn bộ mảng gốc bằng danh sách đã sort (Dùng splice để Vue cập nhật giao diện)
    question.sub_questions.splice(0, question.sub_questions.length, ...sortedList);
}