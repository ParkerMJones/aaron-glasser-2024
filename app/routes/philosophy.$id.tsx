import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { ArrowLeft, Download, ExternalLink } from "react-feather";
import { getDb } from "~/db/client";
import { writings } from "~/db/schema";
import { eq } from "drizzle-orm";

export async function loader({ params }: LoaderFunctionArgs) {
  const db = getDb();
  const writing = await db
    .select()
    .from(writings)
    .where(eq(writings.id, Number(params.id)))
    .limit(1);

  return json({ writing: writing[0] || null });
}

export default function Philosophy() {
  const { writing: selectedWriting } = useLoaderData<typeof loader>();

  if (!selectedWriting) {
    return (
      <div className="px-12">
        <Link
          to="/philosophy"
          className="text-neutral-700 hover:underline underline-offset-4 flex items-center gap-x-2 mt-8 sm:mt-12 w-fit"
        >
          <ArrowLeft size={24} />
          Back
        </Link>
        <h1 className="mt-8 sm:mt-12 text-neutral-900 leading-6 text-md">
          Writing not found
        </h1>
      </div>
    );
  }

  return (
    <div className="px-5 sm:px-12 text-neutral-900 leading-6 sm:h-auto flex flex-col sm:block pb-12 sm:pb-0">
      <Link
        to="/philosophy"
        className="text-neutral-700 hover:underline underline-offset-4 flex items-center gap-x-2 mt-8 sm:mt-12 w-fit"
      >
        <ArrowLeft size={24} />
        Back
      </Link>
      <div className="mt-8 sm:mt-12 flex flex-col gap-y-8 sm:pb-12">
        <h1 className="text-neutral-900 text-3xl">{selectedWriting.title}</h1>
        {selectedWriting.document ? (
          <>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={selectedWriting.document}
                target="_blank"
                rel="noopener noreferrer"
                className="sm:hidden border-b border-transparent hover:border-b-neutral-700 w-fit cursor-pointer flex items-center gap-x-2"
              >
                <p className="text-md">View PDF</p>
                <ExternalLink color="black" size={16} />
              </a>
              <a
                href={selectedWriting.document}
                download={selectedWriting.documentName}
                className="hidden sm:flex border-b border-transparent hover:border-b-neutral-700 w-fit cursor-pointer items-center gap-x-2"
              >
                <p className="text-md">Download</p>
                <Download color="black" size={16} />
              </a>
            </div>
            {/* Hide iframe on mobile (iOS Safari doesn't handle PDF iframes well) */}
            <iframe
              title={selectedWriting.title}
              src={selectedWriting.document}
              className="hidden sm:block w-full sm:h-[95vh]"
            />
          </>
        ) : (
          <p className="text-left text-base leading-7 max-w-[90ch]">
            This paper is currently under review. If interested, please email me
            at{" "}
            <a
              className="underline decoration-neutral-700"
              href="mailto:agmail@umich.edu"
            >
              agmail@umich.edu
            </a>
            .
          </p>
        )}
      </div>
    </div>
  );
}
