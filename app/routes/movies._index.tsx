import { Link } from "@remix-run/react";

export default function Movies() {
  return (
    <div className="text-neutral-900 flex flex-col justify-around px-4 pt-6 sm:px-8 sm:pt-12 space-y-6 sm:space-y-8">
      <Link
        className="text-left w-fit text-xl hover:underline decoration-neutral-700"
        to="/movies/library"
      >
        My Movies
      </Link>
      <Link
        className="text-left w-fit text-xl hover:underline decoration-neutral-700"
        to="/movies/curated"
      >
        Curated Programs
      </Link>
      <Link
        className="text-left w-fit text-xl hover:underline decoration-neutral-700"
        to="/movies/instrument"
      >
        Image Instrument <br />
        Demo
      </Link>
    </div>
  );
}
