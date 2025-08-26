import { createDirectus, rest, authentication } from "@directus/sdk";

export const API_URL = process.env.DIRECTUS_URL;

if (!API_URL) throw new Error("No API URL FOUND");

export const client = createDirectus(API_URL).with(rest());

export const authClient = createDirectus(API_URL)
  .with(authentication("json"))
  .with(rest());
