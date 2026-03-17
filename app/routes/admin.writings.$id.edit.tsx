import { json, redirect, type LoaderFunctionArgs, type ActionFunctionArgs } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { requireAdminUser } from "~/utils/session.server";
import { getDb } from "~/db/client";
import { writings } from "~/db/schema";
import { eq } from "drizzle-orm";

export async function loader({ request, params }: LoaderFunctionArgs) {
  await requireAdminUser(request);
  const db = getDb();
  const writing = await db.select().from(writings).where(eq(writings.id, Number(params.id))).limit(1);

  if (!writing[0]) {
    throw new Response("Not Found", { status: 404 });
  }

  return json({ writing: writing[0] });
}

export async function action({ request, params }: ActionFunctionArgs) {
  await requireAdminUser(request);
  const formData = await request.formData();
  const db = getDb();

  const data = {
    title: formData.get("title") as string,
    source: formData.get("source") as string,
    date: formData.get("date") as string,
    reference: formData.get("reference") as string,
    author: formData.get("author") as string,
    document: formData.get("document") as string,
    documentName: formData.get("documentName") as string,
    abstract: formData.get("abstract") as string,
  };

  await db.update(writings).set(data).where(eq(writings.id, Number(params.id)));

  return redirect("/admin/writings");
}

export default function EditWriting() {
  const { writing } = useLoaderData<typeof loader>();

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
            <h2 className="text-2xl font-bold text-gray-900">Edit Writing</h2>
            <Link
              to="/admin/writings"
              className="text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              Back to Writings
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
                defaultValue={writing.title}
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
                defaultValue={writing.author || ""}
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
                  defaultValue={writing.date || ""}
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
                  defaultValue={writing.source || ""}
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
                defaultValue={writing.reference || ""}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
              />
            </div>

            <div>
              <label htmlFor="document" className="block text-sm font-medium text-gray-700">
                Document Path
              </label>
              <input
                type="text"
                name="document"
                id="document"
                placeholder="/documents/filename.pdf"
                defaultValue={writing.document || ""}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
              />
            </div>

            <div>
              <label htmlFor="documentName" className="block text-sm font-medium text-gray-700">
                Document Name
              </label>
              <input
                type="text"
                name="documentName"
                id="documentName"
                defaultValue={writing.documentName || ""}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
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
                defaultValue={writing.abstract || ""}
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
