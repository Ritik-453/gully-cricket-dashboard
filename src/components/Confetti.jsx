import { useMemo } from "react"

const COLORS = [
  "#34d399",
  "#38bdf8",
  "#fbbf24",
  "#f472b6",
  "#a78bfa",
  "#f87171",
]

export default function Confetti({
  pieceCount = 70,
}) {
  const pieces = useMemo(
    () =>
      Array.from({
        length: pieceCount,
      }).map((_, index) => ({
        id: index,
        left: Math.random() * 100,
        delay: Math.random() * 0.4,
        duration:
          2.2 + Math.random() * 1.4,
        size: 6 + Math.random() * 6,
        color:
          COLORS[
            index % COLORS.length
          ],
        rotate: Math.random() * 360,
      })),
    [pieceCount]
  )

  return (
    <div
      className="
        pointer-events-none
        fixed
        inset-0
        z-[200]
        overflow-hidden
      "
      aria-hidden="true"
    >
      {pieces.map((piece) => (
        <span
          key={piece.id}
          style={{
            position: "absolute",
            top: "-5vh",
            left: `${piece.left}%`,
            width: `${piece.size}px`,
            height: `${
              piece.size * 0.42
            }px`,
            backgroundColor:
              piece.color,
            borderRadius: "2px",
            transform: `rotate(${piece.rotate}deg)`,
            animation: `confetti-fall ${piece.duration}s linear ${piece.delay}s forwards`,
          }}
        />
      ))}
    </div>
  )
}
