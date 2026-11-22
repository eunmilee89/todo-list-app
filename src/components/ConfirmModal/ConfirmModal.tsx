import { useEffect, useRef, type MouseEvent } from "react";
import { FiAlertCircle } from "react-icons/fi";
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

  // 카드 바깥(어두운 배경)을 누르면 닫기
  const handleBackdropClick = (e: MouseEvent<HTMLDialogElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      onClick={handleBackdropClick}
      // Esc로 닫을 때도 상태가 같이 바뀌도록
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
    >
      <div className={styles.card}>
        <div className={styles.icon} aria-hidden>
          <FiAlertCircle />
        </div>
        <p className={styles.title}>{title}</p>
        <div className={styles.buttons}>
          <button
            className={`${styles.btn} ${styles.cancelBtn}`}
            onClick={onClose}
            autoFocus
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
      </div>
    </dialog>
  );
}
