import { useEffect, useRef } from "react";
import type { Todo } from "../TodoList/TodoList";
import styles from "./ConfirmModal.module.css";

type ConfirmModalProps = {
  todo?: Todo;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
};

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
}: ConfirmModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (isOpen) {
      dialog?.showModal();
    } else {
      dialog?.close();
    }
  }, [isOpen]);
  return (
    <dialog ref={dialogRef} className={styles.dialog}>
      <span>{title}</span>
      <div className={styles.buttons}>
        <button
          className={`${styles.btn} ${styles.cancelBtn}`}
          onClick={onClose}
        >
          취소
        </button>
        <button
          className={`${styles.btn} ${styles.confirmBtn}`}
          onClick={onConfirm}
        >
          {message}
        </button>
      </div>
    </dialog>
  );
}
