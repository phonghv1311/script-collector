const q = (typeof question !== 'undefined' ? question : self.question) || {};
const answers = q.answers || [];
const qid = q.qid || '';

// Hàm xử lý disable dựa trên nguồn dữ liệu truyền vào
const handleDisable = (dataSource) => {
    const source = dataSource || {};

    const isSelected = (code) => {
        const val = source[`${qid}__${code}`];
        return Boolean(val) && val !== '0';
    };

    const disabledSet = new Set();

    // 1. Nếu chọn code = 1 thì disabled 2
    if (isSelected('1')) {
        disabledSet.add('2');
    }

    // 2. Nếu chọn code = 2 thì disabled 1
    if (isSelected('2')) {
        disabledSet.add('1');
    }

    // 3. Nếu chọn option có exclusive = 1 thì disabled tất cả các options khác
    answers.forEach(answer => {
        if (answer.options && Number(answer.options.exclusive) === 1) {
            if (isSelected(answer.code)) {
                answers.forEach(item => {
                    if (String(item.code) !== String(answer.code)) {
                        disabledSet.add(String(item.code));
                    }
                });
            }
        }
    });

    self.disabled = Array.from(disabledSet);
};

// 1. Chạy 1 lần ở ngoài khi tải trang (ưu tiên self.result rồi fallback self.value)
const initialSource = Object.assign({}, self.result, self.value);
handleDisable(initialSource);

// 2. Chạy trong watch khi có thay đổi (dùng newSelected từ sự kiện thay đổi)
self.$watch(
    'value',
    (newSelected, oldSelected) => {
        if (newSelected && oldSelected && JSON.stringify(newSelected) === JSON.stringify(oldSelected)) return;
        handleDisable(newSelected || self.value || {});
    },
    { deep: true }
);