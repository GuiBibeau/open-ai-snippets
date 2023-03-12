const { Configuration, OpenAIApi } = require("openai");
const { config } = require("dotenv");
config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const main = async () => {
  const question = "A little pig in a hat in manga style";
  const response = await openai.createImage({
    prompt: question,
    size: '256x256',
    response_format: 'url'
});

  console.log(response.data.data[0].url);
};

main();
