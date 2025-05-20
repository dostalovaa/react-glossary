import { useState } from "react";
import type GlossaryItem from "../../types/type";
import Form from "../ui/Form";

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
        <p className="text-4xl tracking-tighter text-balance text-center mb-2 text-white uppercase text-shadow-gray-10">
          Please fill in all fields
        </p>
      )}
      {showAdded && (
        <p className="text-4xl tracking-tighter text-balance text-center mb-2 text-white uppercase text-shadow-gray-10">
          The word has already been added
        </p>
      )}
      <Form formHandle={formHandle} word={word} setWord={setWord} />
    </section>
  );
};

export default GlossaryForm;
