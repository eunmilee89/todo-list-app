import { GRAPE_COLORS, GRAPE_VARIETIES } from "../GrapeList/grapes";
import styles from "./ColorPicker.module.css";

type ColorPickerProps = {
  value: string;
  onChange: (color: string) => void;
};

export default function ColorPicker({ value, onChange }: ColorPickerProps) {
  const isCustom = !GRAPE_COLORS.includes(value);

  return (
    <div className={styles.picker} role="radiogroup" aria-label="포도 색상">
      {GRAPE_VARIETIES.map(({ name, color }) => (
        <button
          key={color}
          type="button"
          role="radio"
          aria-checked={value === color}
          aria-label={name}
          title={name}
          className={`${styles.swatch} ${value === color ? styles.selected : ""}`}
          style={{ backgroundColor: color }}
          onClick={() => onChange(color)}
        />
      ))}
      <label
        className={`${styles.swatch} ${styles.custom} ${isCustom ? styles.selected : ""}`}
        style={isCustom ? { backgroundColor: value } : undefined}
        title="직접 고르기"
      >
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={styles.colorInput}
          aria-label="직접 색상 고르기"
        />
        {!isCustom && <span aria-hidden>+</span>}
      </label>
    </div>
  );
}
