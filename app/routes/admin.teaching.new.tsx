import { json, redirect, type ActionFunctionArgs, type LoaderFunctionArgs } from "@remix-run/node";
import { Form, Link, useNavigation } from "@remix-run/react";
import { requireAdminUser } from "~/utils/session.server";
import { getDb } from "~/db/client";
import { courses } from "~/db/schema";
import { invalidateCacheTags } from "~/lib/vercel-cache.server";
import { max } from "drizzle-orm";

export async function loader({ request }: LoaderFunctionArgs) {
  await requireAdminUser(request);
  return {};
}

export async function action({ request }: ActionFunctionArgs) {
  await requireAdminUser(request);
  const formData = await request.formData();

  const db = getDb();
  const [{ maxOrder }] = await db.select({ maxOrder: max(courses.sortOrder) }).from(courses);

  await db.insert(courses).values({
    name: formData.get("name") as string,
    semesters: (formData.get("semesters") as string) || null,
    description: (formData.get("description") as string) || null,
    sortOrder: (maxOrder ?? 0) + 1,
  });

  await invalidateCacheTags("courses");
  return redirect("/admin/teaching");
}

export default function NewCourse() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state !== "idle";

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/admin" className="text-xl font-bold text-gray-900">
                Admin Dashboard
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Add New Course</h2>
            <Link to="/admin/teaching" className="text-sm font-medium text-gray-600 hover:text-gray-900">
              Back to Teaching
            </Link>
          </div>

          <Form method="post" className="space-y-6 bg-white shadow sm:rounded-lg p-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Course Name *
              </label>
              <input
                type="text"
                name="name"
                id="name"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
              />
            </div>

            <div>
              <label htmlFor="semesters" className="block text-sm font-medium text-gray-700">
                Semesters
              </label>
              <input
                type="text"
                name="semesters"
                id="semesters"
                placeholder="e.g. Fall 2023; Winter 2024"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                id="description"
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex justify-center items-center gap-2 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting && (
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                  </svg>
                )}
                {isSubmitting ? "Creating..." : "Create Course"}
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
