import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import TodoForm from "../TodoForm/TodoForm";
import type { Todo } from "../TodoList/TodoList";
import styles from "./AddTodo.module.css";

interface AddTodoProps {
  onAdd: (todo: Todo) => void;
}

export default function AddTodo({ onAdd }: AddTodoProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const handleSubmit = (todo: Todo) => {
    onAdd(todo);
  };
  return (
    <>
      {isFormOpen ? (
        <TodoForm
          onSubmit={handleSubmit}
          onCancel={() => setIsFormOpen(false)}
          mode="add"
        />
      ) : (
        <button onClick={() => setIsFormOpen(true)} className={styles.button}>
          <FaPlus />
          <span>작업 추가</span>
        </button>
      )}
    </>
  );
}
