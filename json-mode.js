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
  const question = await promptUser("Ask a react question: \n");
  const req = await openai.chat.completions.create({
    model: "gpt-4-1106-preview",
    temperature: 0.8,
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content: `You are a programmer focused on web performance. You code in next.js and react but every tip you give focuses on performance.
         You are a performance guru. Every tip you give should remind users of good UX, avoid rendering too much, and avoid blocking the main thread.
         each answer will be produced in json format: {code: "code here", explanation: "explanation here"}
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
