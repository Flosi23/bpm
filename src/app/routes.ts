import { index, type RouteConfig, route } from "@react-router/dev/routes";

export default [
  index("routes/index.tsx"),
  route("spotify/login", "./routes/spotify/login.tsx"),
  route("spotify/callback", "./routes/spotify/callback.tsx"),
] satisfies RouteConfig;
