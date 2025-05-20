import { useState } from "react";
import type GlossaryItem from "../../types/type";

type GlossaryFormProps = {
  addWord: (word: { word: string; meaning: string }) => void;
  glossary: GlossaryItem[];
};

type NewWordForm = {
  name: string;
  meaning: string;
};

const GlossaryForm = ({ addWord, glossary }: GlossaryFormProps) => {
  const [word, setWord] = useState<NewWordForm>({
    name: "",
    meaning: "",
  });
  const [showNoInput, setShowNoInput] = useState(false);
  const [showAdded, setShowAdded] = useState(false);

  const formHandle = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (word.name.trim() === "" || word.meaning.trim() === "") {
      setShowNoInput(!showNoInput);
      return;
    }

    const alreadyExists = glossary.some(
      (item) => item.word.toLowerCase() === word.name.toLowerCase()
    );

    if (alreadyExists) {
      setShowAdded(true);
    } else {
      addWord({
        word: word.name.trim(),
        meaning: word.meaning.trim(),
      });
      setShowAdded(false);
    }

    setWord({
      name: "",
      meaning: "",
    });
    setShowNoInput(false);
  };

  return (
    <section className="mb-5">
      {showNoInput && (
        <p className="font-bold text-2xl sm:text-5xl md:text-4xl lg:text-6xl text-center mb-2 text-blue-400 uppercase">
          Please fill in all fields
        </p>
      )}
      {showAdded && (
        <p className="font-bold text-2xl sm:text-5xl md:text-4xl lg:text-6xl text-center mb-2 text-blue-400 uppercase">
          The word has already been added
        </p>
      )}
      <form onSubmit={formHandle}>
        <div className="flex flex-col items-center gap-2 space-y-4">
          <input
            type="text"
            placeholder="Add new word"
            onChange={(e) => setWord({ ...word, name: e.target.value })}
            value={word.name}
            className="w-full rounded-md p-3 text-gray-700 bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
          />
          <textarea
            placeholder="Add meaning to word"
            onChange={(e) => setWord({ ...word, meaning: e.target.value })}
            value={word.meaning}
            className="w-full rounded-md p-3 text-gray-700 bg-white/80 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
          />

          <button
            type="submit"
            className="m-auto w-[70%] rounded-md p-3 text-white hover:bg-cyan-400  bg-cyan-500 cursor-pointer"
          >
            Add
          </button>
        </div>
      </form>
    </section>
  );
};

export default GlossaryForm;
