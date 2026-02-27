import type { FilterValue } from "../TodoList/TodoList";
import styles from "./TodoControls.module.css";
type TodoControlsProps = {
  onDeleteSelected: () => void;
  filters: FilterValue[];
  filter: FilterValue;
  onFilterChange: (filter: FilterValue) => void;
};

export default function TodoControls({
  onDeleteSelected,
  filters,
  filter,
  onFilterChange,
}: TodoControlsProps) {
  return (
    <div className={styles.controls}>
      <ul className={styles.filters}>
        {filters.map((value, index) => (
          <li key={index}>
            <button
              className={`${styles.filter} ${filter === value && styles.selected}`}
              onClick={() => onFilterChange(value)}
            >
              {value}
            </button>
          </li>
        ))}
      </ul>
      <button className={styles.deleteBtn} onClick={onDeleteSelected}>
        완료 삭제
      </button>
    </div>
  );
}
