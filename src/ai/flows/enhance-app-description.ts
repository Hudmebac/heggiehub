
'use server';
/**
 * @fileOverview Enhances an app description based on its name and URL.
 *
 * - enhanceAppDescription - A function that enhances an app description.
 * - EnhanceAppDescriptionInput - The input type for the enhanceAppDescription function.
 * - EnhanceAppDescriptionOutput - The return type for the enhanceAppDescription function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const EnhanceAppDescriptionInputSchema = z.object({
  appName: z.string().describe('The name of the application.'),
  appUrl: z.string().describe('The URL where the application is hosted.'),
});
export type EnhanceAppDescriptionInput = z.infer<typeof EnhanceAppDescriptionInputSchema>;

const EnhanceAppDescriptionOutputSchema = z.object({
  enhancedDescription: z
    .string()
    .describe('A short, engaging, 1-2 sentence description for the app.'),
});
export type EnhanceAppDescriptionOutput = z.infer<typeof EnhanceAppDescriptionOutputSchema>;

export async function enhanceAppDescription(input: EnhanceAppDescriptionInput): Promise<EnhanceAppDescriptionOutput> {
  return enhanceAppDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'enhanceAppDescriptionPrompt',
  input: {
    schema: EnhanceAppDescriptionInputSchema,
  },
  output: {
    schema: EnhanceAppDescriptionOutputSchema,
  },
  prompt: `You are a creative copywriter specializing in short, engaging app descriptions.

  Based on the app's name and URL, generate a compelling 1-2 sentence description that hints at its potential purpose or theme. Make it slightly witty or intriguing if appropriate for the name.

  App Name: {{{appName}}}
  App URL: {{{appUrl}}}

  Generate only the enhanced description text.`,
});

const enhanceAppDescriptionFlow = ai.defineFlow<
  typeof EnhanceAppDescriptionInputSchema,
  typeof EnhanceAppDescriptionOutputSchema
>({
  name: 'enhanceAppDescriptionFlow',
  inputSchema: EnhanceAppDescriptionInputSchema,
  outputSchema: EnhanceAppDescriptionOutputSchema,
},
async input => {
  const {output} = await prompt(input);
  if (!output) {
    // Fallback if AI fails to generate
    return { enhancedDescription: `Explore the ${input.appName} application.` };
  }
  return output;
});
