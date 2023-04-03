const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();
const { OPENAI_API_KEY } = process.env;
const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});

const testFetch = async (req, res) => {
    const openai = new OpenAIApi(configuration);
    try{
      const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: "Say this is a test",
      temperature: 0,
      max_tokens: 7,
      });
      res.status(200).json(response)
    }
    catch(err){
      console.log(err)
      res.status(500).json(err)
    }
    // const response = await openai.listEngines();
}

module.exports = { testFetch }
// console.log(OPENAI_API_KEY)