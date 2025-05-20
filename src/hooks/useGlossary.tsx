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
  const [glossary, setGlossary] = useState<GlossaryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const wordsRef = collection(db, "words");

  useEffect(() => {
    const fetchWords = async () => {
      try {
        setLoading(true);
        const snapshot = await getDocs(wordsRef);
        const items = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as GlossaryItem[];
        setGlossary(items);
      } catch (error) {
        console.warn("Firebase not connected - using fallback data.", error);

        setGlossary(dummydata);
      } finally {
        setLoading(false);
      }
    };

    fetchWords();
  }, []);

  const addWord = async (newWord: Omit<GlossaryItem, "id">) => {
    const docRef = await addDoc(wordsRef, newWord);
    setGlossary((prev) => [...prev, { id: docRef.id, ...newWord }]);
  };

  const deleteWord = useCallback(async (id: string) => {
    await deleteDoc(doc(db, "words", id));
    setGlossary((prev: GlossaryItem[]) =>
      prev.filter((word) => word.id !== id)
    );
  }, []);

  const updateWord = useCallback(async (updated: GlossaryItem) => {
    const wordRef = doc(db, "words", updated.id);
    await updateDoc(wordRef, {
      word: updated.word,
      meaning: updated.meaning,
    });
    setGlossary((prev) =>
      prev.map((word) => (word.id === updated.id ? updated : word))
    );
  }, []);

  return { glossary, loading, addWord, deleteWord, updateWord };
};

export default useGlossary;
