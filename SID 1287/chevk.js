const duplicated = localStorage.getItem('duplicated_email')
if (Number(duplicated) === 1) {
    self.$emit('input', {[question.qid]: '1'})
} else {
    self.$emit('input', {[question.qid]: '2'})
}

setTimeout(async () => {
    await self.$emit('move-next', true)
})