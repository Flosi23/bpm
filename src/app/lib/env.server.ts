import { type } from "arktype";

const Env = type({
  SPOTIFY_CLIENT_ID: "string",
  SPOTIFY_CLIENT_SECRET: "string",
  SPOTIFY_REDIRECT_URL: "string.url",
  SPOTIFY_AUTHORIZATION_ENDPOINT: "string.url",
  SPOTIFY_TOKEN_ENDPOINT: "string.url",
  NODE_ENV: "('development' | 'test' | 'production')='development'",
});

type Env = typeof Env.infer;

const parsedEnv = Env.assert(process.env);

function get<K extends keyof Env>(key: K): Env[K] {
  return parsedEnv[key];
}

export const env = {
  get,
};
