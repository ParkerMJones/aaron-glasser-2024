import { json, type LoaderFunctionArgs, type ActionFunctionArgs } from "@remix-run/node";
import { Form, Link, useFetcher, useLoaderData } from "@remix-run/react";
import { Reorder } from "framer-motion";
import { useState } from "react";
import { requireAdminUser } from "~/utils/session.server";
import { getDb } from "~/db/client";
import { writings, worksInProgress } from "~/db/schema";
import { eq } from "drizzle-orm";
import { invalidateCacheTags } from "~/lib/vercel-cache.server";


export async function loader({ request }: LoaderFunctionArgs) {
  await requireAdminUser(request);
  const db = getDb();
  const [allWritings, allWip] = await Promise.all([
    db.select().from(writings).orderBy(writings.sortOrder),
    db.select().from(worksInProgress).orderBy(worksInProgress.sortOrder),
  ]);
  return json({ writings: allWritings, worksInProgress: allWip });
}

export async function action({ request }: ActionFunctionArgs) {
  await requireAdminUser(request);
  const formData = await request.formData();
  const intent = formData.get("intent");
  const db = getDb();

  if (intent === "delete") {
    const id = Number(formData.get("id"));
    await db.delete(writings).where(eq(writings.id, id));
    await invalidateCacheTags("writings");
  }

  if (intent === "reorder-all") {
    const ids = String(formData.get("ids")).split(",").map(Number);
    await Promise.all(
      ids.map((id, index) =>
        db.update(writings).set({ sortOrder: index + 1 }).where(eq(writings.id, id))
      )
    );
    await invalidateCacheTags("writings");
  }

  if (intent === "delete-wip") {
    const id = Number(formData.get("id"));
    await db.delete(worksInProgress).where(eq(worksInProgress.id, id));
    await invalidateCacheTags("works-in-progress");
  }

  if (intent === "reorder-wip") {
    const ids = String(formData.get("ids")).split(",").map(Number);
    await Promise.all(
      ids.map((id, index) =>
        db.update(worksInProgress).set({ sortOrder: index + 1 }).where(eq(worksInProgress.id, id))
      )
    );
    await invalidateCacheTags("works-in-progress");
  }

  return json({ success: true });
}

export default function AdminWritings() {
  const { writings: allWritings, worksInProgress: allWip } = useLoaderData<typeof loader>();

  const [items, setItems] = useState(allWritings);
  const [isDirty, setIsDirty] = useState(false);
  const fetcher = useFetcher<typeof action>();
  const isSaving = fetcher.state !== "idle";

  const [wipItems, setWipItems] = useState(allWip);
  const [isWipDirty, setIsWipDirty] = useState(false);
  const wipFetcher = useFetcher<typeof action>();
  const isWipSaving = wipFetcher.state !== "idle";

  const handleReorder = (newOrder: typeof items) => {
    setItems(newOrder);
    setIsDirty(true);
  };

  const handleSaveOrder = () => {
    fetcher.submit(
      { intent: "reorder-all", ids: items.map((w) => w.id).join(",") },
      { method: "post" }
    );
    setIsDirty(false);
  };

  const handleWipReorder = (newOrder: typeof wipItems) => {
    setWipItems(newOrder);
    setIsWipDirty(true);
  };

  const handleSaveWipOrder = () => {
    wipFetcher.submit(
      { intent: "reorder-wip", ids: wipItems.map((w) => w.id).join(",") },
      { method: "post" }
    );
    setIsWipDirty(false);
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
                <button
                  type="submit"
                  className="text-gray-500 hover:text-gray-700 text-sm font-medium"
                >
                  Logout
                </button>
              </Form>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0 space-y-10">

          {/* Papers section */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Papers</h2>
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
                  to="/admin/writings/new"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  Add New Writing
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
                {items.map((writing) => (
                  <Reorder.Item
                    key={writing.id}
                    value={writing}
                    className="bg-white"
                  >
                    <div className="px-4 py-4 flex items-center sm:px-6">
                      <div
                        className="mr-3 text-gray-300 cursor-grab active:cursor-grabbing select-none"
                        title="Drag to reorder"
                      >
                        ⠿
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-blue-600 truncate">
                            {writing.title}
                          </p>
                        </div>
                        <div className="mt-2 flex">
                          <div className="flex items-center text-sm text-gray-500">
                            <p>
                              {writing.author} {writing.date && `• ${writing.date}`}
                              {writing.source && ` • ${writing.source}`}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="ml-5 flex-shrink-0 flex space-x-2">
                        <Link
                          to={`/admin/writings/${writing.id}/edit`}
                          className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50"
                        >
                          Edit
                        </Link>
                        <Form method="post" className="inline">
                          <input type="hidden" name="intent" value="delete" />
                          <input type="hidden" name="id" value={writing.id} />
                          <button
                            type="submit"
                            onClick={(e) => {
                              if (!confirm("Are you sure you want to delete this writing?")) {
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

          {/* Works-in-Progress section */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Works-in-Progress</h2>
              <div className="flex items-center gap-3">
                {isWipDirty && (
                  <button
                    onClick={handleSaveWipOrder}
                    disabled={isWipSaving}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isWipSaving ? "Saving..." : "Save Order"}
                  </button>
                )}
                <Link
                  to="/admin/writings/wip/new"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  Add New
                </Link>
              </div>
            </div>

            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <Reorder.Group
                axis="y"
                values={wipItems}
                onReorder={handleWipReorder}
                className="divide-y divide-gray-200 list-none"
              >
                {wipItems.map((item) => (
                  <Reorder.Item
                    key={item.id}
                    value={item}
                    className="bg-white"
                  >
                    <div className="px-4 py-4 flex items-center sm:px-6">
                      <div
                        className="mr-3 text-gray-300 cursor-grab active:cursor-grabbing select-none"
                        title="Drag to reorder"
                      >
                        ⠿
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-gray-900">{item.title}</p>
                      </div>
                      <div className="ml-5 flex-shrink-0 flex space-x-2">
                        <Link
                          to={`/admin/writings/wip/${item.id}/edit`}
                          className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50"
                        >
                          Edit
                        </Link>
                        <Form method="post" className="inline">
                          <input type="hidden" name="intent" value="delete-wip" />
                          <input type="hidden" name="id" value={item.id} />
                          <button
                            type="submit"
                            onClick={(e) => {
                              if (!confirm("Are you sure you want to delete this entry?")) {
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
    </div>
  );
}
