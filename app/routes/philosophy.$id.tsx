import { Link, useParams } from "@remix-run/react";
import { writings } from "~/utils/writings";
import { ArrowLeft, Download } from "react-feather";

export default function Philosophy() {
  const { id } = useParams();
  const selectedWriting = writings.find((writing) => writing.id === Number(id));

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
    <div className="px-5 sm:px-12 text-neutral-900 leading-6 pb-12">
      <Link
        to="/philosophy"
        className="text-neutral-700 hover:underline underline-offset-4 flex items-center gap-x-2 mt-8 sm:mt-12 w-fit"
      >
        <ArrowLeft size={24} />
        Back
      </Link>
      <div className="mt-8 sm:mt-12 flex flex-col gap-y-8">
        <h1 className="text-neutral-900 text-3xl">{selectedWriting.title}</h1>
        {selectedWriting.document ? (
          <>
            <a
              href={selectedWriting.document}
              download={selectedWriting.documentName}
              className="border-b border-transparent hover:border-b-neutral-700 w-fit cursor-pointer flex items-center gap-x-2"
            >
              <p className="text-md">Download</p>
              <Download color="black" size={16} />
            </a>
            <iframe
              title={selectedWriting.title}
              src={selectedWriting.document}
              className="w-full h-[90vh]"
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
