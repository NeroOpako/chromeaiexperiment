const sendPromptButton = document.getElementById("sendPrompt");
const clearSessionButton = document.getElementById("clearSession");
const copyResponseButton = document.getElementById("copyResponse");
const input = document.getElementById("input");
const output = document.getElementById("output");
var session;

await initialize();

async function initialize() {
  if(session) {
    session.destroy();
  }
  const canCreate = await window.ai.canCreateTextSession();
  if (canCreate !== "no") {
    session = await window.ai.createTextSession();
    input.value = output.value = "";
  } else {
    input.value = output.value = "";
  }
}

sendPromptButton.addEventListener("click", async () => {
  output.value = "Loading...";
  if (session) {
    const result = await session.prompt(input.value);
    const stream = result.split(" ");
    output.value = "";
    let separator = "";
    for (const chunk of stream) {
      output.value += separator + chunk;
      separator = " ";
    }
  }
});

clearSessionButton.addEventListener("click", async () => {
  await initialize();
});

copyResponseButton.addEventListener("click", () => {
  navigator.clipboard.writeText(output.value);
});