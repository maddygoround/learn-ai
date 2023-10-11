import { Document as LangchainDocument } from 'langchain/document';

import {  DocumentMetadata } from '@/types';

export class Document extends LangchainDocument {
  metadata: DocumentMetadata 

  constructor(props: Document) {
    super(props);
  }
}

