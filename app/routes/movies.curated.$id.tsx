import { useParams } from "@remix-run/react";
import { imgArr } from "~/utils/image-array";
import { curatedPrograms } from "~/utils/programs";
import invariant from "tiny-invariant";

export default function SelectedProgram() {
  const param = useParams();
  invariant(typeof param.id === "string", "Expected a program id");
  const selectedProgram = Number(param.id);

  return (
    <div className="m-9 ml-3 sm:ml-14 max-w-[100ch]">
      <h2 className="pb-4 font-bold">
        {curatedPrograms[selectedProgram].title}
      </h2>
      <div className="my-3 mx-0">
        <img
          src={imgArr[selectedProgram]}
          alt={curatedPrograms[selectedProgram].title}
          style={{ width: 400, maxWidth: "100%" }}
        />
      </div>
      <p className="px-3 py-0 leading-6 max-w-[90ch]">
        {curatedPrograms[selectedProgram].description}
      </p>
      <h4>PROGRAM</h4>
      <li style={{ listStyle: "none", lineHeight: "1.4rem" }}>
        {curatedPrograms[selectedProgram].firstHalf.map((program) => (
          <div key={program}>{program}</div>
        ))}
      </li>
      <div style={{ padding: "12px 0" }}>-----------------------</div>
      <li style={{ listStyle: "none", lineHeight: "1.4rem" }}>
        {curatedPrograms[selectedProgram].secondHalf.map((program) => (
          <div key={program}>{program}</div>
        ))}
      </li>
      <div style={{ paddingTop: 12 }}>
        {curatedPrograms[selectedProgram].notes}
      </div>
      <div style={{ paddingTop: 16 }}>
        Screened at The Bridge Progressive Arts Initiative on{" "}
        {curatedPrograms[selectedProgram].date},{" "}
        {curatedPrograms[selectedProgram].year}
      </div>
    </div>
  );
}
