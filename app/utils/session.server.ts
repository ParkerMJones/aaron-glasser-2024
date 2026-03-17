import { createCookieSessionStorage, redirect } from "@remix-run/node";

const SESSION_SECRET = process.env.SESSION_SECRET || "default-secret-change-in-production";

const { getSession, commitSession, destroySession } = createCookieSessionStorage({
  cookie: {
    name: "__session",
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
    sameSite: "lax",
    secrets: [SESSION_SECRET],
    secure: process.env.NODE_ENV === "production",
  },
});

export { getSession, commitSession, destroySession };

export async function requireAdminUser(request: Request) {
  const session = await getSession(request.headers.get("Cookie"));
  const isAdmin = session.get("isAdmin");

  if (!isAdmin) {
    throw redirect("/admin/login");
  }

  return true;
}

export async function getAdminUser(request: Request) {
  const session = await getSession(request.headers.get("Cookie"));
  return session.get("isAdmin") || false;
}

export async function createAdminSession(redirectTo: string = "/admin") {
  const session = await getSession();
  session.set("isAdmin", true);

  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

export async function logout(request: Request) {
  const session = await getSession(request.headers.get("Cookie"));
  return redirect("/admin/login", {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
}
