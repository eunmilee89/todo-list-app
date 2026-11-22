import { useState } from "react";
import { Link, useParams } from "react-router";
import confetti from "canvas-confetti";
import { IoArrowBack } from "react-icons/io5";
import GrapeBunch from "../GrapeBunch/GrapeBunch";
import ColorPicker from "../ColorPicker/ColorPicker";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import { countFilled, useGrapes } from "../GrapeList/grapes";
import styles from "./GrapeDetail.module.css";

export default function GrapeDetail() {
  const { id } = useParams();
  const { grapes, updateGrape } = useGrapes();
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const grape = grapes.find((g) => g.id === id);

  if (!grape) {
    return (
      <section className={styles.missing}>
        <p>포도를 찾을 수 없어요.</p>
        <Link to="/grape-list" className={styles.backLink}>
          <IoArrowBack /> 포도 목록으로
        </Link>
      </section>
    );
  }

  const done = countFilled(grape);
  const total = grape.filled.length;
  const isComplete = done === total;

  const toggleBerry = (index: number) => {
    const filled = grape.filled.map((v, i) => (i === index ? !v : v));
    updateGrape(grape.id, (g) => ({ ...g, filled }));

    if (filled.every(Boolean)) {
      confetti({
        particleCount: 120,
        spread: 360,
        origin: { y: 0.4 },
        colors: [grape.color, "#7cb342", "#ffffff"],
      });
    }
  };

  const handleReset = () => {
    updateGrape(grape.id, (g) => ({ ...g, filled: g.filled.map(() => false) }));
    setIsResetModalOpen(false);
  };

  return (
    <section className={styles.detail}>
      <Link to="/grape-list" className={styles.backLink}>
        <IoArrowBack /> 포도 목록
      </Link>

      <div className={styles.board}>
        <h2 className={styles.title}>{grape.title}</h2>
        <p className={styles.count}>
          {isComplete ? (
            "포도 한 송이 완성! 🎉"
          ) : (
            <>
              <strong style={{ color: grape.color }}>{done}</strong> / {total}
            </>
          )}
        </p>

        <div className={styles.bunch}>
          <GrapeBunch
            filled={grape.filled}
            color={grape.color}
            onBerryClick={toggleBerry}
            showNumbers
          />
        </div>

        <div className={styles.actions}>
          <button
            className={styles.resetBtn}
            onClick={() => setIsResetModalOpen(true)}
            disabled={done === 0}
          >
            초기화
          </button>
        </div>
      </div>

      <div className={styles.colorSection}>
        <span className={styles.label}>포도 색상</span>
        <ColorPicker
          value={grape.color}
          onChange={(color) => updateGrape(grape.id, (g) => ({ ...g, color }))}
        />
      </div>

      {isResetModalOpen && (
        <ConfirmModal
          isOpen={isResetModalOpen}
          onClose={() => setIsResetModalOpen(false)}
          onConfirm={handleReset}
          title="칠한 포도알을 모두 지우시겠습니까?"
          message="초기화"
        />
      )}
    </section>
  );
}
