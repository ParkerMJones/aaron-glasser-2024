import { Dropdown } from "~/components/dropdown";

const COURSES = [
  {
    name: "Psychiatric Ethics",
    semesters: "Summer, 2025",
    description: "",
  },
  {
    name: "Introduction to Cognitive Science",
    semesters: "Winter, 2024",
    description: "",
  },
  {
    name: "Bioethics",
    semesters: "Fall, 2023",
    description: "",
  },
  {
    name: "Critical Reasoning",
    semesters: "Fall 2022; Winter, 2023",
    description: "",
  },
  {
    name: "Ways of Seeing",
    semesters: "",
    description: "",
  },
];

const SYLLABI: { name: string; file: string }[] = [
  // { name: "Bioethics Syllabus (Fall 2023)", file: "/documents/syllabus-bioethics-2023.pdf" },
];

export default function Teaching() {
  return (
    <div className="py-6 sm:py-12 px-4 sm:px-8 text-neutral-900 leading-6">
      <ul className="list-none space-y-6 sm:space-y-8">
        {COURSES.map((course) => (
          <li key={course.name}>
            <p className="text-lg text-neutral-800">
              {course.name}
              {course.semesters ? (
                <span className="text-sm text-zinc-400 ml-2">
                  ({course.semesters})
                </span>
              ) : null}
            </p>
            {course.description ? (
              <div className="sm:ml-6 sm:pr-6 text-left overflow-auto no-scrollbar">
                <Dropdown content={course.description} />
              </div>
            ) : null}
          </li>
        ))}
      </ul>

      {SYLLABI.length > 0 && (
        <div className="mt-12 sm:mt-16">
          <ul className="list-none space-y-4">
            {SYLLABI.map((syllabus) => (
              <li key={syllabus.name}>
                <a
                  href={syllabus.file}
                  download
                  className="text-neutral-800 hover:underline decoration-neutral-600"
                >
                  {syllabus.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <p className="mt-12 text-sm">
        Please{" "}
        <span className="font-bold underline">
          <a href="mailto:agmail@umich.edu">email me</a>
        </span>{" "}
        for a copy of any syllabus.
      </p>
    </div>
  );
}
