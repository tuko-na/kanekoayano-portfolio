import { createClient } from "microcms-js-sdk";

const serviceDomain = process.env.NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN;
const apiKey = process.env.NEXT_PUBLIC_MICROCMS_API_KEY;

if (!serviceDomain) {
  throw new Error("MICROCMS_SERVICE_DOMAIN is required");
}

if (!apiKey) {
  throw new Error("MICROCMS_API_KEY is required");
}

// APIクライアントの初期化
export const client = createClient({
  serviceDomain,
  apiKey,
});