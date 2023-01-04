const { Configuration, OpenAIApi } = require("openai");
const { config } = require("dotenv");
config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const main = async () => {
  const question = "What is the capital of France?";
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: question,
  });


  console.log(completion.data.choices[0].text);
};

main();
