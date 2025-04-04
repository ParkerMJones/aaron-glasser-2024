import { Link } from "react-router-dom";
import { curatedPrograms } from "~/utils/programs";

export default function CuratedList() {
  return (
    <div className="flex flex-col items-start px-4 sm:px-8 mt-6 sm:mt-12 pb-24 text-neutral-900 gap-y-6">
      <p className="flex flex-wrap justify-start">
        I am currently serving on the board of
        <a
          href="https://mediacityfilmfestival.com/"
          target="_blank"
          rel="noreferrer"
          className="underline pl-1"
        >
          Media City Film Festival
        </a>
        .
      </p>
      <p>
        The below programs were screened at The Bridge Progressive Arts
        Initiative in central Virginia.
      </p>
      <div className="grid grid-cols-2 gap-x-4 gap-y-6 items-center  sm:gap-y-8 mt-4 sm:mt-10">
        {curatedPrograms.map((program) => (
          <li className="mb-2 list-none" key={program.id}>
            <Link
              className="hover:underline decoration-neutral-700"
              to={`/movies/curated/${program.id}`}
              key={program.id}
            >
              <span className="font-medium text-lg italic">
                {program.title}
              </span>
            </Link>
          </li>
        ))}
      </div>
    </div>
  );
}
