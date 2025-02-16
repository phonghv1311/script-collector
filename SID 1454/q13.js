const messageText = {
  en: "半角で入力ください。",
  ja: "半角で入力ください。",
};
const messageInput1 = {
  en: "Number of characters allowed in sub questions is: 8 digits",
  ja: "半角数字8桁入力ください",
};
const messageInput2 = {
  en: "Number of characters allowed in sub questions is: 2 digits",
  ja: "半角数字2桁入力ください",
};

const qcode = "Q13";
const inp8 = 8;
const inp2 = 2;

let answers = {
  1: null,
  2: null,
  3: null,
};

//if it is specific in which question use this
self.$watch("value", (newVal, oldVal) => {
  if (
    JSON.stringify(newVal) === JSON.stringify(oldVal) ||
    question.code !== "Q13"
  )
    return;

  const numberRegex = /^[0-9]+$/;
  for (const squestion in newVal) {
    const [, qcode] = squestion.split("_");
    const key = `${question.qid}_${qcode}_`;
    if (!numberRegex.test(newVal[key]) && newVal[key]) {
      // self.$emit('input', { [key]: oldVal[key] }) // comment cho phep input text

      // show popup when input text
      self.$buefy.dialog.alert({
        message: messages[self.lang] || messages.ja,
        confirmText: "Close",
      });
    }

    // TH input 8 digits
    if (Number(qcode) === 1 && newVal[key].length > inp8) {
      self.$emit("input", { [key]: oldVal[key] });
      self.$buefy.dialog.alert({
        message: messageInput1[self.lang] || messageInput1.ja,
        confirmText: "Close",
      });
    }

    // TH input 2 digits
    if (
      (Number(qcode) === 2 || Number(qcode) === 3) &&
      newVal[key].length > inp2
    ) {
      self.$emit("input", { [key]: oldVal[key] });
      self.$buefy.dialog.alert({
        message: messageInput2[self.lang] || messageInput2.ja,
        confirmText: "Close",
      });
    }

    answers[qcode] = newVal[key];
  }
});

// logic show popup
function showPopup() {
  if (answers[1].length !== inp8) {
    self.$buefy.dialog.alert({
      message: messageInput1[self.lang] || messageInput1.ja,
      confirmText: "Close",
    });
  } else if (answers[2].length !== inp2 || answers[3].length !== inp2) {
    self.$buefy.dialog.alert({
      message: messageInput2[self.lang] || messageInput2.ja,
      confirmText: "Close",
    });
  } else {
    window.addEventListener("keypress", window.customEnterSubmit.enterListener);
    window.removeEventListener("keypress", window.scriptQ13);
    self.$emit("move-next", true);
    return;
  }
}

// button click
document.getElementsByTagName("button").forEach(function (btn, index) {
  btn.addEventListener("click", function (e) {
    if (question.code !== qcode) {
      return;
    }
    showPopup();
    e.preventDefault();
  });
});
// enter
window.scriptQ13 = function (e) {
  if (question.code !== qcode) {
    return;
  }
  if (e.key === "Enter" || e.keyCode === 13) {
    showPopup();
    e.preventDefault();
  }
};

window.addEventListener("keypress", window.scriptQ13);
window.removeEventListener("keypress", window.customEnterSubmit.enterListener);
