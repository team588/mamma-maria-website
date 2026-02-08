// Sanity Client Configuration
// TODO: Install @sanity/client with: pnpm add @sanity/client next-sanity
// TODO: Create Sanity project at https://www.sanity.io/manage
// TODO: Add environment variables to .env.local

/*
import { createClient } from 'next-sanity';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
});

export async function sanityFetch<T>({
  query,
  tags,
}: {
  query: string;
  tags?: string[];
}): Promise<T> {
  return client.fetch<T>(query, {}, { next: { tags } });
}
*/

// Placeholder export until Sanity is configured
export const client = null;
export const sanityFetch = null;
