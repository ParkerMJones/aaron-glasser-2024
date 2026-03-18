import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { asc } from "drizzle-orm";
import { Dropdown } from "~/components/dropdown";
import { getDb } from "~/db/client";
import { courses } from "~/db/schema";

export async function loader() {
  const db = getDb();
  const allCourses = await db.select().from(courses).orderBy(asc(courses.sortOrder));
  return json({ courses: allCourses }, {
    headers: {
      "Cache-Control": "public, max-age=0, s-maxage=31536000, stale-while-revalidate=86400",
      "Cache-Tag": "courses",
    },
  });
}

export default function Teaching() {
  const { courses: allCourses } = useLoaderData<typeof loader>();

  return (
    <div className="py-6 sm:py-12 px-4 sm:px-8 text-neutral-900 leading-6">
      <ul className="list-none space-y-6 sm:space-y-8">
        {allCourses.map((course) => (
          <li key={course.id}>
            <p className="text-lg text-neutral-800">
              {course.name}
              {course.semesters ? (
                <span className="text-sm text-zinc-400 ml-2">
                  ({course.semesters})
                </span>
              ) : null}
            </p>
            {course.description ? (
              <div className="sm:ml-6 sm:pr-6 text-left overflow-auto no-scrollbar">
                <Dropdown content={course.description} />
              </div>
            ) : null}
          </li>
        ))}
      </ul>

      <p className="mt-12 text-sm">
        Please{" "}
        <span className="font-bold underline">
          <a href="mailto:agmail@umich.edu">email me</a>
        </span>{" "}
        for a copy of any syllabus.
      </p>
    </div>
  );
}
