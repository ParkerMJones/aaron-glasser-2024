import { json, redirect, type LoaderFunctionArgs, type ActionFunctionArgs } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { requireAdminUser } from "~/utils/session.server";
import { getDb } from "~/db/client";
import { videos } from "~/db/schema";
import { eq } from "drizzle-orm";

export async function loader({ request, params }: LoaderFunctionArgs) {
  await requireAdminUser(request);
  const db = getDb();
  const video = await db.select().from(videos).where(eq(videos.id, Number(params.id))).limit(1);

  if (!video[0]) {
    throw new Response("Not Found", { status: 404 });
  }

  return json({ video: video[0] });
}

export async function action({ request, params }: ActionFunctionArgs) {
  await requireAdminUser(request);
  const formData = await request.formData();
  const db = getDb();

  const data = {
    vimeoId: Number(formData.get("vimeoId")),
    title: formData.get("title") as string,
  };

  await db.update(videos).set(data).where(eq(videos.id, Number(params.id)));

  return redirect("/admin/videos");
}

export default function EditVideo() {
  const { video } = useLoaderData<typeof loader>();

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
            <h2 className="text-2xl font-bold text-gray-900">Edit Video</h2>
            <Link
              to="/admin/videos"
              className="text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              Back to Videos
            </Link>
          </div>

          <Form method="post" className="space-y-6 bg-white shadow sm:rounded-lg p-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title *
              </label>
              <input
                type="text"
                name="title"
                id="title"
                required
                defaultValue={video.title}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
              />
            </div>

            <div>
              <label htmlFor="vimeoId" className="block text-sm font-medium text-gray-700">
                Vimeo ID *
              </label>
              <input
                type="number"
                name="vimeoId"
                id="vimeoId"
                required
                defaultValue={video.vimeoId}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Save Changes
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
