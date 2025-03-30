import { Link, useLocation } from "@remix-run/react";
import clsx from "clsx";

const Navbar = () => {
  const { pathname } = useLocation();
  const leaves = pathname.split("/");
  const isPhilisophy = leaves.some((l) => l === "philosophy");
  const isMovies = leaves.some((l) => l === "movies");
  const isHome = leaves.every((l) => !l.length);

  return (
    <div className="grid grid-cols-3 w-full justify-items-center items-end pt-12 border-b border-b-neutral-300">
      <Link
        to="/philosophy"
        className={clsx(
          "w-fit flex justify-center mb-3 pb-1 text-lg sm:text-2xl text-neutral-900 border-b hover:border-neutral-700",
          isPhilisophy ? "border-neutral-700" : "border-transparent"
        )}
      >
        Philosophy
      </Link>
      <Link
        to="/"
        className={clsx(
          "w-fit flex justify-center mb-3 pb-1 text-lg sm:text-2xl text-neutral-900 border-b hover:border-neutral-700",
          isHome ? "border-neutral-700" : "border-transparent"
        )}
      >
        Home
        {/* <img
          className="w-16 h-16 sm:h-[100px] sm:w-[100px] rounded-[50%] flex hover:-mb-8"
          src="/7306.jpeg"
          alt="logo"
        /> */}
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
