import { type } from "arktype";
import { href, redirect } from "react-router";
import { env } from "@/lib/env.server";
import { SpotifyTokenResponse } from "../model/auth";

const SCOPES = [
  "user-read-playback-state",
  "user-read-currently-playing",
  "playlist-read-private",
  "playlist-read-collaborative",
  "playlist-modify-private",
  "playlist-modify-public",
  "user-library-read",
  "user-library-modify",
];

const SPOTIFY_CLIENT_ID = env.get("SPOTIFY_CLIENT_ID");
const SPOTIFY_CLIENT_SECRET = env.get("SPOTIFY_CLIENT_SECRET");
const SPOTIFY_REDIRECT_URL = env.get("SPOTIFY_REDIRECT_URL");
const SPOTIFY_AUTHORIZATION_ENDPOINT = env.get("SPOTIFY_AUTHORIZATION_ENDPOINT");
const SPOTIFY_TOKEN_ENDPOINT = env.get("SPOTIFY_TOKEN_ENDPOINT");

function authenticate() {
  const searchParams = new URLSearchParams();
  searchParams.set("response_type", "code");
  searchParams.set("client_id", SPOTIFY_CLIENT_ID);
  searchParams.set("redirect_uri", SPOTIFY_REDIRECT_URL);
  searchParams.set("show_dialog", "true");
  for (const s of SCOPES) {
    searchParams.append("scope", s);
  }
  throw redirect(`${SPOTIFY_AUTHORIZATION_ENDPOINT}?${searchParams.toString()}`);
}

const tokenExpectedParams = type({
  code: "string",
}).or({
  error: "'access_denied' | string",
});

async function requestToken(request: Request): Promise<SpotifyTokenResponse> {
  const url = new URL(request.url);
  const params = tokenExpectedParams.assert(Object.fromEntries(url.searchParams));

  if ("error" in params) {
    throw redirect(href("/spotify/login"));
  }

  const code = params.code;

  const res = await fetch(SPOTIFY_TOKEN_ENDPOINT, {
    method: "POST",
    body: `code=${code}&redirect_uri=${SPOTIFY_REDIRECT_URL}&grant_type=authorization_code`,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString("base64")}`,
    },
  });

  return SpotifyTokenResponse.assert(await res.json());
}

export const auth = {
  authenticate: authenticate,
  requestToken: requestToken,
};
