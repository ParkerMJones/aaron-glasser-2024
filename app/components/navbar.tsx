import { Link, useLocation } from "@remix-run/react";
import clsx from "clsx";

const Navbar = () => {
  const { pathname } = useLocation();
  const leaves = pathname.split("/");
  const isAbout = pathname === "/";
  const isResearch = leaves.some((l) => l === "research");
  const isTeaching = leaves.some((l) => l === "teaching");
  const isMovies = leaves.some((l) => l === "movies");

  return (
    <div className="grid grid-cols-4 w-full justify-items-center items-end pt-12 border-b border-b-neutral-300">
      <Link
        to="/"
        className={clsx(
          "w-fit flex justify-center mb-3 pb-1 text-lg sm:text-2xl text-neutral-900 border-b hover:border-neutral-700",
          isAbout ? "border-neutral-700" : "border-transparent"
        )}
      >
        About
      </Link>
      <Link
        to="/research"
        className={clsx(
          "w-fit flex justify-center mb-3 pb-1 text-lg sm:text-2xl text-neutral-900 border-b hover:border-neutral-700",
          isResearch ? "border-neutral-700" : "border-transparent"
        )}
      >
        Research
      </Link>
      <Link
        to="/teaching"
        className={clsx(
          "w-fit flex justify-center mb-3 pb-1 text-lg sm:text-2xl text-neutral-900 border-b hover:border-neutral-700",
          isTeaching ? "border-neutral-700" : "border-transparent"
        )}
      >
        Teaching
      </Link>
      <Link
        to="/movies"
        className={clsx(
          "w-fit flex justify-center mb-3 pb-1 text-lg sm:text-2xl text-neutral-900 border-b hover:border-neutral-700",
          isMovies ? "border-neutral-700" : "border-transparent"
        )}
      >
        Movies
      </Link>
    </div>
  );
};

export default Navbar;
