if (window.customLoading) window.customLoading.close();

const element = document.querySelector('#survey-scroller');
if (element) {
    element.style.display = 'block';
}

/**
 * ---------------------------------------------------------------------------
 * UTILITY FUNCTIONS
 * ---------------------------------------------------------------------------
 */
const shuffleArray = (arr) => {
    const result = [...arr];
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
};

/**
 * ---------------------------------------------------------------------------
 * MAIN FUNCTION (Lấy các cặp Code - Max 5 cặp, mỗi cặp đúng 2 code)
 * ---------------------------------------------------------------------------
 */
const getCarryForwardCodes = (resultData = {}, sourceQId = 'Q4', maxAnswers = 31) => {
    const selectedCodes = Array.from({ length: maxAnswers }, (_, i) => i + 1)
        .filter(i => resultData[`${sourceQId}__${i}`]);

    // Nếu không đủ 2 đáp án để tạo ít nhất 1 cặp thì trả về mảng rỗng
    if (selectedCodes.length < 2) return [];

    // TÍNH TOÁN QUOTA MỚI: Lấy TỐI ĐA 5 CẶP
    const maxPossiblePairs = Math.floor(selectedCodes.length / 2);
    let targetPairsCount = Math.min(5, maxPossiblePairs);

    const finalPairs = [];
    let pool = [...selectedCodes];
    
    // Vẫn giữ ưu tiên code = 1 theo script của bạn
    const hasHigh = pool.includes(1);

    if (hasHigh && targetPairsCount > 0) {
        pool = pool.filter(code => code !== 1);
        pool = shuffleArray(pool);
        const partner = pool.shift(); 
        
        finalPairs.push([1, partner]);
        targetPairsCount -= 1;
    } else {
        pool = shuffleArray(pool);
    }

    // Đảm bảo mỗi array được push vào luôn lấy chính xác 2 phần tử (shift 2 lần)
    while (targetPairsCount > 0 && pool.length >= 2) {
        finalPairs.push([pool.shift(), pool.shift()]);
        targetPairsCount -= 1;
    }

    return finalPairs;
};

// 1. Lấy danh sách các cặp code hiển thị
const displayCodes = getCarryForwardCodes(self.resultQcode, 'Q4');

// 2. Lấy dữ liệu từ localStorage và chuyển thành dạng Dictionary (Key-Value)
const q4Data = Object.entries(localStorage)
    .filter(([key]) => key.startsWith('Q4_'))
    .reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
    }, {});

// 3. Map (Ánh xạ) displayCodes với dữ liệu q4Data
const mappedDisplayCodes = displayCodes.map(pair => {
    return pair.map(code => {
        const localKey = `Q4_${code}`;
        return {
            code: code,
            text: q4Data[localKey] || "Unknown" 
        };
    });
});

// 4. Map text vào các class HTML option_1 đến option_5
mappedDisplayCodes.forEach((pair, index) => {
    // index chạy từ 0, nên index + 1 sẽ tương ứng từ option_1 đến option_5
    const optionClass = `.option_${index + 1}`;
    
    // ĐỔI SANG querySelectorAll: Tìm TẤT CẢ các element chứa class tương ứng (cả trên desktop và mobile)
    const optionElements = element ? element.querySelectorAll(optionClass) : document.querySelectorAll(optionClass);

    // KIỂM TRA ĐIỀU KIỆN AN TOÀN: Chỉ render text khi array có ĐÚNG 2 phần tử
    if (optionElements.length > 0 && pair.length === 2) {
        // Gom chuỗi text lại để tái sử dụng
        const textToDisplay = `${pair[0].text} / ${pair[1].text}`;

        localStorage.removeItem("Q7_" + (index + 1));
        localStorage.setItem("Q7_" + (index + 1), textToDisplay);
        
        // Duyệt qua toàn bộ các element tìm được (desktop, mobile) và cập nhật text đồng loạt
        optionElements.forEach((el) => {
            el.innerText = textToDisplay;
        });
    }
});