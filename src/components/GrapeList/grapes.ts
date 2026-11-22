import { useEffect, useState } from "react";

export type Grape = {
  id: string;
  title: string;
  color: string;
  filled: boolean[];
  createdAt: number;
};

// 실제 포도 품종 색상
export const GRAPE_VARIETIES = [
  { name: "캠벨", color: "#5b3a73" },
  { name: "거봉", color: "#3e2a4f" },
  { name: "샤인머스캣", color: "#a6c36a" },
  { name: "골든머스캣", color: "#d2c46b" },
  { name: "레드글로브", color: "#9e2f45" },
  { name: "크림슨", color: "#c25a6e" },
];

export const GRAPE_COLORS = GRAPE_VARIETIES.map((v) => v.color);

export const BERRY_PRESETS = [10, 15, 21, 30];
export const MIN_BERRIES = 3;
export const MAX_BERRIES = 50;

const STORAGE_KEY = "grapes";

export function useGrapes() {
  const [grapes, setGrapes] = useState<Grape[]>(readGrapesFromLocalStorage);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(grapes));
  }, [grapes]);

  const addGrape = (grape: Grape) => {
    setGrapes((prev) => [...prev, grape]);
  };

  const updateGrape = (id: string, update: (grape: Grape) => Grape) => {
    setGrapes((prev) =>
      prev.map((grape) => (grape.id === id ? update(grape) : grape)),
    );
  };

  const deleteGrape = (id: string) => {
    setGrapes((prev) => prev.filter((grape) => grape.id !== id));
  };

  return { grapes, addGrape, updateGrape, deleteGrape };
}

export function countFilled(grape: Grape) {
  return grape.filled.filter(Boolean).length;
}

function readGrapesFromLocalStorage(): Grape[] {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : [];
}
