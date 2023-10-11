import { NextApiResponse , NextApiRequest } from 'next';

import {  ChatRequest } from '@/types';
import AgentManager from '@/utils/agent';


const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const data = req.body as ChatRequest;

  const manager = new AgentManager({  topK: 5 });

  if (data.streaming) {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
    });
  }

  const streamData = (data: string) => {
    const input = data === '[DONE]' ? data : encodeURIComponent(data);
    res.write(input);
  };



  const [answer] = await Promise.all([
    manager.query({
      input: data.query,
      stream: data.streaming ? streamData : undefined,
    }),
  ]);
  
  if (data.streaming) {
    streamData('[DONE]');
  } else {
    return {
      answer,
    };
  }
};

export default handler;
