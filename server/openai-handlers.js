const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();
const { OPENAI_API_KEY } = process.env;
const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});

const testFetch = async () => {
    const openai = new OpenAIApi(configuration);
    const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: "Say this is a test",
    temperature: 0,
    max_tokens: 7,
    });
    // const response = await openai.listEngines();
    console.log(response)
}

testFetch()

// console.log(OPENAI_API_KEY)