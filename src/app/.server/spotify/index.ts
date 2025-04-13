import { auth } from "./service/auth.service";

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

export const spotify = {
  SCOPES,
  auth: auth,
};
