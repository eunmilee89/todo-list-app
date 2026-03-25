// components/TodoSkeleton/TodoSkeleton.tsx
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "./TodoSkeleton.module.css";

export default function TodoSkeleton() {
  return (
    <div className={styles.container}>
      <div className={styles.headers}>
        <div className={styles.datePart}>
          <Skeleton className={styles.today} />
          <Skeleton className={styles.date} />
        </div>

        <div className={styles.btns}>
          <Skeleton
            className={styles.modeBtn}
            containerClassName={styles.skeletonWrap}
          />
          <Skeleton
            className={styles.modeBtn}
            containerClassName={styles.skeletonWrap}
          />
        </div>
      </div>

      <div className={styles.controls}>
        <div className={styles.filters}>
          <Skeleton className={styles.filter} />
          <Skeleton className={styles.filter} />
          <Skeleton className={styles.filter} />
        </div>
        <div>
          <Skeleton className={styles.deleteText} />
        </div>
      </div>

      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className={styles.item}>
          <div className={styles.todo}>
            <Skeleton className={styles.checkbox} />
            <Skeleton width={120 + i * 20} className={styles.todoText} />
          </div>
        </div>
      ))}

      <Skeleton className={styles.addTodo} />
    </div>
  );
}
