import { type } from "arktype";

export interface SpotifyAccessToken {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  expires?: number;
}

export const SpotifyTokenResponse = type({
  access_token: "string",
  token_type: "string",
  expires_in: "number.integer > 0",
  refresh_token: "string",
});

export type SpotifyTokenResponse = typeof SpotifyTokenResponse.infer;
