import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import type { Todo } from "../TodoList/TodoList";
import { v4 as uuidv4 } from "uuid";
import styles from "./TodoForm.module.css";

type TodoFormProps = {
  initialTodo?: Todo;
  onSubmit: (todo: Todo) => void;
  onCancel: () => void;
  mode: "add" | "edit";
};

export default function TodoForm({
  initialTodo,
  onSubmit,
  onCancel,
  mode = "add",
}: TodoFormProps) {
  const [text, setText] = useState(initialTodo?.text || "");
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const isEdit = mode === "edit";

  useEffect(() => {
    const input = inputRef.current;
    input?.focus();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setText(value);

    if (value.length > 50) {
      setError("할 일은 50자 이내로 입력해주세요.");
    } else {
      setError("");
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!text.trim() || text.length > 50) return;
    if (isEdit && initialTodo) {
      onSubmit({
        ...initialTodo,
        text: text.trim(),
      });
    }

    onSubmit({
      id: uuidv4(),
      text: text.trim(),
      status: "active",
    });
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        className={styles.textInput}
        placeholder={isEdit ? "" : "새로운 할 일 입력"}
        value={text}
        ref={inputRef}
        onChange={handleChange}
      />
      <div className={styles.error}>{error}</div>
      <div className={styles.buttons}>
        <button
          type="button"
          onClick={onCancel}
          className={`${styles.button} ${styles.cancelBtn}`}
        >
          취소
        </button>
        <button
          type="submit"
          disabled={!!error || !text.trim()}
          className={`${styles.button} ${styles.submitBtn}`}
        >
          {isEdit ? "수정 완료" : "작업 추가"}
        </button>
      </div>
    </form>
  );
}
