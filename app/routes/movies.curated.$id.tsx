import { Link, useParams } from "@remix-run/react";
import { imgArr } from "~/utils/image-array";
import { curatedPrograms } from "~/utils/programs";
import invariant from "tiny-invariant";
import { ArrowLeft } from "react-feather";

export default function SelectedProgram() {
  const param = useParams();
  invariant(typeof param.id === "string", "Expected a program id");
  const selectedProgram = Number(param.id);

  return (
    <div className="mt-12 pb-24 px-6 sm:ml-14 max-w-[100ch] text-soft-white flex flex-col gap-y-10">
      <Link
        to="/movies/curated"
        className="text-[#f0f0f0] hover:underline underline-offset-4 flex items-center gap-x-2"
      >
        <ArrowLeft size={24} />
        Back
      </Link>
      <h2 className="font-bold mt-4">
        {curatedPrograms[selectedProgram].title}
      </h2>
      <div>
        <img
          src={imgArr[selectedProgram]}
          alt={curatedPrograms[selectedProgram].title}
          style={{ width: 400, maxWidth: "100%" }}
        />
      </div>
      <p className="leading-6 max-w-[90ch]">
        {curatedPrograms[selectedProgram].description}
      </p>
      <h4>PROGRAM</h4>
      <li style={{ listStyle: "none", lineHeight: "1.4rem" }}>
        {curatedPrograms[selectedProgram].firstHalf.map((program) => (
          <div key={program}>{program}</div>
        ))}
      </li>
      <div>-----------------------</div>
      <li style={{ listStyle: "none", lineHeight: "1.4rem" }}>
        {curatedPrograms[selectedProgram].secondHalf.map((program) => (
          <div key={program}>{program}</div>
        ))}
      </li>
      <div>{curatedPrograms[selectedProgram].notes}</div>
      <div>
        Screened at The Bridge Progressive Arts Initiative on{" "}
        {curatedPrograms[selectedProgram].date},{" "}
        {curatedPrograms[selectedProgram].year}
      </div>
    </div>
  );
}
