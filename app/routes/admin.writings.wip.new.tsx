import { redirect, type ActionFunctionArgs, type LoaderFunctionArgs } from "@remix-run/node";
import { Form, Link, useNavigation } from "@remix-run/react";
import { requireAdminUser } from "~/utils/session.server";
import { getDb } from "~/db/client";
import { worksInProgress } from "~/db/schema";
import { invalidateCacheTags } from "~/lib/vercel-cache.server";
import { sql } from "drizzle-orm";

export async function loader({ request }: LoaderFunctionArgs) {
  await requireAdminUser(request);
  return {};
}

export async function action({ request }: ActionFunctionArgs) {
  await requireAdminUser(request);
  const formData = await request.formData();
  const title = String(formData.get("title")).trim();

  const db = getDb();
  const [{ maxOrder }] = await db
    .select({ maxOrder: sql<number>`coalesce(max(sort_order), 0)` })
    .from(worksInProgress);

  await db.insert(worksInProgress).values({ title, sortOrder: maxOrder + 1 });
  await invalidateCacheTags("works-in-progress");

  return redirect("/admin/writings");
}

export default function AdminWipNew() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

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
                <Link
                  to="/admin/writings"
                  className="border-blue-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Writings
                </Link>
                <Link
                  to="/admin/videos"
                  className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Videos
                </Link>
                <Link
                  to="/admin/teaching"
                  className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Teaching
                </Link>
                <Link
                  to="/admin/site-content"
                  className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Site Content
                </Link>
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

      <div className="max-w-3xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex items-center gap-4 mb-6">
            <Link to="/admin/writings" className="text-gray-500 hover:text-gray-700 text-sm">
              ← Back to Writings
            </Link>
            <h2 className="text-2xl font-bold text-gray-900">New Work-in-Progress</h2>
          </div>

          <div className="bg-white shadow sm:rounded-md p-6">
            <Form method="post">
              <div className="mb-6">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. A paper about attention norms"
                />
              </div>

              <div className="flex justify-end gap-3">
                <Link
                  to="/admin/writings"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-60"
                >
                  {isSubmitting ? "Saving..." : "Save"}
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
