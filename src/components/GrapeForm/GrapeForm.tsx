import { useEffect, useRef, useState, type SubmitEvent } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  BERRY_PRESETS,
  GRAPE_COLORS,
  MAX_BERRIES,
  MIN_BERRIES,
  type Grape,
} from "../GrapeList/grapes";
import GrapeBunch from "../GrapeBunch/GrapeBunch";
import ColorPicker from "../ColorPicker/ColorPicker";
import styles from "./GrapeForm.module.css";

type GrapeFormProps = {
  onSubmit: (grape: Grape) => void;
  onCancel: () => void;
};

export default function GrapeForm({ onSubmit, onCancel }: GrapeFormProps) {
  const [title, setTitle] = useState("");
  const [countInput, setCountInput] = useState(String(BERRY_PRESETS[0]));
  const [color, setColor] = useState(GRAPE_COLORS[0]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const count = Number(countInput);
  const isCountValid =
    Number.isInteger(count) && count >= MIN_BERRIES && count <= MAX_BERRIES;
  const titleError = title.length > 30 ? "할 일은 30자 이내로 입력해주세요." : "";
  const countError = isCountValid
    ? ""
    : `포도알은 ${MIN_BERRIES}~${MAX_BERRIES}개 사이로 정해주세요.`;
  const canSubmit = !!title.trim() && !titleError && isCountValid;

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSubmit) return;
    onSubmit({
      id: uuidv4(),
      title: title.trim(),
      color,
      filled: Array(count).fill(false),
      createdAt: Date.now(),
    });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.fields}>
        <label className={styles.field}>
          <span className={styles.label}>어떤 일을 할 건가요?</span>
          <input
            ref={inputRef}
            type="text"
            className={styles.textInput}
            placeholder="예) 하루 30분 운동하기"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <span className={styles.error}>{titleError}</span>
        </label>

        <div className={styles.field}>
          <span className={styles.label}>포도알 개수</span>
          <div className={styles.counts}>
            {BERRY_PRESETS.map((preset) => (
              <button
                key={preset}
                type="button"
                className={`${styles.chip} ${count === preset ? styles.chipSelected : ""}`}
                onClick={() => setCountInput(String(preset))}
              >
                {preset}
              </button>
            ))}
            <input
              type="number"
              min={MIN_BERRIES}
              max={MAX_BERRIES}
              className={styles.countInput}
              value={countInput}
              onChange={(e) => setCountInput(e.target.value)}
              aria-label="포도알 개수 직접 입력"
            />
          </div>
          <span className={styles.error}>{countError}</span>
        </div>

        <div className={styles.field}>
          <span className={styles.label}>포도 색상</span>
          <ColorPicker value={color} onChange={setColor} />
        </div>
      </div>

      <div className={styles.preview}>
        {isCountValid && (
          <GrapeBunch
            filled={Array(count)
              .fill(false)
              .map((_, i) => i < Math.ceil(count / 3))}
            color={color}
          />
        )}
      </div>

      <div className={styles.buttons}>
        <button
          type="button"
          onClick={onCancel}
          className={`${styles.button} ${styles.cancelBtn}`}
        >
          취소
        </button>
        <button
          type="submit"
          disabled={!canSubmit}
          className={`${styles.button} ${styles.submitBtn}`}
        >
          포도 만들기
        </button>
      </div>
    </form>
  );
}
