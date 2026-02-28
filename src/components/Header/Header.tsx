import { useDarkMode } from "../context/DarkModeContext";
import styles from "./Header.module.css";
import { FiMoon } from "react-icons/fi";
import { FiSun } from "react-icons/fi";

export default function Header() {
  const { darkMode, toggleDarkMode } = useDarkMode();
  return (
    <div className={styles.headers}>
      <h2>
        Today <span className={styles.date}>{getTodayDate()}</span>
      </h2>

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
