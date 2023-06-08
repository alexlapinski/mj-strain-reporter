import * as fs from 'fs';
import * as yaml from 'js-yaml';
import { OpenAI } from 'langchain/llms/openai';
import { PromptTemplate } from 'langchain/prompts';
import { LLMChain } from 'langchain/chains';
import { config } from 'dotenv';

// Load .env file
config();

const model = new OpenAI({ 
    openAIApiKey: process.env.OPENAI_API_KEY, 
    temperature: 0.9,
});

const template = "What is a good name for a company that makes {product}?";
const prompt = new PromptTemplate({
    template: template,
    inputVariables: ["product"]
});

const chain = new LLMChain({ llm: model, prompt: prompt });

const run = async () => {
    const response = await chain.call({ product: "vegan sauces" });
    console.log(response);
};


run();