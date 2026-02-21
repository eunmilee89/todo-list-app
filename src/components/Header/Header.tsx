import type { FilterValue } from "../../App";
import styles from "./Header.module.css";

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
    </div>
  );
}

function getTodayDate(): string {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");

  return day;
}
