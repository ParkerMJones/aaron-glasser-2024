import { videos } from "~/utils/videos";
import ReactPlayer from "react-player";
import { ClientOnly } from "remix-utils/client-only";

export default function MoviesList() {
  return (
    <div className="m-6 mt-20 pb-2 flex flex-wrap gap-8 justify-evenly h-fit">
      {videos.map((video) => (
        <div key={video.id}>
          <div className="m-auto text-center">{video.title}</div>
          <ClientOnly fallback={<div />}>
            {() => (
              <ReactPlayer
                url={`https://vimeo.com/${video.vimeoId}`}
                width={400}
                height={225}
                controls={true}
                light={true}
              />
            )}
          </ClientOnly>
        </div>
      ))}
    </div>
  );
}
