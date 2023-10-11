import { z } from 'zod';
import type { Document } from '@/utils/datastores/base';
export enum OpenAIModel {
  DAVINCI_TURBO = "gpt-3.5-turbo"
}


export enum MetadataFields {
  datastore_id = 'datastore_id',
  datasource_id = 'datasource_id',
  tags = 'tags',
  text = 'text',
  chunk_hash = 'chunk_hash',
  datasource_hash = 'datasource_hash',
  chunk_offset = 'chunk_offset',
  custom_id = 'custom_id',
}
export const ChatResponse = z.object({
  answer: z.string(),
});

export type ChatResponse = z.infer<typeof ChatResponse>;

export const ChatRequest = z.object({
  query: z.string(),
  streaming: z.boolean().optional().default(false),
  visitorId: z.string().optional(),
});

export type ChatRequest = z.infer<typeof ChatRequest>;


export type PromptType = "raw" | "customer_support"

export type Agent = {
  id?: string
  name?: string
  description?: string
  prompt?: string | null
  promptType?: PromptType
  iconUrl?: string | null
  temperature?: number
  ownerId?: string | null
  nbQueries?: number | null
  handle?: string | null
}


export interface Message {
  role: Role;
  content: string;
}

export type Role = "assistant" | "user";

export type DocumentMetadata = {
  datasource_id?: string;
  source?: string;
  source_type?: string;
  file_type?: string;
  author?: string;
  tags?: string[];
  [key: string]: unknown;
};

export interface Chunk extends Document {
  metadata: DocumentMetadata & {
    datastore_id?: string;
    chunk_id?: string;
    chunk_hash?: string;
    datasource_hash?: string;
    chunk_offset?: number;
  };
}