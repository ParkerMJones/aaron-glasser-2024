import { Link } from "@remix-run/react";
import clsx from "clsx";
import { Dropdown } from "~/components/dropdown";
import { writings } from "~/utils/writings";

const sortedWritings = writings.sort((a, b) => {
  const dateA = a.date ? new Date(a.date).getTime() : -Infinity;
  const dateB = b.date ? new Date(b.date).getTime() : -Infinity;

  return dateB - dateA; // Sort in descending order (most recent dates first)
});

export default function Philosophy() {
  return (
    <div className="pb-12">
      <div>
        <div className="mt-16 px-8 text-neutral-200 leading-6">
          <ul className="list-none">
            {sortedWritings.map((writing) => {
              const authorsSplit = writing.author.split(",");
              return (
                <li style={{ marginBottom: 36 }} key={writing.id}>
                  <Link
                    className="flex text-lg mr-12 text-[hsl(220,20%,97%)] hover:underline decoration-soft-white"
                    to={`/philosophy/${writing.id}`}
                    key={writing.id}
                  >
                    <div>
                      {authorsSplit.map((author, index) => {
                        return (
                          <>
                            <span
                              key={index}
                              className={clsx(
                                author === "Glasser"
                                  ? "font-extrabold"
                                  : "font-normal"
                              )}
                            >
                              {author}
                            </span>
                            <span>
                              {index === authorsSplit.length - 2 ? " & " : ", "}
                            </span>
                          </>
                        );
                      })}
                      <span>{writing.date ? `(${writing.date}),` : ""}</span>{" "}
                      <span>{writing.title}.</span>{" "}
                      <span className="italic text-sm text-zinc-400">
                        {writing.source}
                      </span>{" "}
                      <span>{writing.reference}</span>
                    </div>
                  </Link>
                  <div className="sm:ml-6 sm:pr-6 text-left overflow-auto no-scrollbar">
                    <Dropdown content={writing.abstract}></Dropdown>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
