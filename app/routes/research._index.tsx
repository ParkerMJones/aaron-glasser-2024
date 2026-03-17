import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import clsx from "clsx";
import { Dropdown } from "~/components/dropdown";
import { getDb } from "~/db/client";
import { writings } from "~/db/schema";
import { desc } from "drizzle-orm";

export async function loader() {
  const db = getDb();
  const allWritings = await db.select().from(writings).orderBy(desc(writings.id));

  return json({ writings: allWritings });
}

const IN_DEVELOPMENT = [
  "A paper about the representational format of relevance",
  "A paper about attention norms",
  "A paper about creative agency",
  "A paper about intrusive thoughts",
  "A paper about diagnostic trends in psychiatry",
];

export default function Research() {
  const { writings: sortedWritings } = useLoaderData<typeof loader>();

  return (
    <div className="py-6 sm:py-12 px-4 sm:px-8 text-neutral-900 leading-6">
      <ul className="list-none space-y-6 sm:space-y-8">
        {sortedWritings.map((writing) => {
          const authorsSplit = writing.author
            .split(/[,&]/)
            .map((s) => s.trim());
          return (
            <li key={writing.id}>
              <Link
                className="flex text-lg sm:mr-12 text-neutral-800 hover:underline decoration-neutral-600"
                to={`/research/${writing.id}`}
              >
                <div>
                  {authorsSplit.map((author, index) => {
                    return (
                      <>
                        <span
                          key={`${writing.id}-${index}`}
                          className={clsx(
                            writing.author === "Glasser"
                              ? "font-normal"
                              : author === "Glasser"
                              ? "font-extrabold"
                              : "font-normal"
                          )}
                        >
                          {author}
                        </span>
                        <span>
                          {index === authorsSplit.length - 2
                            ? " & "
                            : " "}
                        </span>
                      </>
                    );
                  })}
                  <span>
                    {writing.date ? `(${writing.date}).` : ""}
                  </span>{" "}
                  <span>{writing.title}.</span>{" "}
                  <span className="italic text-sm text-zinc-400">
                    {writing.source}
                  </span>{" "}
                  <span>{writing.reference}</span>
                </div>
              </Link>
              <div className="sm:ml-6 sm:pr-6 text-left overflow-auto no-scrollbar">
                <Dropdown content={writing.abstract} />
              </div>
            </li>
          );
        })}
      </ul>

      <div className="mt-12 sm:mt-16">
        <p className="text-sm text-zinc-400 mb-4">
          In development — please email me for drafts or to talk about these projects
        </p>
        <ul className="list-none space-y-3">
          {IN_DEVELOPMENT.map((title) => (
            <li key={title} className="text-neutral-700">
              {title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
