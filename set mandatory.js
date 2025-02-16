self.$i18n.setLocaleMessage(self.lang, {
  ...self.$i18n.messages[self.lang],
  multiple_answer: {
    ...self.$i18n.messages[self.lang].multiple_answer,
    mandatory: {
      ...self.$i18n.messages[self.lang].multiple_answer.mandatory,
      any: "いくつでもお選びください"
    }
  }
})
