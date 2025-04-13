import { Form } from "react-router";
import { Button } from "@/components/ui/button";
import { spotify } from "@/.server/spotify";

export const action = async () => {
  return spotify.auth.authenticate();
};

export default function Page() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <Form method="post">
        <Button type="submit">Login with Spotify</Button>
      </Form>
    </div>
  );
}
