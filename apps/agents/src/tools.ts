/**
 * This file defines the tools available to the ReAct agent.
 * Tools are functions that the agent can use to interact with external systems or perform specific tasks.
 */
import { TavilySearchResults } from "@langchain/community/tools/tavily_search";
import { tool } from "@langchain/core/tools";
import { z } from "zod";
import { retrieveJungianContexts } from "./rag/retriever.js";

const tavilyApiKey = process.env.TAVILY_API_KEY?.trim();

const jungianKbSearch = tool(
  async ({ question, topK }: { question: string; topK?: number }) => {
    const { confidence, contexts } = await retrieveJungianContexts(
      question,
      topK ?? 4,
    );

    return {
      confidence,
      contexts,
      contextCount: contexts.length,
    };
  },
  {
    name: "jungian_kb_search",
    description:
      "Retrieve Jungian source excerpts relevant to the current journal entry analysis.",
    schema: z.object({
      question: z
        .string()
        .min(5)
        .describe("The retrieval query based on the user's journal entry."),
      topK: z
        .number()
        .int()
        .min(1)
        .max(8)
        .optional()
        .describe("Maximum number of chunks to retrieve. Default is 4."),
    }),
  },
);

/**
 * Tavily web search is optional: omit when `TAVILY_API_KEY` is unset so deploys
 * (e.g. Render) can start without a Tavily subscription.
 */
export const TOOLS = [
  jungianKbSearch,
  ...(tavilyApiKey
    ? [
        new TavilySearchResults({
          maxResults: 3,
          apiKey: tavilyApiKey,
        }),
      ]
    : []),
];
