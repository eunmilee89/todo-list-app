import { useEffect, useState } from "react";
import AddTodo from "../addTodo/AddTodo";
import Todo from "../Todo/Todo";
import type { FilterValue } from "../../App";
import TodoControls from "../TodoControls/TodoControls";
import { DragDropContext, Droppable, type DropResult } from "@hello-pangea/dnd";
import confetti from "canvas-confetti";

export type Todo = {
  id: string;
  text: string;
  status: "active" | "completed";
};

export default function TodoList({ filter }: { filter: FilterValue }) {
  const [todos, setTodos] = useState<Todo[]>([]);
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
  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return; // 리스트 밖으로 던지면 무시

    const items = Array.from(todos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTodos(items);
  };

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
                />
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </section>
  );
}

function getFilteredItems(todos: Todo[], filter: FilterValue) {
  if (filter === "all") {
    return todos;
  }
  return todos.filter((todo) => todo.status === filter);
}
