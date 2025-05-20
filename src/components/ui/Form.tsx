type FormProps = {
  formHandle: (e: React.FormEvent<HTMLFormElement>) => void;
  word: {
    name: string;
    meaning: string;
  };
  setWord: React.Dispatch<
    React.SetStateAction<{ name: string; meaning: string }>
  >;
};

const Form = ({ formHandle, word, setWord }: FormProps) => {
  return (
    <form onSubmit={formHandle}>
      <div className="flex flex-col items-center space-y-4">
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
          className="m-auto w-[70%] rounded-md p-3 text-white bg-[#47A6FF] hover:bg-[#1F93FF] dark:bg-blue-600 dark:hover:bg-blue-500 dark:text-white text-xl cursor-pointer"
        >
          Add
        </button>
      </div>
    </form>
  );
};

export default Form;
