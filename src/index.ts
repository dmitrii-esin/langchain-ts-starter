import * as fs from "fs";
import * as dotenv from "dotenv";
import { loadSummarizationChain, AnalyzeDocumentChain } from "langchain/chains";
import { OpenAI } from "langchain";

dotenv.config();

// const model = new OpenAI({
//   modelName: "gpt-3.5-turbo",
//   openAIApiKey: process.env.OPENAI_API_KEY,
// });

// const res = await model.call(
//   "What's a good idea for an application to build with GPT-3?"
// );

// console.log(res);

// import { OpenAI } from "langchain/llms/openai";

export const run = async () => {
  // In this example, we use the `AnalyzeDocumentChain` to summarize a large text document.
  const text = fs.readFileSync("the_shadow_over_innsmouth.txt", "utf8");
  const model = new OpenAI({ temperature: 0 });
  const combineDocsChain = loadSummarizationChain(model);
  const chain = new AnalyzeDocumentChain({
    combineDocumentsChain: combineDocsChain,
  });
  const res = await chain.call({
    input_document: text,
  });
  console.log({ res });
  /*
  {
  res: {
    text: " The Shadow over Innsmouth is a horror novella by H. P. Lovecraft in which the protagonist investigates the strange town of Innsmouth and discovers a sinister secret. The town is known for its strange inhabitants, who have physical deformities and are not welcoming to strangers. Rumors of devil worship and piracy have been circulating for centuries, and the narrator discovers a strange tiara with intricate designs that hint at secrets and unimaginable abysses in time and space. The narrator's investigation leads them to uncover a cult called the Esoteric Order of Dagon, which has taken over the town and is responsible for the strange occurrences."
  }
}
  */
};

run();
