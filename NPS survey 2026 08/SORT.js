if(!window.customLoading) window.customLoading = self.$buefy.loading.open()
const element = document.querySelector('#survey-scroller');
if (element) {
    element.style.display = 'none';
}

const SORT_QF = 'SORT_QF';
async function callApiQuota() {
    const domain = 'https://api.collector.koeeru.com/v1/responses/quota/check'
    const params = {
        sid: self.sid,
        qcodes: `${SORT_QF}`
    }
    const { data } = await self.$axios.get(domain, { params })

    return data.data
}

const res = await callApiQuota();
const resultData = res[0].data;

const resultQcode = self.resultQcode;

// Hàm kiểm tra giá trị nằm trong khoảng min - max
const inRange = (val, min, max) => {
    if (val === undefined || val === null || val === '') return false;
    const num = Number(val);
    return num >= min && num <= max;
};

// Định nghĩa các rule dựa trên ghi chú
const rules = [
    { code: 1, check: (data) => inRange(data['SQ5_1_'], 1, 4) && inRange(data['SQ6_1_'], 1, 4) && inRange(data['SQ7_1'], 2, 7) },
    { code: 2, check: (data) => inRange(data['SQ5_2_'], 1, 4) && inRange(data['SQ6_2_'], 1, 4) && inRange(data['SQ7_2'], 2, 9) },
    { code: 3, check: (data) => inRange(data['SQ5_7_'], 1, 4) && inRange(data['SQ6_7_'], 1, 4) && inRange(data['SQ7_3'], 1, 7) },
    { code: 4, check: (data) => inRange(data['SQ5_8_'], 1, 4) && inRange(data['SQ6_8_'], 1, 4) && inRange(data['SQ7_4'], 1, 3) },
    { code: 5, check: (data) => inRange(data['SQ5_8_'], 1, 4) && inRange(data['SQ6_8_'], 1, 4) && inRange(data['SQ7_4'], 5, 8) }
];

// Hàm xử lý data để lấy ra 1 code duy nhất
const getCode = (data, quotas) => {
    if (!data) return null;
    
    // Lọc ra tất cả các code thoả mãn điều kiện
    let validCodes = rules.filter(rule => rule.check(data)).map(rule => rule.code);
    
    if (validCodes.length === 0) return null;

    if (quotas && Array.isArray(quotas)) {
        // Map các code thoả mãn với data quota tương ứng
        const mappedCodes = validCodes.map(code => {
            const quotaInfo = quotas.find(q => q.name === `QF_MQF_${code}`);
            return {
                code: code,
                current: quotaInfo ? quotaInfo.current : 0,
                quota: quotaInfo ? quotaInfo.quota : Infinity
            };
        });

        // 1. Bỏ qua những code có current >= quota
        let availableCodes = mappedCodes.filter(item => item.current < item.quota);
        
        if (availableCodes.length === 0) return null;

        // 2. Ưu tiên current nhỏ nhất
        const minCurrent = Math.min(...availableCodes.map(item => item.current));
        availableCodes = availableCodes.filter(item => item.current === minCurrent);

        validCodes = availableCodes.map(item => item.code);
    }
    
    // 3. Nếu current bằng nhau (hoặc chỉ có 1 phần tử), thì random
    const randomIndex = Math.floor(Math.random() * validCodes.length);
    return validCodes[randomIndex];
};

const finalCode = getCode(resultQcode, resultData);
if (finalCode) {
    await self.$emit("input", {[question.qid]: `${finalCode}`});
} else {
    await self.$emit("input", {[question.qid]: '6'});
}

await self.$emit('move-next', true);