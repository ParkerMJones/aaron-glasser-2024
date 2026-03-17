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
  });
}

export default function Index() {
  const { bioHeading, bioText, email } = useLoaderData<typeof loader>();

  return (
    <div className="text-neutral-800 leading-6 flex flex-col sm:flex-row flex-1 px-8 pt-8 sm:pt-12 gap-x-12 gap-y-8">
      <div className="flex flex-col gap-y-6 sm:max-w-[55ch]">
        <h2 className="text-2xl font-medium">{bioHeading}</h2>
        <p className="text-left">{bioText}</p>
        <div className="flex flex-col gap-y-2 text-sm">
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
      <div className="flex-1 flex items-start justify-center sm:justify-start">
        <img
          className="object-contain max-w-full max-h-[70vh]"
          src="/BioPic.jpeg"
          alt="Aaron Glasser"
        />
      </div>
    </div>
  );
}
