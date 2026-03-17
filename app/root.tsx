import {
  Links,
  Meta,
  MetaFunction,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
  useRouteError,
  isRouteErrorResponse,
  useNavigation,
} from "@remix-run/react";
import "./tailwind.css";
import Navbar from "./components/navbar";
import { useEffect, useState } from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "Aaron Glasser" },
    { name: "Hello, I'm Aaron", content: "Hello, I'm Aaron" },
  ];
};

export function links() {
  return [
    {
      rel: "icon",
      type: "image/png",
      href: "/7306.jpeg",
    },
  ];
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="no-scrollbar">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-neutral-50 font-serif">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <html lang="en" className="no-scrollbar">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-neutral-50 font-serif">
        {!isAdminRoute && <Navbar />}
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              {isRouteErrorResponse(error)
                ? `${error.status} ${error.statusText}`
                : "Oops! Something went wrong"}
            </h1>
            <p className="text-gray-600">
              {isRouteErrorResponse(error)
                ? error.data
                : "We're working on fixing this."}
            </p>
          </div>
        </div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const location = useLocation();
  const navigation = useNavigation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Delay rendering content during navigation to prevent flash
  const showContent = isHydrated && navigation.state === "idle";

  return (
    <>
      {!isAdminRoute && <Navbar />}
      <div style={{ opacity: showContent ? 1 : 0, transition: "opacity 50ms" }}>
        <Outlet />
      </div>
    </>
  );
}
