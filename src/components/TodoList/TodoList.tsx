import { useState } from "react";
import AddTodo from "../addTodo/AddTodo";
import Todo from "../Todo/Todo";
import type { FilterValue } from "../../App";

export type Todo = {
  id: string;
  text: string;
  status: "active" | "completed";
};

export default function TodoList({ filter }: { filter: FilterValue }) {
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleAdd = (todo: Todo) => {
    setTodos((todos) => [...todos, todo]);
  };
  const handleUpdate = (updated: Todo) => {
    setTodos((todos) =>
      todos.map((todo) => (todo.id === updated.id ? updated : todo)),
    );
  };
  const handleDelete = (deleted: Todo) => {
    setTodos((todos) => todos.filter((todo) => todo.id !== deleted.id));
  };
  const filtered = getFilteredItems(todos, filter);
  return (
    <section>
      <ul>
        {filtered.map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        ))}
      </ul>
      <AddTodo onAdd={handleAdd} />
    </section>
  );
}

function getFilteredItems(todos: Todo[], filter: FilterValue) {
  if (filter === "all") {
    return todos;
  }
  return todos.filter((todo) => todo.status === filter);
}
