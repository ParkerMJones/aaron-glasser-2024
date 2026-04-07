import { put } from "@vercel/blob";
import { json, type LoaderFunctionArgs, type ActionFunctionArgs } from "@remix-run/node";
import { unstable_createMemoryUploadHandler, unstable_parseMultipartFormData } from "@remix-run/node";
import { Form, Link, useLoaderData, useNavigation } from "@remix-run/react";
import { requireAdminUser } from "~/utils/session.server";
import { getDb } from "~/db/client";
import { siteContent } from "~/db/schema";
import { eq } from "drizzle-orm";
import { useEffect, useState, useRef } from "react";
import { invalidateCacheTags } from "~/lib/vercel-cache.server";

export async function loader({ request }: LoaderFunctionArgs) {
  await requireAdminUser(request);
  const db = getDb();
  const allContent = await db.select().from(siteContent).orderBy(siteContent.key);
  return json({ content: allContent });
}

export async function action({ request }: ActionFunctionArgs) {
  await requireAdminUser(request);
  const db = getDb();

  const contentType = request.headers.get("content-type") || "";

  if (contentType.includes("multipart/form-data")) {
    const uploadHandler = unstable_createMemoryUploadHandler({ maxPartSize: 20_000_000 });
    const formData = await unstable_parseMultipartFormData(request, uploadHandler);
    const file = formData.get("cv") as File | null;

    if (file && file.size > 0) {
      const blob = await put("cv.pdf", file, { access: "public", allowOverwrite: true });
      const existing = await db.select().from(siteContent).where(eq(siteContent.key, "cv_url")).limit(1);
      if (existing.length > 0) {
        await db.update(siteContent).set({ value: blob.url }).where(eq(siteContent.key, "cv_url"));
      } else {
        await db.insert(siteContent).values({ key: "cv_url", value: blob.url, label: "CV Document URL" });
      }
      await invalidateCacheTags("site_content");
    }
    return json({ success: true });
  }

  const formData = await request.formData();
  const intent = formData.get("intent");

  if (intent === "update") {
    const id = Number(formData.get("id"));
    const value = formData.get("value") as string;
    await db.update(siteContent).set({ value }).where(eq(siteContent.id, id));
    await invalidateCacheTags("site_content");
  }

  return json({ success: true });
}

function ContentForm({ item }: { item: typeof siteContent.$inferSelect }) {
  const navigation = useNavigation();
  const [showSuccess, setShowSuccess] = useState(false);
  const wasSubmittingRef = useRef(false);

  const isSubmitting = navigation.state === "submitting" && navigation.formData?.get("id") === String(item.id);

  useEffect(() => {
    if (isSubmitting) {
      wasSubmittingRef.current = true;
    }

    if (wasSubmittingRef.current && navigation.state === "idle") {
      wasSubmittingRef.current = false;
      setShowSuccess(true);
      const timer = setTimeout(() => {
        setShowSuccess(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isSubmitting, navigation.state]);

  const isDisabled = isSubmitting || showSuccess;

  return (
    <Form method="post" className="bg-white shadow sm:rounded-lg p-6">
      <input type="hidden" name="intent" value="update" />
      <input type="hidden" name="id" value={item.id} />

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            {item.label || item.key}
          </label>
          <p className="text-xs text-gray-500 mt-1">Key: {item.key}</p>
        </div>

        <div>
          {item.key === "bio_text" ? (
            <textarea
              name="value"
              defaultValue={item.value}
              rows={6}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
            />
          ) : (
            <input
              type="text"
              name="value"
              defaultValue={item.value}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
            />
          )}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isDisabled}
            className="inline-flex items-center justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
          >
            {showSuccess ? (
              <>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Saved!
              </>
            ) : (
              "Update"
            )}
          </button>
        </div>
      </div>
    </Form>
  );
}

function CvUploadForm({ currentUrl }: { currentUrl: string | null }) {
  const navigation = useNavigation();
  const [showSuccess, setShowSuccess] = useState(false);
  const wasSubmittingRef = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);

  const isSubmitting = navigation.state === "submitting";

  useEffect(() => {
    if (isSubmitting) {
      wasSubmittingRef.current = true;
    }
    if (wasSubmittingRef.current && navigation.state === "idle") {
      wasSubmittingRef.current = false;
      setShowSuccess(true);
      if (formRef.current) formRef.current.reset();
      const timer = setTimeout(() => setShowSuccess(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isSubmitting, navigation.state]);

  return (
    <Form method="post" encType="multipart/form-data" ref={formRef} className="bg-white shadow sm:rounded-lg p-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">CV / Curriculum Vitae</label>
          {currentUrl && (
            <p className="text-xs text-gray-500 mt-1">
              Current:{" "}
              <a href={currentUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                view PDF
              </a>
            </p>
          )}
        </div>
        <div>
          <input
            type="file"
            name="cv"
            accept=".pdf"
            className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting || showSuccess}
            className="inline-flex items-center justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
          >
            {showSuccess ? (
              <>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Uploaded!
              </>
            ) : isSubmitting ? "Uploading..." : "Upload CV"}
          </button>
        </div>
      </div>
    </Form>
  );
}

export default function AdminSiteContent() {
  const { content } = useLoaderData<typeof loader>();
  const cvEntry = content.find((c) => c.key === "cv_url");
  const otherContent = content.filter((c) => c.key !== "cv_url");

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
                  className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
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
                  className="border-blue-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
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

      <div className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Site Content</h2>

          <div className="space-y-6">
            {otherContent.map((item) => (
              <ContentForm key={item.id} item={item} />
            ))}
            <CvUploadForm currentUrl={cvEntry?.value ?? null} />
          </div>
        </div>
      </div>
    </div>
  );
}
