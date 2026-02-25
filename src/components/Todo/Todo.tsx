import type { Todo } from "../TodoList/TodoList";
import { MdOutlineEdit } from "react-icons/md";
import { RiDraggable } from "react-icons/ri";
import { LuTrash } from "react-icons/lu";
import { TbPin } from "react-icons/tb";
import styles from "./Todo.module.css";
import { Draggable } from "@hello-pangea/dnd";
import { useState } from "react";
import TodoForm from "../TodoForm/TodoForm";

type TodoProps = {
  key: string;
  todo: Todo;
  index: number;
  onUpdate: (updated: Todo) => void;
  onDelete: (deleted: Todo) => void;
};

export default function Todo({ todo, index, onUpdate, onDelete }: TodoProps) {
  const { id, text, status } = todo;
  const isChecked = status === "completed";
  const [isEdit, setIsEdit] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const status = e.target.checked ? "completed" : "active";
    onUpdate({ ...todo, status });
  };

  const handleCancel = () => setIsEdit(false);
  const handleEdit = () => setIsEdit(true);
  const handleDelete = () => onDelete(todo);
  const handleSubmit = (updated: Todo) => {
    onUpdate(updated);
    setIsEdit(false);
  };
  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => (
        <li
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`${styles.todoList} ${isEdit ? styles.editing : ""} ${snapshot.isDragging ? styles.dragging : ""}`}
        >
          {isEdit ? (
            <TodoForm
              mode="edit"
              initialTodo={todo}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
            />
          ) : (
            <>
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
                <button className={styles.icon} onClick={handleEdit}>
                  <MdOutlineEdit />
                </button>
                <button className={styles.icon}>
                  <TbPin className={styles.pinBtn} />
                </button>
                <button onClick={handleDelete} className={styles.deleteBtn}>
                  <LuTrash />
                </button>
              </div>
            </>
          )}
        </li>
      )}
    </Draggable>
  );
}
