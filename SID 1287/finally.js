window.parent.postMessage('complete-survey', '*')
await self.$emit('move-next', true)