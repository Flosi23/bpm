import { SpotifyApi } from "@spotify/web-api-ts-sdk";
import { env } from "@/lib/env.server";
import type { SpotifyAccessToken } from "../model/auth";

const CLIENT_ID = env.get("SPOTIFY_CLIENT_ID");

function sdk(accessToken: SpotifyAccessToken) {
  return SpotifyApi.withAccessToken(CLIENT_ID, accessToken);
}
