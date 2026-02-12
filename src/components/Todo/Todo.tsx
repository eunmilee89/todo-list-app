import type { Todo } from "../TodoList/TodoList";
import { LuTrash } from "react-icons/lu";

type TodoProps = {
  key: string;
  todo: Todo;
  onUpdate: (updated: Todo) => void;
  onDelete: (deleted: Todo) => void;
};

export default function Todo({ key, todo, onUpdate, onDelete }: TodoProps) {
  const { text, status } = todo;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const status = e.target.checked ? "completed" : "active";
    onUpdate({ ...todo, status });
  };
  const handleDelete = () => onDelete(todo);
  return (
    <li key={key}>
      <input
        type="checkbox"
        id="checkbox"
        checked={status === "completed"}
        onChange={handleChange}
      />
      <label htmlFor="checkbox">{text}</label>
      <button onClick={handleDelete}>
        <LuTrash />
      </button>
    </li>
  );
}
