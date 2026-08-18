// Dữ liệu thực tế 
const resultData = {
    "SQ9__1": '1',
    "SQ9__2": '1',
    "SQ9__3": '1',
    "SQ9__4": '1',
};

// Hàm kiểm tra xem có tồn tại response option từ khoảng start -> end hay không
const checkQuestionHasOptions = (obj = {}, prefix = 'SQ9__', start = 1, end = 6) => {
    // Dùng mảng và some() để kiểm tra: chỉ cần 1 key tồn tại là trả về true
    const options = Array.from({ length: end - start + 1 }, (_, i) => start + i);
    
    return options.some(opt => {
        const key = `${prefix}${opt}`;
        return obj[key] != null && obj[key] !== '';
    });
};

// Gọi thử với resultData (kiểm tra key từ SQ9__1 đến SQ9__6)
const isExist = checkQuestionHasOptions(resultData, 'SQ9__', 1, 6);
