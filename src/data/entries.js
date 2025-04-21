/**
 * Tools collection structured as entries
 * 
 * Each entry has the following structure:
 * {
 *     title: string // display name
 *     link: string // the link for the website which contain learning resources
 *     description?: string // description that will be listed with your entry
 *     github?: string // username on github that will display a link to your repo
 *     tag: string // category/tag of the tool
 * }
 */

import { llmEntries } from './llm-entries';
import { aiEntries } from './ai-entries';
import { mcpEntries } from './mcp-entries';

// Combine all entries
export const entries = [...aiEntries, ...llmEntries, ...mcpEntries];
