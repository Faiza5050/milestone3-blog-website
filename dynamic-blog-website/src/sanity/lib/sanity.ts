import { createClient } from '@sanity/client';

export const apiVersion = "2024-12-31";

// Create Sanity client using environment variables
export const client = createClient({
  projectId: "r8zoifp0",  // Use the environment variable for projectId
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,       // Use the environment variable for dataset
  apiVersion: apiVersion,                                // API version
  useCdn: true,                                          // Set to `false` if you want to disable the CDN in production
});
