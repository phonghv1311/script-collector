const keysWithQ18FilterNonNull = Object.keys(result).filter(
	(key) => key.startsWith("Q18_filter") && result[key] !== null
);

if(keysWithQ18FilterNonNull.length > 0) {
	let answer = keysWithQ18FilterNonNull.length;
	if(answer > 3) answer = 3;
	await self.$emit("input", {[question.qid]: `${answer}`})

	// comment for test
	// setTimeout(() => {
	//     self.$emit('move-next', true)
	// })
}