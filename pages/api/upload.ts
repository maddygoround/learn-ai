import { NextRequest, NextResponse } from "next/server";
import { IncomingForm, Fields, Files } from 'formidable'
import { FileLoader } from "@/utils/loaders/file";
import { IncomingMessage } from "http";
import { DatastoreManager } from "@/utils/datastores";
import countTokens from "@/utils/count-tokens";
export const config = {
    api: {
        bodyParser: false,
    },
}
const handler = async (request: IncomingMessage): Promise<any> => {
    try {
        const data = await new Promise<{ fields: any, files: any }>((resolve, reject) => {
            const form = new IncomingForm({
                multiples: false
            })
            form.parse(request, (err: any, fields: Fields<string>, files: Files<string>) => {
                if (err) return reject(err)
                resolve({ fields, files })
            })
        });
        const loader = new FileLoader();
        const document = await loader.load(data.files.file[0]);
        const hash = await DatastoreManager.hash(document);

        const chunks = await new DatastoreManager().upload(
            document
        );

        const text = chunks?.map((each) => each.pageContent)?.join('');
        const textSize = text?.length || 0;
        const nbTokens = countTokens({ text });
        return { nbTokens, textSize }
    } catch (error) {
        console.error(error);
        return new NextResponse("Error", { status: 500 });
    }
};

export default handler;
