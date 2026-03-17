import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useMeasure } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";
import { getDb } from "~/db/client";
import { siteContent } from "~/db/schema";
import { eq } from "drizzle-orm";

export async function loader({ request }: LoaderFunctionArgs) {
  const db = getDb();

  const bioHeading = await db.select().from(siteContent).where(eq(siteContent.key, "bio_heading")).limit(1);
  const bioText = await db.select().from(siteContent).where(eq(siteContent.key, "bio_text")).limit(1);
  const email = await db.select().from(siteContent).where(eq(siteContent.key, "email")).limit(1);

  return json({
    bioHeading: bioHeading[0]?.value || "Aaron Glasser",
    bioText: bioText[0]?.value || "",
    email: email[0]?.value || "agmail@umich.edu",
  });
}

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
  const { bioHeading, bioText, email } = useLoaderData<typeof loader>();
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
      className="text-neutral-800 leading-6 flex flex-col flex-1 px-8 max-h-[calc(100svh-100px)]"
    >
      <div
        ref={ref}
        className="mx-auto my-0 pt-8 sm:pt-12 pb-0 w-fit text-center leading-6 flex flex-col items-center gap-y-6"
      >
        <h2 className="text-2xl font-medium">{bioHeading}</h2>
        <p className="text-left max-w-[90ch]">
          {bioText}
        </p>
        <p className="text-center mx-auto">
          email:{" "}
          <a
            className="underline decoration-neutral-800"
            href={`mailto:${email}`}
          >
            {email}
          </a>
        </p>
      </div>
      <AdaptiveImage containerHeight={containerHeight} height={textHeight} />
    </div>
  );
}
