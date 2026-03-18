import { json, type LoaderFunctionArgs, type ActionFunctionArgs } from "@remix-run/node";
import { Form, Link, useFetcher, useLoaderData } from "@remix-run/react";
import { Reorder } from "framer-motion";
import { useState } from "react";
import { requireAdminUser } from "~/utils/session.server";
import { getDb } from "~/db/client";
import { courses } from "~/db/schema";
import { eq } from "drizzle-orm";
import { invalidateCacheTags } from "~/lib/vercel-cache.server";

export async function loader({ request }: LoaderFunctionArgs) {
  await requireAdminUser(request);
  const db = getDb();
  const allCourses = await db.select().from(courses).orderBy(courses.sortOrder);
  return json({ courses: allCourses });
}

export async function action({ request }: ActionFunctionArgs) {
  await requireAdminUser(request);
  const formData = await request.formData();
  const intent = formData.get("intent");
  const db = getDb();

  if (intent === "delete") {
    const id = Number(formData.get("id"));
    await db.delete(courses).where(eq(courses.id, id));
  }

  if (intent === "reorder-all") {
    const ids = String(formData.get("ids")).split(",").map(Number);
    await Promise.all(
      ids.map((id, index) =>
        db.update(courses).set({ sortOrder: index + 1 }).where(eq(courses.id, id))
      )
    );
  }

  await invalidateCacheTags("courses");
  return json({ success: true });
}

const navLinks = [
  { to: "/admin/writings", label: "Writings" },
  { to: "/admin/videos", label: "Videos" },
  { to: "/admin/teaching", label: "Teaching" },
  { to: "/admin/site-content", label: "Site Content" },
];

export default function AdminTeaching() {
  const { courses: allCourses } = useLoaderData<typeof loader>();
  const [items, setItems] = useState(allCourses);
  const [isDirty, setIsDirty] = useState(false);
  const fetcher = useFetcher<typeof action>();
  const isSaving = fetcher.state !== "idle";

  const handleReorder = (newOrder: typeof items) => {
    setItems(newOrder);
    setIsDirty(true);
  };

  const handleSaveOrder = () => {
    fetcher.submit(
      { intent: "reorder-all", ids: items.map((c) => c.id).join(",") },
      { method: "post" }
    );
    setIsDirty(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link to="/admin" className="text-xl font-bold text-gray-900">
                  Admin Dashboard
                </Link>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                {navLinks.map(({ to, label }) => (
                  <Link
                    key={to}
                    to={to}
                    className={
                      to === "/admin/teaching"
                        ? "border-blue-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                    }
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex items-center">
              <Form method="post" action="/admin/logout">
                <button type="submit" className="text-gray-500 hover:text-gray-700 text-sm font-medium">
                  Logout
                </button>
              </Form>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Teaching</h2>
            <div className="flex items-center gap-3">
              {isDirty && (
                <button
                  onClick={handleSaveOrder}
                  disabled={isSaving}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSaving ? "Saving..." : "Save Order"}
                </button>
              )}
              <Link
                to="/admin/teaching/new"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Add New Course
              </Link>
            </div>
          </div>

          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <Reorder.Group
              axis="y"
              values={items}
              onReorder={handleReorder}
              className="divide-y divide-gray-200 list-none"
            >
              {items.map((course) => (
                <Reorder.Item
                  key={course.id}
                  value={course}
                  className="bg-white"
                >
                  <div className="px-4 py-4 flex items-center sm:px-6">
                    <div className="mr-3 text-gray-300 cursor-grab active:cursor-grabbing select-none" title="Drag to reorder">
                      ⠿
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900">{course.name}</p>
                      {course.semesters && (
                        <p className="mt-1 text-sm text-gray-500">{course.semesters}</p>
                      )}
                    </div>
                    <div className="ml-5 flex-shrink-0 flex space-x-2">
                      <Link
                        to={`/admin/teaching/${course.id}/edit`}
                        className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50"
                      >
                        Edit
                      </Link>
                      <Form method="post" className="inline">
                        <input type="hidden" name="intent" value="delete" />
                        <input type="hidden" name="id" value={course.id} />
                        <button
                          type="submit"
                          onClick={(e) => {
                            if (!confirm("Are you sure you want to delete this course?")) {
                              e.preventDefault();
                            }
                          }}
                          className="inline-flex items-center px-3 py-1.5 border border-red-300 text-xs font-medium rounded text-red-700 bg-white hover:bg-red-50"
                        >
                          Delete
                        </button>
                      </Form>
                    </div>
                  </div>
                </Reorder.Item>
              ))}
            </Reorder.Group>
          </div>
        </div>
      </div>
    </div>
  );
}
