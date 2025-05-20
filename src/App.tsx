import CustomizedSwitches from "./components/ui/ButtonTheme";
import GlossaryForm from "./components/words/GlossaryForm";
import GlossaryList from "./components/words/GlossaryList";
import useGlossary from "./hooks/useGlossary";

const App = () => {
  const { glossary, loading, addWord, deleteWord, updateWord } = useGlossary();

  return (
    <main
      className="bg-gradient-to-tl 
  from-black/85 
  via-pink-800 
  to-black/30 
 dark:bg-gradient-to-r dark:from-gray-900 dark:via-gray-800 dark:to-black
  min-h-screen py-10"
    >
      <div className="flex justify-end">
        <CustomizedSwitches />
      </div>

      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl 2xl:text-8xl font-semibold mb-4 text-center text-white/80 drop-shadow-lg uppercase dark:text-gray-100">
          Glossary
        </h1>
        <div className="bg-white/30 backdrop-blur-2xl border border-white/30 rounded-xl shadow-lg md:p-10 p-8 dark:bg-gray-600/40 dark:border-gray-700 dark:backdrop-blur-2xl">
          <div className="w-[85%] m-auto space-8">
            <GlossaryForm addWord={addWord} glossary={glossary} />
            <GlossaryList
              glossary={glossary}
              loading={loading}
              deleteWord={deleteWord}
              updateWord={updateWord}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default App;
