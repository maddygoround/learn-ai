import chat from '../chat';

export default class AgentManager {
  topK?: number;

  constructor({  topK }: {  topK?: number }) {
    
    this.topK = topK;
  }

  async query({
    input,
    stream,
    // history,
  }: {
    input: string;
    stream?: any;
    // history?: { from: MessageFrom; message: string }[] | undefined;
  }) {
    // if (this.agent.tools.length <= 1) {
    const { answer } = await chat({
      modelName: 'gpt-3.5-turbo',
      prompt:
        "As a customer support agent, please provide a helpful and professional response to the user's question or issue.",
      promptType: 'customer_support',
      // datastore: this.agent?.tools[0]?.datastore as any,
      query: input,
      topK: this.topK,
      temperature: 0,
      stream,
      // history,
    });

    return answer;
    // }

    // return this.runChain(input);
  }

  async getSingleDatastoreChain() { }

  // async runChain(query: string) {
  //   const { OpenAI } = await import('langchain/llms/openai');
  //   const { initializeAgentExecutor } = await import('langchain/agents');
  //   const { DynamicTool, ChainTool, Tool } = await import('langchain/tools');
  //   const { PromptTemplate } = await import('langchain/prompts');
  //   const model = new OpenAI({
  //     temperature: 0,
  //     modelName: 'gpt-3.5-turbo',
  //   });

  //   const tools: LangchainTool[] = [];

  //   for (const tool of this.agent.tools) {
  //     if (tool.type === ToolType.datastore) {
  //       const t = new DynamicTool({
  //         name: tool?.datastore?.name!,
  //         description: `QA - useful for when you need to ask questions about: ${
  //           tool?.datastore?.name
  //         } - ${tool?.datastore?.description!}}}`,
  //         func: async () => {
  //           const { answer } = await chat({
  //             datastore: tool.datastore as any,
  //             query: query,
  //           });

  //           return answer;
  //         },
  //       });
  //       t.returnDirect = true;

  //       // const qaTool = new ChainTool({
  //       //   name: tool?.datastore?.name!,
  //       //   description: tool?.datastore?.description!,
  //       //   chain: await loadDatastoreChain({
  //       //     datastore: tool?.datastore as any,
  //       //   }),
  //       // });

  //       // tools.push(qaTool);

  //       tools.push(t);
  //     }
  //   }

  //   console.log('TOOLS LENGTH', tools.length);

  //   const prompt = ZeroShotAgent.createPrompt(tools, {
  //     prefix: `Answer the following questions as best you can, but speaking as a customer support agent might speak AND ANSWER ALWAYS USING ALEXANDRINE. You have access to the following tools:`,
  //     // suffix: `Begin! Remember to speak as a pirate when giving your final answer. Use lots of "Args"`,
  //   });

  //   const chatPrompt = ChatPromptTemplate.fromPromptMessages([
  //     new SystemMessagePromptTemplate(prompt),
  //     HumanMessagePromptTemplate.fromTemplate(`{input}

  // This was your previous work (but I haven't seen any of it! I only see what you return as final answer):
  // {agent_scratchpad}`),
  //   ]);

  //   const llm = new ChatOpenAI({});

  //   const llmChain = new LLMChain({
  //     prompt: chatPrompt,
  //     llm,
  //   });

  //   const agent = new ZeroShotAgent({
  //     llmChain,
  //     allowedTools: tools.map((tool) => tool.name),
  //   });

  //   const executor = AgentExecutor.fromAgentAndTools({ agent, tools });

  //   const response = await executor.run(query);

  //   // const executor = await initializeAgentExecutor(
  //   //   tools,
  //   //   model,
  //   //   'zero-shot-react-description'
  //   // );

  //   // const result = await executor.call({ input: query });

  //   console.log('OUTPUT', response);

  //   return response;
  //   // return result.output as string;
  // }
}
