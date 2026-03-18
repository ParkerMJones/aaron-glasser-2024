import { put } from "@vercel/blob";
import { redirect, type ActionFunctionArgs, type LoaderFunctionArgs } from "@remix-run/node";
import { Form, Link, useNavigation } from "@remix-run/react";
import { unstable_createMemoryUploadHandler, unstable_parseMultipartFormData } from "@remix-run/node";
import { requireAdminUser } from "~/utils/session.server";
import { getDb } from "~/db/client";
import { writings } from "~/db/schema";
import { invalidateCacheTags } from "~/lib/vercel-cache.server";

export async function loader({ request }: LoaderFunctionArgs) {
  await requireAdminUser(request);
  return {};
}

export async function action({ request }: ActionFunctionArgs) {
  await requireAdminUser(request);

  const uploadHandler = unstable_createMemoryUploadHandler({ maxPartSize: 10_000_000 });
  const formData = await unstable_parseMultipartFormData(request, uploadHandler);

  const file = formData.get("document") as File | null;
  let documentUrl: string | null = null;
  let documentName: string | null = null;

  if (file && file.size > 0) {
    const blob = await put(file.name, file, { access: "public", allowOverwrite: true });
    documentUrl = blob.url;
    documentName = blob.pathname;
  }

  const db = getDb();
  await db.insert(writings).values({
    title: formData.get("title") as string,
    source: (formData.get("source") as string) || null,
    date: (formData.get("date") as string) || null,
    reference: (formData.get("reference") as string) || null,
    author: (formData.get("author") as string) || null,
    document: documentUrl,
    documentName: documentName,
    abstract: (formData.get("abstract") as string) || null,
  });

  await invalidateCacheTags("writings");
  return redirect("/admin/writings");
}

export default function NewWriting() {
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
            <h2 className="text-2xl font-bold text-gray-900">Add New Writing</h2>
            <Link
              to="/admin/writings"
              className="text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              Back to Writings
            </Link>
          </div>

          <Form method="post" encType="multipart/form-data" className="space-y-6 bg-white shadow sm:rounded-lg p-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title *
              </label>
              <input
                type="text"
                name="title"
                id="title"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
              />
            </div>

            <div>
              <label htmlFor="author" className="block text-sm font-medium text-gray-700">
                Author
              </label>
              <input
                type="text"
                name="author"
                id="author"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                  Date
                </label>
                <input
                  type="text"
                  name="date"
                  id="date"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
                />
              </div>

              <div>
                <label htmlFor="source" className="block text-sm font-medium text-gray-700">
                  Source/Journal
                </label>
                <input
                  type="text"
                  name="source"
                  id="source"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
                />
              </div>
            </div>

            <div>
              <label htmlFor="reference" className="block text-sm font-medium text-gray-700">
                Reference
              </label>
              <input
                type="text"
                name="reference"
                id="reference"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
              />
            </div>

            <div>
              <label htmlFor="document" className="block text-sm font-medium text-gray-700">
                PDF Document
              </label>
              <input
                type="file"
                name="document"
                id="document"
                accept=".pdf"
                className="mt-1 block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>

            <div>
              <label htmlFor="abstract" className="block text-sm font-medium text-gray-700">
                Abstract
              </label>
              <textarea
                name="abstract"
                id="abstract"
                rows={6}
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
                {isSubmitting ? "Creating..." : "Create Writing"}
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
