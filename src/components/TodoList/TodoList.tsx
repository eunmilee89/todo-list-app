import { useEffect, useRef, useState } from "react";
import Todo from "../Todo/Todo";
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

const filters = ["all", "active", "completed"];
export type FilterValue = (typeof filters)[number];

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>(readTodosFromLocalStorage);
  const [filter, setFilter] = useState<FilterValue>(filters[0]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isAllCompleted =
    todos.length > 0 && todos.every((todo) => todo.status === "completed");
  const prevLengthRef = useRef(todos.length);

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
    if (todos.length > prevLengthRef.current) {
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    prevLengthRef.current = todos.length;
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
          filters={filters}
          filter={filter}
          onFilterChange={setFilter}
          onDeleteSelected={onDeleteSelected}
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
