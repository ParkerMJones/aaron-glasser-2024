import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getDb } from "~/db/client";
import { writings, worksInProgress } from "~/db/schema";
import { asc } from "drizzle-orm";

export async function loader() {
  const db = getDb();
  const [allWritings, allWip] = await Promise.all([
    db.select().from(writings).orderBy(asc(writings.sortOrder)),
    db.select().from(worksInProgress).orderBy(asc(worksInProgress.sortOrder)),
  ]);
  return json({ writings: allWritings, worksInProgress: allWip });
}

export default function Research() {
  const { writings: sortedWritings, worksInProgress: wip } = useLoaderData<typeof loader>();

  return (
    <div className="py-6 sm:py-12 px-4 sm:px-8 text-neutral-900 leading-6">
      <div className="grid grid-cols-1 sm:grid-cols-[2fr_1fr] gap-12 sm:gap-16 items-start">
        {/* Papers column */}
        <div>
          <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-4">Papers</h2>
          <ul className="list-none space-y-2">
            {sortedWritings.map((writing) => (
              <li key={writing.id}>
                <Link
                  className="block text-lg text-neutral-800 hover:underline decoration-neutral-600 pl-6 -indent-6"
                  to={`/research/${writing.id}`}
                >
                  <span>{writing.title}</span>
                  {writing.date ? <span> ({writing.date})</span> : null}
                  {writing.source ? (
                    <>
                      {" "}
                      <span className="italic">{writing.source}</span>
                    </>
                  ) : null}
                  {writing.author?.trim() ? (
                    <span className="text-sm"> {writing.author.trim()}</span>
                  ) : null}
                  <span>.</span>
                </Link>
              </li>
            ))}
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
