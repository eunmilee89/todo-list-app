import { useEffect, useRef, useState } from "react";
import Todo from "../Todo/Todo";
import type { FilterValue } from "../../App";
import TodoControls from "../TodoControls/TodoControls";
import { DragDropContext, Droppable, type DropResult } from "@hello-pangea/dnd";
import confetti from "canvas-confetti";

import AddTodo from "../AddTodo/AddTodo";

export type Todo = {
  id: string;
  text: string;
  status: "active" | "completed";
  isPinned?: boolean;
};

export default function TodoList({ filter }: { filter: FilterValue }) {
  const [todos, setTodos] = useState<Todo[]>(readTodosFromLocalStorage);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isAllCompleted =
    todos.length > 0 && todos.every((todo) => todo.status === "completed");

  useEffect(() => {
    if (isAllCompleted) {
      confetti({
        particleCount: 100,
        spread: 360,
        origin: { y: 0.4 },
      });
    }
  }, [isAllCompleted]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [todos.length]);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

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
  const baseItems = getFilteredItems(todos, filter);

  const filtered = [...baseItems].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return 0;
  });

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(todos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTodos(items);
  };

  const handleTogglePin = (target: Todo) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === target.id ? { ...todo, isPinned: !todo.isPinned } : todo,
      ),
    );
  };

  return (
    <section>
      {todos.length > 0 && (
        <TodoControls
          isAllCompleted={isAllCompleted}
          onDeleteSelected={onDeleteSelected}
          onToggleAll={onToggleAll}
        />
      )}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="todo-list">
          {(provided) => (
            <ul
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{ listStyle: "none", padding: 0 }}
            >
              {filtered.map((todo, index) => (
                <Todo
                  key={todo.id}
                  todo={todo}
                  index={index}
                  onUpdate={handleUpdate}
                  onDelete={handleDelete}
                  onTogglePin={handleTogglePin}
                />
              ))}
              {provided.placeholder}
              <div ref={scrollRef} />
            </ul>
          )}
        </Droppable>
      </DragDropContext>
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

function readTodosFromLocalStorage() {
  const saved = localStorage.getItem("todos");
  return saved ? JSON.parse(saved) : [];
}
