import { useState } from "react";
import AddTodo from "../addTodo/AddTodo";
import Todo from "../Todo/Todo";
import type { FilterValue } from "../../App";
import TodoControls from "../TodoControls/TodoControls";

export type Todo = {
  id: string;
  text: string;
  status: "active" | "completed";
};

export default function TodoList({ filter }: { filter: FilterValue }) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const isAllCompleted =
    todos.length > 0 && todos.every((todo) => todo.status === "completed");

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
  const onToggleAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const shouldCompleteAll = e.target.checked;
    setTodos((prev) =>
      prev.map((todo) => ({
        ...todo,
        status: shouldCompleteAll ? "completed" : "active",
      })),
    );
  };
  const onDeleteSelected = () => {
    const hasCompleted = todos.some((todo) => todo.status === "completed");
    if (!hasCompleted) return;
    setTodos((todos) => todos.filter((todo) => todo.status === "active"));
  };

  const filtered = getFilteredItems(todos, filter);
  return (
    <section>
      <AddTodo onAdd={handleAdd} />
      {todos.length > 0 && (
        <TodoControls
          isAllCompleted={isAllCompleted}
          onDeleteSelected={onDeleteSelected}
          onToggleAll={onToggleAll}
        />
      )}
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
    </section>
  );
}

function getFilteredItems(todos: Todo[], filter: FilterValue) {
  if (filter === "all") {
    return todos;
  }
  return todos.filter((todo) => todo.status === filter);
}
