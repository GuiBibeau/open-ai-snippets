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
  const question = await promptUser(
    "GPT was just forced to read the worst harry potter fan fiction, ask it anything: \n"
  );
  const book = await fs.readFile("bad-fanfic.txt", "utf8");
  const req = await openai.chat.completions.create({
    model: "gpt-4-1106-preview",
    temperature: 0.8,
    messages: [
      {
        role: "system",
        content: `You are a virulant literary critic and a sassy one. here is a book people will ask you questions about. Have sassy answers, and be brutally honest but keep answers short to maximum 1 sentance.

        ${book}
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
