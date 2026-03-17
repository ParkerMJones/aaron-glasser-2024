import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import ReactPlayer from "react-player";
import { ClientOnly } from "remix-utils/client-only";
import { getDb } from "~/db/client";
import { videos } from "~/db/schema";

export async function loader({ request }: LoaderFunctionArgs) {
  const db = getDb();
  const allVideos = await db.select().from(videos).orderBy(videos.id);
  return json({ videos: allVideos });
}

export default function MoviesList() {
  const { videos: allVideos } = useLoaderData<typeof loader>();

  return (
    <div className="px-4 sm:px-8 mt-6 sm:mt-12 pb-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-evenly h-fit">
      {allVideos.map((video) => (
        <div key={video.id}>
          <div className="m-auto text-center text-neutral-900 pb-1">
            {video.title}
          </div>
          <div className="aspect-video">
            <ClientOnly fallback={<div />}>
              {() => (
                <ReactPlayer
                  url={`https://vimeo.com/${video.vimeoId}`}
                  width="100%"
                  height="100%"
                  controls={true}
                  light={true}
                />
              )}
            </ClientOnly>
          </div>
        </div>
      ))}
    </div>
  );
}
