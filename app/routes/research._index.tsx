import { json } from "@remix-run/node";
import { Fragment } from "react";
import { Link, useLoaderData } from "@remix-run/react";
import clsx from "clsx";
import { Dropdown } from "~/components/dropdown";
import { getDb } from "~/db/client";
import { writings, worksInProgress } from "~/db/schema";
import { asc } from "drizzle-orm";

export async function loader() {
  const db = getDb();
  const [allWritings, allWip] = await Promise.all([
    db.select().from(writings).orderBy(asc(writings.sortOrder)),
    db.select().from(worksInProgress).orderBy(asc(worksInProgress.sortOrder)),
  ]);
  return json({ writings: allWritings, worksInProgress: allWip }, {
    headers: {
      "Cache-Control": "public, max-age=0, s-maxage=31536000, stale-while-revalidate=86400",
      "Cache-Tag": "writings,works-in-progress",
    },
  });
}

export default function Research() {
  const { writings: sortedWritings, worksInProgress: wip } = useLoaderData<typeof loader>();

  return (
    <div className="py-6 sm:py-12 px-4 sm:px-8 text-neutral-900 leading-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 sm:gap-16 items-start">
        {/* Papers column */}
        <div>
          <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-6">Papers</h2>
          <ul className="list-none space-y-3">
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
                          <Fragment key={`${writing.id}-${index}`}>
                            <span
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
                                : index < authorsSplit.length - 1
                                ? ", "
                                : ""}
                            </span>
                          </Fragment>
                        );
                      })}
                      {" "}<span>
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
        </div>

        {/* Works-in-Progress column */}
        <div>
          <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-6">Works-in-Progress</h2>
          <p className="text-sm text-zinc-400 mb-4">
            Please email me for drafts or to talk about these projects
          </p>
          <ul className="list-none space-y-3">
            {wip.map((item) => (
              <li key={item.id} className="text-neutral-700">
                {item.title}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
