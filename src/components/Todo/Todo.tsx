import type { Todo } from "../TodoList/TodoList";
import { MdOutlineEdit } from "react-icons/md";
import { RiDraggable } from "react-icons/ri";
import { LuTrash } from "react-icons/lu";
import { TbPin } from "react-icons/tb";
import styles from "./Todo.module.css";
import { Draggable } from "@hello-pangea/dnd";

type TodoProps = {
  key: string;
  todo: Todo;
  index: number;
  onUpdate: (updated: Todo) => void;
  onDelete: (deleted: Todo) => void;
};

export default function Todo({
  key,
  todo,
  index,
  onUpdate,
  onDelete,
}: TodoProps) {
  const { id, text, status } = todo;
  const isChecked = status === "completed";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const status = e.target.checked ? "completed" : "active";
    onUpdate({ ...todo, status });
  };
  const handleDelete = () => onDelete(todo);
  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => (
        <li
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          key={key}
          className={`${styles.todoList} ${snapshot.isDragging ? styles.dragging : ""}`}
        >
          <div className={styles.todo}>
            <button className={styles.dragBtn}>
              <RiDraggable className={styles.dragIcon} />
            </button>
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleChange}
            />
            <label className={`${isChecked ? styles.doneText : null}`}>
              {text}
            </label>
          </div>

          <div className={styles.buttons}>
            <button className={styles.icon}>
              <MdOutlineEdit />
            </button>
            <button className={styles.icon}>
              <TbPin className={styles.pinBtn} />
            </button>
            <button onClick={handleDelete} className={styles.deleteBtn}>
              <LuTrash />
            </button>
          </div>
        </li>
      )}
    </Draggable>
  );
}
