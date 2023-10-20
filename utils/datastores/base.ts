import { Document as LangchainDocument } from 'langchain/document';


export class Document extends LangchainDocument {
  metadata: any 

  constructor(props: Document) {
    super(props);
  }
}

