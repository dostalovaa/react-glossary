import { useState, memo } from "react";
import type GlossaryItem from "../../types/type";
import { RxCross2 } from "react-icons/rx";

type GlossaryItemProps = {
  word: GlossaryItem;
  deleteWord: (id: string) => void;
  updateWord: (update: GlossaryItem) => void;
};

const GlossaryWordItem = ({
  word,
  deleteWord,
  updateWord,
}: GlossaryItemProps) => {
  const [editMode, setEditMode] = useState(false);
  const [edited, setEdited] = useState({
    word: word.word,
    meaning: word.meaning,
  });

  const handleSave = () => {
    updateWord({ id: word.id, ...edited });
    setEditMode(false);
  };

  const handleCancel = () => {
    setEdited({ word: word.word, meaning: word.meaning });
    setEditMode(false);
  };

  return (
    <div
      className={`rounded-lg px-5 py-4 shadow flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5
        ${
          editMode ? "bg-gray-700/80 text-white" : "bg-white/80 text-gray-800"
        }`}
    >
      {editMode ? (
        <div className="flex flex-col gap-2 w-full">
          <div className="flex justify-end">
            <RxCross2
              onClick={handleCancel}
              size={20}
              className="cursor-pointer"
            />
          </div>

          <input
            type="text"
            value={edited.word}
            onChange={(e) => setEdited({ ...edited, word: e.target.value })}
            className="bg-white/90 text-black rounded px-2 py-1"
          />
          <textarea
            value={edited.meaning}
            onChange={(e) => setEdited({ ...edited, meaning: e.target.value })}
            className="bg-white/90 text-black rounded px-2 py-1 resize-none"
          />

          <div>
            <button
              onClick={handleSave}
              className="cursor-pointer rounded-md px-3 py-2 text-white hover:bg-green-400  bg-green-500 mr-3"
            >
              Save
            </button>
            <button
              onClick={() => deleteWord(word.id)}
              className="cursor-pointer rounded-md px-3 py-2 text-white hover:bg-red-400  bg-red-500"
            >
              Delete
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-start items-center gap-5 flex-wrap">
            <div className="text-gray-800 font-semibold">
              {word.word.toUpperCase()}
              <span className="font-normal text-gray-700">
                : {word.meaning}
              </span>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setEditMode(true)}
              className="bg-[#47A6FF] hover:bg-[#1F93FF] text-white px-5 py-1 rounded cursor-pointer dark:bg-blue-600 dark:hover:bg-blue-500 dark:text-white"
            >
              Edit
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default memo(GlossaryWordItem);
