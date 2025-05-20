import { useEffect, useState, useCallback } from "react";
import type GlossaryItem from "../types/type";
import dummydata from "../data/dummydata";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../config/firebase";

const useGlossary = () => {
  const [glossary, setGlossary] = useState<GlossaryItem[]>(dummydata);
  const [loading, setLoading] = useState(false);
  const [isUsingDummy, setIsUsingDummy] = useState(true);
  const wordsRef = collection(db, "words");

  useEffect(() => {
    const fetchWords = async () => {
      try {
        const snapshot = await getDocs(wordsRef);
        if (!snapshot.empty) {
          const items = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as GlossaryItem[];

          if (items.length > 0) {
            setGlossary(items);
            setIsUsingDummy(false);
          }
        }
      } catch (err) {
        console.warn("Firestore error, keeping dummydata", err);
      } finally {
        setLoading(false);
      }
    };

    void fetchWords();
  }, []);

  const addWord = async (newWord: Omit<GlossaryItem, "id">) => {
    if (isUsingDummy) {
      const id = Date.now().toString();
      setGlossary((prev) => [...prev, { id, ...newWord }]);
    } else {
      const docRef = await addDoc(wordsRef, newWord);
      setGlossary((prev) => [...prev, { id: docRef.id, ...newWord }]);
    }
  };

  const deleteWord = useCallback(
    async (id: string) => {
      if (isUsingDummy) {
        setGlossary((prev) => prev.filter((word) => word.id !== id));
      } else {
        await deleteDoc(doc(db, "words", id));
        setGlossary((prev) => prev.filter((word) => word.id !== id));
      }
    },
    [isUsingDummy]
  );

  const updateWord = useCallback(
    async (updated: GlossaryItem) => {
      if (isUsingDummy) {
        setGlossary((prev) =>
          prev.map((word) => (word.id === updated.id ? updated : word))
        );
      } else {
        const wordRef = doc(db, "words", updated.id);
        await updateDoc(wordRef, {
          word: updated.word,
          meaning: updated.meaning,
        });
        setGlossary((prev) =>
          prev.map((word) => (word.id === updated.id ? updated : word))
        );
      }
    },
    [isUsingDummy]
  );

  return { glossary, loading, addWord, deleteWord, updateWord };
};

export default useGlossary;
