import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type DarkModeContextType = {
  darkMode: boolean;
  toggleDarkMode: () => void;
};

type DarkModeProviderProps = {
  children: ReactNode;
};

const DarkModeContext = createContext<DarkModeContextType | undefined>(
  undefined,
);

export function DarkModeProvider({ children }: DarkModeProviderProps) {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem("darkMode");
    if (saved !== null) {
      return JSON.parse(saved);
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });
  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  useEffect(() => {
    updateDarkMode(darkMode);
  }, [darkMode]);

  return (
    <DarkModeContext value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext>
  );
}

function updateDarkMode(darkMode: boolean) {
  if (darkMode) {
    document.documentElement.classList.add("dark");
    localStorage.setItem("darkMode", JSON.stringify(true));
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("darkMode", JSON.stringify(false));
  }
}

export const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (!context) throw new Error("다크모드 프로바이더 오류");
  return context;
};
