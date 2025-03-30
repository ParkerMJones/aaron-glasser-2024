import { videos } from "~/utils/videos";
import ReactPlayer from "react-player";
import { ClientOnly } from "remix-utils/client-only";

export default function MoviesList() {
  return (
    <div className="m-8 mt-20 pb-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-evenly h-fit">
      {videos.map((video) => (
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
