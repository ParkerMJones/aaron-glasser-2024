import { Link } from "@remix-run/react";

export default function Movies() {
  return (
    <div className="text-neutral-100 flex flex-col justify-around m-6 h-[calc(100vh-150px)]">
      <div className="flex items-center justify-around gap-3">
        <Link
          className="text-center w-full text-4xl hover:underline"
          to="/movies/library"
        >
          My Movies
        </Link>
        <Link
          className="text-center w-full text-4xl hover:underline"
          to="/movies/curated"
        >
          Curated Programs
        </Link>
      </div>
      <Link
        className="text-center text-4xl hover:underline"
        to="/movies/instrument"
      >
        Image Instrument <br />
        Demo
      </Link>
    </div>
  );
}
