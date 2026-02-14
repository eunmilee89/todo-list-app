import styles from "./TodoControls.module.css";
type TodoControlsProps = {
  isAllCompleted: boolean;
  onToggleAll: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDeleteSelected: () => void;
};

export default function TodoControls({
  isAllCompleted,
  onToggleAll,
  onDeleteSelected,
}: TodoControlsProps) {
  return (
    <div className={styles.controls}>
      <label htmlFor="all" className={styles.allBtn}>
        <input
          type="checkbox"
          name="all"
          id="all"
          checked={isAllCompleted}
          onChange={onToggleAll}
        />
        전체 선택
      </label>
      <button className={styles.deleteBtn} onClick={onDeleteSelected}>
        삭제
      </button>
    </div>
  );
}
