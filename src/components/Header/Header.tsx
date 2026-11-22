import { Link, useLocation } from "react-router";
import { useDarkMode } from "../context/DarkModeContext";
import styles from "./Header.module.css";
import { FiMoon } from "react-icons/fi";
import { FiSun } from "react-icons/fi";
import { LuGrape } from "react-icons/lu";
import { FaListUl } from "react-icons/fa";

export default function Header() {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const { pathname } = useLocation();

  return (
    <div className={styles.headers}>
      <h2>
        Today <span className={styles.date}>{getTodayDate()}</span>
      </h2>

      <div className={styles.btns}>
        <div>
          <Link
            to={`${pathname === "/" ? "/grape-list" : "/"}`}
            className={`${styles.modeBtn} ${styles.switchListModeBtn}`}
            aria-label="Switch List Mode"
          >
            {pathname === "/" ? <LuGrape /> : <FaListUl />}
          </Link>
        </div>

        <button onClick={toggleDarkMode} className={styles.modeBtn}>
          {darkMode && <FiSun />}
          {!darkMode && <FiMoon />}
        </button>
      </div>
    </div>
  );
}

function getTodayDate(): string {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");

  return day;
}
