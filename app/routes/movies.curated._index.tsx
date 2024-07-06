import { Link } from "react-router-dom";
import { curatedPrograms } from "~/utils/programs";

export default function CuratedList() {
  return (
    <div className="flex flex-col items-start px-8 py-20 sm:px-20 text-soft-white gap-y-6">
      <p className="flex flex-wrap justify-start">
        I am currently serving on the board of{" "}
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
      <div className="flex flex-wrap justify-around gap-y-8 mt-10">
        {curatedPrograms.map((program) => (
          <li className="mb-2 list-none w-[45%]" key={program.id}>
            <Link
              className="hover:underline"
              to={`/movies/curated/${program.id}`}
              key={program.id}
            >
              <span className="font-semibold text-lg italic">
                {program.title}
              </span>
            </Link>
          </li>
        ))}
      </div>
    </div>
  );
}
