import { json, redirect, type ActionFunctionArgs, type LoaderFunctionArgs } from "@remix-run/node";
import { Form, Link, useLoaderData, useNavigation } from "@remix-run/react";
import { requireAdminUser } from "~/utils/session.server";
import { getDb } from "~/db/client";
import { worksInProgress } from "~/db/schema";
import { eq } from "drizzle-orm";
import { invalidateCacheTags } from "~/lib/vercel-cache.server";

export async function loader({ request, params }: LoaderFunctionArgs) {
  await requireAdminUser(request);
  const db = getDb();
  const id = Number(params.id);
  const [item] = await db.select().from(worksInProgress).where(eq(worksInProgress.id, id));
  if (!item) throw new Response("Not Found", { status: 404 });
  return json({ item });
}

export async function action({ request, params }: ActionFunctionArgs) {
  await requireAdminUser(request);
  const db = getDb();
  const id = Number(params.id);
  const formData = await request.formData();
  const intent = formData.get("intent");

  if (intent === "delete") {
    await db.delete(worksInProgress).where(eq(worksInProgress.id, id));
    await invalidateCacheTags("works-in-progress");
    return redirect("/admin/writings");
  }

  const title = String(formData.get("title")).trim();
  await db.update(worksInProgress).set({ title }).where(eq(worksInProgress.id, id));
  await invalidateCacheTags("works-in-progress");

  return redirect("/admin/writings");
}

export default function AdminWipEdit() {
  const { item } = useLoaderData<typeof loader>();
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
            <h2 className="text-2xl font-bold text-gray-900">Edit Work-in-Progress</h2>
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
                  defaultValue={item.title}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex justify-between">
                <Form method="post">
                  <input type="hidden" name="intent" value="delete" />
                  <button
                    type="submit"
                    onClick={(e) => {
                      if (!confirm("Are you sure you want to delete this entry?")) {
                        e.preventDefault();
                      }
                    }}
                    className="inline-flex items-center px-4 py-2 border border-red-300 text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50"
                  >
                    Delete
                  </button>
                </Form>

                <div className="flex gap-3">
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
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
