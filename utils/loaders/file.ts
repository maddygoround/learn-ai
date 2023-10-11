import { readFile } from 'fs/promises';
import { Document } from '@/utils/datastores/base';
import { File } from 'formidable'
import uuidv4 from '../uuid';

export const fileBufferToString = async (props: {
  buffer: any;
  mimeType: string;
}) => {
  let text = '';

  switch (props.mimeType) {
    case 'text/csv':
    case 'text/plain':
    case 'application/json':
    case 'text/markdown':
      text = new TextDecoder('utf-8').decode(props.buffer);
      break;
  }

  return text;
};

export class FileLoader  {
  async getSize(text: string) {
    return new Blob([text]).size;
  }

  async load(filedata : File) {

    const buffer = await readFile(filedata.filepath);

    const text = await fileBufferToString({
      buffer,
      mimeType: filedata?.mimetype as string,
    });

    return new Document({
      pageContent: text,
      metadata: {
        datasource_id: uuidv4(),
        source_type: 'file',
        source: filedata?.newFilename,
        file_type: filedata.mimetype as string,
        custom_id: "123",
        tags: [],
      },
    });
  }
}
