import { useState } from "react";
import type { Todo } from "../TodoList/TodoList";

interface AddTodoProps {
  onAdd: (todo: Todo) => void;
}

export default function AddTodo({ onAdd }: AddTodoProps) {
  const [text, setText] = useState<string>("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({ id: "12", text, status: "active" });
    setText("");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="todo-input"
          onChange={handleChange}
          value={text}
        />
        <button type="submit">Add</button>
      </form>
    </>
  );
}
