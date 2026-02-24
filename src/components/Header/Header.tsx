import type { FilterValue } from "../../App";
import { useDarkMode } from "../context/DarkModeContext";
import styles from "./Header.module.css";
import { FiMoon } from "react-icons/fi";
import { FiSun } from "react-icons/fi";

type HeaderProps = {
  filters: FilterValue[];
  filter: FilterValue;
  onFilterChange: (filter: FilterValue) => void;
};

export default function Header({
  filters,
  filter,
  onFilterChange,
}: HeaderProps) {
  const { darkMode, toggleDarkMode } = useDarkMode();
  return (
    <div className={styles.headers}>
      <h2>
        Today <span className={styles.date}>{getTodayDate()}</span>
      </h2>
      <ul className={styles.filters}>
        {filters.map((value, index) => (
          <li key={index}>
            <button
              className={`${styles.filter} ${filter === value && styles.selected}`}
              onClick={() => onFilterChange(value)}
            >
              {value}
            </button>
            {index < filters.length - 1 && (
              <span className={styles.separator}>|</span>
            )}
          </li>
        ))}
      </ul>
      <button onClick={toggleDarkMode} className={styles.modeBtn}>
        {darkMode && <FiSun />}
        {!darkMode && <FiMoon />}
      </button>
    </div>
  );
}

function getTodayDate(): string {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");

  return day;
}
