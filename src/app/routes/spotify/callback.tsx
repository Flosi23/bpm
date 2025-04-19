import { type } from "arktype";
import { useLoaderData } from "react-router";
import { spotify } from "@/.server/spotify";
import type { Route } from "./+types/callback";

export const expectedParams = type({
  code: "string",
});

export const loader = async ({ request }: Route.LoaderArgs) => {
  const tokens = await spotify.auth.requestToken(request);
  return { tokens };
};

export default function Page() {
  const { tokens } = useLoaderData<typeof loader>();

  return <div>{JSON.stringify(tokens)}</div>;
}
