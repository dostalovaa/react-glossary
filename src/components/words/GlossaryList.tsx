import { useMemo, useState } from "react";
import GlossaryWordItem from "./GlossaryWordItem";
import type GlossaryItem from "../../types/type";
import Loading from "../ui/Loading";
import { LuSearch } from "react-icons/lu";
import { RxCross2 } from "react-icons/rx";

type GlossaryItemProps = {
  glossary: GlossaryItem[];
  loading: boolean;
  deleteWord: (id: string) => void;
  updateWord: (update: GlossaryItem) => void;
};

const GlossaryList = ({
  glossary,
  loading,
  deleteWord,
  updateWord,
}: GlossaryItemProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [show, setShow] = useState(false);

  const [sortAlphabetically, setSortAlphabetically] = useState(true);

  const visibleGlossary = useMemo<GlossaryItem[]>(() => {
    return [...glossary]
      .filter((word) =>
        word.word.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) =>
        sortAlphabetically
          ? a.word.localeCompare(b.word)
          : b.word.localeCompare(a.word)
      );
  }, [glossary, searchTerm, sortAlphabetically]);

  return (
    <section>
      <div className="flex justify-between items-center mb-3 flex-wrap gap-2">
        <button
          onClick={() => setSortAlphabetically((prev) => !prev)}
          className="text-white px-3 py-1 bg-[#47A6FF] hover:bg-[#1F93FF] transition rounded cursor-pointer dark:bg-blue-600 dark:hover:bg-blue-500 dark:text-white"
        >
          Sort: {sortAlphabetically ? "A-Z" : "Z-A"}
        </button>

        <div className="flex items-center justify-between gap-1">
          {show ? (
            <div className="relative w-full max-w-xs">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-md pr-10 pl-3 py-2 text-gray-700 bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Search word"
              />
              <RxCross2
                onClick={() => {
                  setShow(false);
                  setSearchTerm("");
                }}
                size={20}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 cursor-pointer "
              />
            </div>
          ) : (
            <LuSearch
              onClick={() => setShow(!show)}
              size={25}
              color="white"
              className="cursor-pointer"
            />
          )}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {!loading ? (
          visibleGlossary.map((word: GlossaryItem) => (
            <GlossaryWordItem
              key={word.id}
              word={word}
              deleteWord={deleteWord}
              updateWord={updateWord}
            />
          ))
        ) : (
          <Loading />
        )}
      </div>

      {!loading
        ? visibleGlossary.length === 0 && (
            <p className="text-center text-gray-500 text-2xl mt-5">
              No words found. Please add a word.
            </p>
          )
        : ""}
    </section>
  );
};

export default GlossaryList;
