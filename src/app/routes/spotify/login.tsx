import { Form, useLoaderData } from "react-router";
import { spotify } from "@/.server/spotify";
import { SpotifyFull } from "@/components/icons/spotify-full";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { Rand } from "@/lib/rand";

export const action = async () => {
  return spotify.auth.authenticate();
};

export const loader = async () => {
  const seed = Rand.seed();
  return { seed };
};

export default function Page() {
  const { seed } = useLoaderData<typeof loader>();
  const rand = new Rand(seed);

  return (
    <div className="grid h-screen w-screen grid-cols-1 overflow-hidden xl:grid-cols-2">
      <div className="relative flex flex-col overflow-hidden bg-spotify-background">
        <div className="absolute top-1/2 right-0 opacity-20">
          {Array.from({ length: 9 }).map((_, i) => (
            <Circle key={`circle-${i}`} i={i} className="border-white" />
          ))}
        </div>

        <div className="absolute inset-0 z-0 hidden items-center justify-center opacity-15 xl:flex">
          <div className="flex h-[30vh] items-center justify-center gap-2">
            {Array.from({ length: 45 }).map((_, i) => (
              <div
                key={`wave-${i}`}
                className="w-1.5 bg-white"
                style={{
                  animationDuration: `${rand.number(0.2, 0.7)}s`,
                  animationDirection: "alternate",
                  animationTimingFunction: "ease-in-out",
                  animationIterationCount: "infinite",
                  animationName: {
                    0: "wave-sm",
                    1: "wave-md",
                    2: "wave-lg",
                  }[i % 3],
                }}
              />
            ))}
          </div>
        </div>

        <div className="z-10 m-auto flex max-w-md flex-col justify-center rounded-2xl p-4 text-spotify-foreground *:text-left">
          <SpotifyFull className="-ml-1 w-60" />

          <p className="mt-8 mb-10 text-center text-xl">
            Login with Spotify, connect your account and get bpm information from your favorite songs
          </p>

          <Form method="post" className="w-full">
            <Button
              rounded="full"
              type="submit"
              size="2xl"
              className="w-full bg-spotify-foreground text-white transition-all hover:bg-spotify-foreground hover:shadow-2xl hover:shadow-black/20"
            >
              Continue to Spotify
            </Button>
          </Form>

          <p className="mt-4 max-w-md text-center text-sm text-spotify-foreground">
            By clicking "Continue with Spotify", you will be redirected to Spotify's authentication page to securely log
            in.
          </p>
        </div>
      </div>
      <div className="relative hidden overflow-hidden bg-background xl:block">
        <div className="absolute top-1/2 left-0 opacity-100 dark:opacity-30">
          {Array.from({ length: 9 }).map((_, i) => (
            <Circle key={`circle-${i}`} i={i} className="border-spotify-background" />
          ))}
        </div>
      </div>
    </div>
  );
}

interface CircleProps {
  className?: string;
  i: number;
}

function Circle({ className, i }: CircleProps) {
  return (
    <div
      className="absolute rounded-full"
      style={{
        width: `${(i + 1) * 10}vw`,
        minWidth: `${5 * i}rem`,
        height: `${(i + 1) * 8}vw`,
        minHeight: `${4 * i}rem`,
        top: "50%",
        left: "50%",
        transform: `translate(-50%, -50%) rotate(${i * 5}deg)`,
      }}
    >
      <div
        className={cn("h-full w-full rounded-full border-2", className)}
        style={{
          animationDelay: `${i}s`,
          animationName: "circle",
          animationDuration: "20s",
          animationTimingFunction: "ease-in-out",
          animationIterationCount: "infinite",
        }}
      />
    </div>
  );
}
