import { useState } from "react";
import AddTodo from "../addTodo/AddTodo";
export type Todo = {
  id: string;
  text: string;
  status: "active" | "completed";
};

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: "12", text: "장보기", status: "active" },
    { id: "123", text: "장보기", status: "active" },
  ]);

  const handleAdd = (todo: Todo) => {
    setTodos((todos) => [...todos, todo]);
  };

  return (
    <section>
      <ul>
        {todos.map((item) => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
      <AddTodo onAdd={handleAdd} />
    </section>
  );
}
