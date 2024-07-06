import { useMeasure } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";

const AdaptiveImage = ({
  containerHeight,
  height,
}: {
  containerHeight: number;
  height: number;
}) => {
  return (
    <img
      className="object-contain max-w-full py-6 flex-1"
      style={{
        height: containerHeight - height,
      }}
      src="/BioPic.jpeg"
      alt="Aaron Glasser"
    />
  );
};

export default function Index() {
  const [ref, { height }] = useMeasure<HTMLDivElement>();
  const [containerRef, { height: bodyHeight }] = useMeasure<HTMLDivElement>();

  const [containerHeight, setContainerHeight] = useState<number>(200);
  const [textHeight, setTextHeight] = useState<number>(100);

  useEffect(() => {
    if (!bodyHeight || !height) return;
    setContainerHeight(bodyHeight);
    setTextHeight(height);
  }, [bodyHeight, height]);

  return (
    <div
      ref={containerRef}
      className="text-neutral-200 leading-6 flex flex-col flex-1 px-8 max-h-[calc(100svh-100px)]"
    >
      <div
        ref={ref}
        className="mx-auto my-0 pt-16 py-0 w-fit text-center leading-6 flex flex-col items-center gap-y-6"
      >
        <h2>Aaron Glasser</h2>
        <p className="text-justify max-w-[90ch]">
          I am currently a PhD candidate in the philosophy department at the
          University of Michigan. My broad research interests include philosophy
          of mind, action, moral psychology, cognitive science, and nonwestern
          philosophy. These usually lead me to questions about attention and
          agency, with a special focus on our relationship with what is salient
          to us. Outside of academia, I like to make/curate movies.
        </p>
        <p className="text-center mx-auto">
          email:{" "}
          <a
            className="underline decoration-soft-white"
            href="mailto:agmail@umich.edu"
          >
            agmail@umich.edu
          </a>
        </p>
      </div>
      <AdaptiveImage containerHeight={containerHeight} height={textHeight} />
    </div>
  );
}
