import { Link, useParams } from "@remix-run/react";
import { writings } from "~/utils/writings";
import { ArrowLeft, Download } from "react-feather";

export default function Philosophy() {
  const { id } = useParams();
  const selectedWriting = writings.find((writing) => writing.id === Number(id));

  if (!selectedWriting) {
    return (
      <div className="px-12">
        <h1 className="mt-16 px-6 text-neutral-200 leading-6 text-4xl">
          Writing not found
        </h1>
      </div>
    );
  }

  return (
    <div className="px-12 text-neutral-200 leading-6 pb-12">
      <Link
        to="/philosophy"
        className="text-[#f0f0f0] hover:underline underline-offset-4 flex items-center gap-x-2 mt-12"
      >
        <ArrowLeft size={24} />
        Back
      </Link>
      <div className="mt-16 flex flex-col gap-y-8">
        <h1 className="text-neutral-200 text-3xl">{selectedWriting.title}</h1>
        {selectedWriting.document ? (
          <>
            <a
              href={selectedWriting.document}
              download={selectedWriting.documentName}
              className="border-b border-transparent hover:border-b-soft-white w-fit cursor-pointer flex items-center gap-x-2"
            >
              <p className="text-md">Download</p>
              <Download color="white" size={16} />
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
              className="underline decoration-soft-white"
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
