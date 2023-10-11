# Chatbot UI Lite

A simple chatbot starter kit for OpenAI's chat model using Next.js, TypeScript, and Tailwind CSS.

## Features

The primary focus is on human-readable content like books, letters, and other documents, making it a practical and valuable tool for knowledge extraction and question-answering. You can upload an entire library's worth of books and documents and recieve pointed answers along with the name of the file and specific section within the file that the answer is based on!

## What you can do?
- Upload a variety of popular document types via a simple react frontend to create a custom knowledge base
- Retrieve accurate and relevant answers based on the content of your uploaded documents
- See the filenames and specific context snippets that inform the answer
- Explore the power of the OP Stack (OpenAI + Pinecone Vector Database) in a - user-friendly interface
- Load entire libraries' worth of books into The Vault

## Running Locally

**1. Clone Repo**

```bash
git clone https://github.com/maddygoround/learn-ai.git
```

**2. Install Dependencies**

```bash
npm i
```

**3. Provide OpenAI API Key**

Create a .env.local file in the root of the repo with your OpenAI API Key:

```bash
OPENAI_API_KEY=<YOUR_KEY>
```

**4. Run App**

```bash
npm run dev
```

**5. Start Building**

You should be able to start chatting with the bot.

Now, go build the app into whatever kind of chatbot you want!
