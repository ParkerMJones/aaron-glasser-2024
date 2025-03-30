import { Link } from "@remix-run/react";
import clsx from "clsx";
import { Dropdown } from "~/components/dropdown";
import { writings } from "~/utils/writings";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

const sortedWritings = writings.sort((a, b) => {
  const dateA = a.date ? new Date(a.date).getTime() : -Infinity;
  const dateB = b.date ? new Date(b.date).getTime() : -Infinity;

  return dateB - dateA; // Sort in descending order (most recent dates first)
});

export default function Philosophy() {
  return (
    <div>
      <Tabs defaultValue="papers">
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="papers">Papers</TabsTrigger>
          <TabsTrigger value="teaching">Teaching</TabsTrigger>
        </TabsList>
        <TabsContent value="papers" className="py-12">
          <div>
            <div className="px-8 text-neutral-900 leading-6">
              <ul className="list-none space-y-6">
                {sortedWritings.map((writing) => {
                  const authorsSplit = writing.author.split(",");
                  return (
                    <li key={writing.id}>
                      <Link
                        className="flex text-lg mr-12 text-neutral-800 hover:underline decoration-neutral-600"
                        to={`/philosophy/${writing.id}`}
                        key={writing.id}
                      >
                        <div>
                          {authorsSplit.map((author, index) => {
                            return (
                              <>
                                <span
                                  key={index}
                                  className={clsx(
                                    author === "Glasser"
                                      ? "font-extrabold"
                                      : "font-normal"
                                  )}
                                >
                                  {author}
                                </span>
                                <span>
                                  {index === authorsSplit.length - 2
                                    ? " & "
                                    : " "}
                                </span>
                              </>
                            );
                          })}
                          <span>
                            {writing.date ? `(${writing.date}).` : ""}
                          </span>{" "}
                          <span>{writing.title}.</span>{" "}
                          <span className="italic text-sm text-zinc-400">
                            {writing.source}
                          </span>{" "}
                          <span>{writing.reference}</span>
                        </div>
                      </Link>
                      <div className="sm:ml-6 sm:pr-6 text-left overflow-auto no-scrollbar">
                        <Dropdown content={writing.abstract}></Dropdown>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="teaching" className="py-12">
          <div className="px-8 text-neutral-900 leading-6">
            <ul className="list-none space-y-6">
              <li className="text-neutral-900">
                Seeing Through Traditions (Syllabus)
              </li>
              <li className="text-neutral-900">
                Psychiatric Ethics (Summer, 2025)
              </li>
              <li className="text-neutral-900">
                Introduction to Cognitive Science (Winter, 2024)
              </li>
              <li className="text-neutral-900">Bioethics (Fall, 2023)</li>
              <li className="text-neutral-900">
                Critical Reasoning (Fall 2022; Winter, 2023)
              </li>
            </ul>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
