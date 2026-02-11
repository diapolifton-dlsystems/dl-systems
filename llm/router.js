const openaiHandler = require("./providers/openai");
const claudeHandler = require("./providers/claude");

async function routeLLM({ model, prompt }) {
  switch (model) {
    case "openai":
      return openaiHandler(prompt);

    case "claude":
      return claudeHandler(prompt);

    default:
      throw new Error("Unsupported model");
  }
}

module.exports = routeLLM;
function routeModel(task) {
  switch (task) {
    case "analysis":
      return "gpt";
    case "summarization":
      return "claude";
    default:
      return "default";
  }
}
