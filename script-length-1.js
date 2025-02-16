const keysStartingWithQ1 = Object.keys(result).filter(key => key.startsWith("Q1__"));

if(keysStartingWithQ1.length === 1) {
    const answer = keysStartingWithQ1[0].replace('Q1__', '')
    self.selected = [answer];
    await self.$emit("input", {
        [self.questionKey(question.qid, null, answer)] : "1",
    });
    // await self.$emit('move-next',true);
}