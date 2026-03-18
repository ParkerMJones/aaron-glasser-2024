import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getDb } from "~/db/client";
import { siteContent } from "~/db/schema";
import { eq } from "drizzle-orm";

export async function loader() {
  const db = getDb();
  const bioHeading = await db.select().from(siteContent).where(eq(siteContent.key, "bio_heading")).limit(1);
  const bioText = await db.select().from(siteContent).where(eq(siteContent.key, "bio_text")).limit(1);
  const email = await db.select().from(siteContent).where(eq(siteContent.key, "email")).limit(1);

  return json({
    bioHeading: bioHeading[0]?.value || "Aaron Glasser",
    bioText: bioText[0]?.value || "",
    email: email[0]?.value || "agmail@umich.edu",
  }, {
    headers: {
      "Cache-Control": "public, max-age=0, s-maxage=31536000, stale-while-revalidate=86400",
      "Cache-Tag": "site_content",
    },
  });
}

export default function Index() {
  const { bioHeading, bioText, email } = useLoaderData<typeof loader>();

  return (
    <div className="text-neutral-800 leading-6 flex flex-col items-center flex-1 px-8 pt-8 sm:pt-12 gap-y-6 max-w-[55ch] mx-auto">
      <h2 className="text-2xl font-medium text-center w-full">{bioHeading}</h2>
      <p className="text-justify">{bioText}</p>
      <img
        className="object-contain w-40 h-auto"
        src="/BioPic.jpeg"
        alt="Aaron Glasser"
      />
      <div className="flex flex-col items-center gap-y-2 text-sm">
        <p>
          email:{" "}
          <a
            className="underline decoration-neutral-800"
            href={`mailto:${email}`}
          >
            {email}
          </a>
        </p>
        <p>
          cv:{" "}
          <a
            className="underline decoration-neutral-800"
            href="/documents/cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            download
          </a>
        </p>
      </div>
    </div>
  );
}
