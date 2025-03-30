import {
  Links,
  Meta,
  MetaFunction,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import "./tailwind.css";
import Navbar from "./components/navbar";

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
      <body className="bg-neutral-50">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
