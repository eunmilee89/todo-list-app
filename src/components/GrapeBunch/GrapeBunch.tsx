import { useState } from "react";
import styles from "./GrapeBunch.module.css";

type GrapeBunchProps = {
  filled: boolean[];
  color: string;
  onBerryClick?: (index: number) => void;
  showNumbers?: boolean;
  className?: string;
};

type Berry = { x: number; y: number; index: number };

const R = 18;
const DX = R * 1.8; // 옆 포도알과 살짝 겹치는 간격
const DY = R * 1.5; // 벌집(육각) 배치의 줄 간격
const MIN_VIEW = DX * 4.5; // 포도알이 적어도 너무 커 보이지 않도록 최소 화면 크기
const TILT = 18; // 송이 기울기(도). 양수면 꼭지가 오른쪽 위로
const TILT_RAD = (TILT * Math.PI) / 180;

export default function GrapeBunch({
  filled,
  color,
  onBerryClick,
  showNumbers = false,
  className,
}: GrapeBunchProps) {
  const [lastToggled, setLastToggled] = useState<number | null>(null);
  const berries = layoutBerries(filled.length);
  const isComplete = filled.length > 0 && filled.every(Boolean);

  const ys = berries.map((b) => b.y);
  const topY = Math.min(...ys) - R;
  // 포도알이 많을수록 가지가 굵고 길어지고, 잎도 커짐
  // (큰 송이는 카드에 맞춰 축소되므로 개수에 비례해 키워야 화면에서도 굵어 보임)
  const total = filled.length;
  const stemWidth = 3 + total * 0.22;
  const stemLength = 20 + total * 1.2;
  const stemTip = { x: stemLength * 0.25, y: topY - stemLength };
  const leafRx = 10 + total * 0.35;
  const leafRy = leafRx * 0.45;
  const leaf = { x: stemTip.x + leafRx * 0.9, y: stemTip.y + leafRy * 1.2 };

  const stemPath = `M 0 ${topY + R * 0.5} Q ${-stemLength * 0.1} ${topY - stemLength / 2} ${stemTip.x} ${stemTip.y}`;

  // 기울인 뒤 실제로 그려지는 범위에 딱 맞게 보이는 영역(viewBox)을 계산
  const rotated = (x: number, y: number) => ({
    x: x * Math.cos(TILT_RAD) - y * Math.sin(TILT_RAD),
    y: x * Math.sin(TILT_RAD) + y * Math.cos(TILT_RAD),
  });
  const extents = [
    ...berries.map((b) => ({ ...rotated(b.x, b.y), r: R * 1.1 })),
    { ...rotated(stemTip.x, stemTip.y), r: stemWidth },
    { ...rotated(leaf.x, leaf.y), r: leafRx },
  ];
  const pad = 4;
  let minX = Math.min(...extents.map((p) => p.x - p.r)) - pad;
  let maxX = Math.max(...extents.map((p) => p.x + p.r)) + pad;
  let minY = Math.min(...extents.map((p) => p.y - p.r)) - pad;
  let maxY = Math.max(...extents.map((p) => p.y + p.r)) + pad;
  if (maxX - minX < MIN_VIEW) {
    const grow = (MIN_VIEW - (maxX - minX)) / 2;
    minX -= grow;
    maxX += grow;
  }
  if (maxY - minY < MIN_VIEW) {
    const grow = (MIN_VIEW - (maxY - minY)) / 2;
    minY -= grow;
    maxY += grow;
  }

  // 그리는 순서 = 쌓이는 순서: 빈 알 → 칠한 알 → 방금 누른 알 (가장 위)
  const drawOrder = [...berries].sort((a, b) => {
    const layer = (berry: Berry) =>
      isComplete
        ? 0 // 완성된 송이는 위에서 아래로 자연스럽게 겹치도록
        : berry.index === lastToggled
          ? 2
          : filled[berry.index]
            ? 1
            : 0;
    return layer(a) - layer(b) || a.y - b.y || a.x - b.x;
  });

  const clickable = !!onBerryClick;
  const handleClick = (index: number) => {
    setLastToggled(index);
    onBerryClick?.(index);
  };

  return (
    <svg
      viewBox={`${minX} ${minY} ${maxX - minX} ${maxY - minY}`}
      className={`${styles.bunch} ${className ?? ""}`}
      role="img"
      aria-label={`포도알 ${filled.length}개 중 ${filled.filter(Boolean).length}개 완료`}
    >
      <g transform={`rotate(${TILT})`}>
        <path
          d={stemPath}
          className={styles.stem}
          style={{ strokeWidth: stemWidth }}
        />
        <ellipse
          cx={leaf.x}
          cy={leaf.y}
          rx={leafRx}
          ry={leafRy}
          transform={`rotate(-20 ${leaf.x} ${leaf.y})`}
          className={styles.leaf}
        />

      {drawOrder.map(({ x, y, index }) => {
        const isFilled = filled[index];
        return (
          <g
            key={index}
            className={`${styles.berry} ${isFilled ? styles.filled : ""} ${clickable ? styles.clickable : ""}`}
            onClick={clickable ? () => handleClick(index) : undefined}
            onKeyDown={
              clickable
                ? (e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleClick(index);
                    }
                  }
                : undefined
            }
            role={clickable ? "button" : undefined}
            tabIndex={clickable ? 0 : undefined}
            aria-label={
              clickable
                ? `${index + 1}번 포도알 ${isFilled ? "칠함" : "비어 있음"}`
                : undefined
            }
            aria-pressed={clickable ? isFilled : undefined}
          >
            <ellipse
              cx={x}
              cy={y}
              rx={R}
              ry={R * 1.08}
              className={styles.circle}
              style={
                isFilled
                  ? isComplete
                    ? // 완성: 흰 틈 없이 알끼리 겹치고, 같은 색의 진한 선으로만 구분 → 실제 포도송이처럼
                      {
                        fill: berryShade(color, index),
                        stroke: `color-mix(in srgb, ${color} 65%, black)`,
                        strokeWidth: 1.5,
                      }
                    : {
                        fill: berryShade(color, index),
                        stroke: "var(--color-bg)",
                      }
                  : {
                      // 빈 알은 테두리 없이 같은 색으로 칠해 하나의 송이 실루엣처럼 보이게
                      fill: `color-mix(in srgb, ${color} 15%, var(--color-bg))`,
                      stroke: `color-mix(in srgb, ${color} 15%, var(--color-bg))`,
                      ["--hover-stroke" as string]: `color-mix(in srgb, ${color} 50%, var(--color-bg))`,
                    }
              }
            />
            {isFilled && <path d={shineArc(x, y)} className={styles.shine} />}
            {showNumbers && !isFilled && (
              <text
                x={x}
                y={y}
                // 송이가 기울어져도 숫자는 똑바로 보이도록 반대로 돌려줌
                transform={`rotate(${-TILT} ${x} ${y})`}
                className={styles.number}
                style={{
                  fill: `color-mix(in srgb, ${color} 45%, var(--color-bg))`,
                }}
              >
                {index + 1}
              </text>
            )}
          </g>
        );
      })}
      </g>
    </svg>
  );
}

/**
 * 실제 포도처럼 알마다 색이 조금씩 다르게 (밝게/어둡게 최대 15%).
 * 알 번호로 정해지는 고정값이라 새로고침해도 같은 알은 항상 같은 색.
 */
function berryShade(color: string, index: number) {
  const noise = Math.sin(index * 12.9898 + 4.1414) * 43758.5453;
  const v = (noise - Math.floor(noise)) * 2 - 1; // -1 ~ 1
  const amount = Math.round(Math.abs(v) * 15);
  if (amount < 2) return color;
  const target = v > 0 ? "white" : "black";
  return `color-mix(in srgb, ${color} ${100 - amount}%, ${target})`;
}

// 포도알 왼쪽 위 가장자리를 따라가는 짧은 곡선 (빛 반사 느낌)
function shineArc(cx: number, cy: number) {
  const r = R * 0.62;
  const point = (deg: number) => {
    const rad = (deg * Math.PI) / 180;
    return `${cx + r * Math.cos(rad)} ${cy + r * Math.sin(rad) * 1.08}`;
  };
  return `M ${point(195)} A ${r} ${r * 1.08} 0 0 1 ${point(250)}`;
}

/**
 * 줄마다 포도알 개수를 정해 가운데 정렬로 쌓는다.
 * 이웃한 줄의 개수가 항상 1씩 차이 나서, 아랫줄 알이 윗줄 알 사이에 쏙 끼워진다.
 */
function layoutBerries(total: number): Berry[] {
  const rows = getRowSizes(total);
  const berries: Berry[] = [];
  let index = 0;
  rows.forEach((count, row) => {
    for (let i = 0; i < count; i++) {
      berries.push({ x: (i - (count - 1) / 2) * DX, y: row * DY, index });
      index++;
    }
  });
  return berries;
}

/**
 * 포도송이 모양의 줄 구성
 * - 어깨: 위에서 a개로 시작해 가장 넓은 w개까지 한 줄씩 늘어남
 * - 몸통: (w-1, w)를 k번 반복
 * - 꼬리: w-1개부터 한 줄씩 줄어 1~2개로 끝남
 * 합이 정확히 total이 되는 조합 중 세로로 살짝 긴, 가장 포도다운 비율을 고른다.
 */
function getRowSizes(total: number): number[] {
  if (total <= 0) return [];
  if (total <= 2) return [total];

  let best: number[] = [total];
  let bestScore = Infinity;

  for (let w = 2; w <= 12; w++) {
    const idealTop = w >= 5 ? w - 2 : w - 1;
    for (let a = 1; a <= w; a++) {
      for (let k = 0; k <= 4; k++) {
        for (let b = 1; b <= Math.min(2, w - 1); b++) {
          const body = Array.from({ length: k }, () => [w - 1, w]).flat();
          const rows = [...range(a, w), ...body, ...range(b, w - 1).reverse()];
          if (sum(rows) !== total) continue;

          const height = (rows.length - 1) * DY + 2 * R;
          const width = (w - 1) * DX + 2 * R;
          const score =
            Math.abs(a - idealTop) * 2 +
            (b - 1) * 1.2 +
            Math.abs(height / width - 1.2) * 4 +
            k * 0.3;

          if (score < bestScore) {
            bestScore = score;
            best = rows;
          }
        }
      }
    }
  }
  return best;
}

function range(from: number, to: number) {
  const result: number[] = [];
  for (let i = from; i <= to; i++) result.push(i);
  return result;
}

function sum(values: number[]) {
  return values.reduce((a, b) => a + b, 0);
}
