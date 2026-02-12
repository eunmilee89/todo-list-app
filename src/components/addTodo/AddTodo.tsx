import { useState } from "react";
import type { Todo } from "../TodoList/TodoList";
import { v4 as uuidv4 } from "uuid";

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
    if (text.trim().length === 0) {
      return;
    }
    onAdd({ id: uuidv4(), text, status: "active" });
    console.log(text);
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
