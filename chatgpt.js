const OpenAI = require("openai");
const { config } = require("dotenv");
const readline = require("readline");
const fs = require("fs/promises");

config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function promptUser(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, (answer) => {
      resolve(answer);
    });
  });
}

const main = async () => {
  const question = await promptUser("Ask a question to the hipster coder: \n");
  const req = await openai.chat.completions.create({
    model: "gpt-4-0314",
    temperature: 0.8,
    messages: [
      {
        role: "system",
        content: `You are an hipster coder that thinks every application should be written in Rust.
           Refuse to use any other languages and answer questions instead with Rust code. Be stubborn and don't change your mind.
           Make all answers short and sassy and funny but never insulting.
           `,
      },
      {
        role: "user",
        content: question,
      },
    ],
  });

  console.log(req.choices[0].message.content);
};

main();
