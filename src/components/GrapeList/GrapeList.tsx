import { useState } from "react";
import { Link } from "react-router";
import { FaPlus } from "react-icons/fa6";
import { FaRegTrashAlt } from "react-icons/fa";
import GrapeBunch from "../GrapeBunch/GrapeBunch";
import GrapeForm from "../GrapeForm/GrapeForm";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import { countFilled, useGrapes, type Grape } from "./grapes";
import styles from "./GrapeList.module.css";

export default function GrapeList() {
  const { grapes, addGrape, deleteGrape } = useGrapes();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [grapeToDelete, setGrapeToDelete] = useState<Grape | null>(null);

  const handleAdd = (grape: Grape) => {
    addGrape(grape);
    setIsFormOpen(false);
  };

  const handleDelete = () => {
    if (!grapeToDelete) return;
    deleteGrape(grapeToDelete.id);
    setGrapeToDelete(null);
  };

  return (
    <section>
      <ul className={styles.grid}>
        {grapes.map((grape) => {
          const done = countFilled(grape);
          const total = grape.filled.length;
          const isComplete = done === total;
          return (
            <li key={grape.id} className={styles.cardWrap}>
              <Link
                to={`/grape-list/${grape.id}`}
                className={styles.card}
              >
                <h3 className={styles.title}>{grape.title}</h3>
                <div className={styles.bunch}>
                  <GrapeBunch filled={grape.filled} color={grape.color} />
                </div>
                <div className={styles.progress}>
                  <div className={styles.bar}>
                    <div
                      className={styles.barFill}
                      style={{
                        width: `${(done / total) * 100}%`,
                        backgroundColor: grape.color,
                      }}
                    />
                  </div>
                  <span className={styles.count}>
                    {isComplete ? "완성! 🎉" : `${done} / ${total}`}
                  </span>
                </div>
              </Link>
              <button
                className={styles.deleteBtn}
                onClick={() => setGrapeToDelete(grape)}
                aria-label={`${grape.title} 포도 삭제`}
              >
                <FaRegTrashAlt />
              </button>
            </li>
          );
        })}

        {isFormOpen ? (
          <li className={styles.formWrap}>
            <GrapeForm
              onSubmit={handleAdd}
              onCancel={() => setIsFormOpen(false)}
            />
          </li>
        ) : (
          <li>
            <button
              onClick={() => setIsFormOpen(true)}
              className={styles.addCard}
            >
              <FaPlus className={styles.addIcon} />
              <span>포도 추가</span>
            </button>
          </li>
        )}
      </ul>

      {grapeToDelete && (
        <ConfirmModal
          isOpen={!!grapeToDelete}
          onClose={() => setGrapeToDelete(null)}
          onConfirm={handleDelete}
          title={`'${grapeToDelete.title}' 포도를 삭제하시겠습니까?`}
          message="삭제"
        />
      )}
    </section>
  );
}
