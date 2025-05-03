// Enhance Bio
'use server';

/**
 * @fileOverview Enhances a LinkedIn bio with witty and humorous elements.
 *
 * - enhanceBio - A function that enhances a LinkedIn bio.
 * - EnhanceBioInput - The input type for the enhanceBio function.
 * - EnhanceBioOutput - The return type for the enhanceBio function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';
import {getLinkedInProfile} from '@/services/linkedin';

const EnhanceBioInputSchema = z.object({
  linkedinUrl: z
    .string()
    .describe('The URL of the LinkedIn profile to fetch the bio from.'),
});
export type EnhanceBioInput = z.infer<typeof EnhanceBioInputSchema>;

const EnhanceBioOutputSchema = z.object({
  enhancedBio: z
    .string()
    .describe('The enhanced bio with witty and humorous elements.'),
});
export type EnhanceBioOutput = z.infer<typeof EnhanceBioOutputSchema>;

export async function enhanceBio(input: EnhanceBioInput): Promise<EnhanceBioOutput> {
  return enhanceBioFlow(input);
}

const prompt = ai.definePrompt({
  name: 'enhanceBioPrompt',
  input: {
    schema: z.object({
      bio: z.string().describe('The original bio from the LinkedIn profile.'),
    }),
  },
  output: {
    schema: z.object({
      enhancedBio: z
        .string()
        .describe('The enhanced bio with witty and humorous elements.'),
    }),
  },
  prompt: `You are a witty and humorous writer who specializes in enhancing biographies.

  Please inject witty and humorous elements into the following bio to make it more engaging and personalized.

  Original Bio: {{{bio}}}`,
});

const enhanceBioFlow = ai.defineFlow<
  typeof EnhanceBioInputSchema,
  typeof EnhanceBioOutputSchema
>({
  name: 'enhanceBioFlow',
  inputSchema: EnhanceBioInputSchema,
  outputSchema: EnhanceBioOutputSchema,
},
async input => {
  const linkedInProfile = await getLinkedInProfile(input.linkedinUrl);
  const {output} = await prompt({bio: linkedInProfile.summary});
  return output!;
});
