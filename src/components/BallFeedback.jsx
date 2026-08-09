import { useMemo } from "react"

const WICKET_CODES = [
  "W",
  "B",
  "C",
  "LBW",
  "ST",
  "RO",
]

const isWicketLabel = (label) =>
  WICKET_CODES.some(
    (code) =>
      label === code ||
      label.startsWith(`${code}-`) ||
      label.startsWith(`${code}(`)
  )

const getFeedback = (label) => {
  const text = String(label)

  if (text === "6") {
    return {
      text: "SIX!",
      emoji: "🚀",
      tone: "bg-emerald-500 text-slate-950",
    }
  }

  if (text === "4") {
    return {
      text: "FOUR!",
      emoji: "🔥",
      tone: "bg-sky-500 text-slate-950",
    }
  }

  if (isWicketLabel(text)) {
    return {
      text: "OUT!",
      emoji: "🎯",
      tone: "bg-red-600 text-white",
    }
  }

  if (text === "Wd") {
    return {
      text: "WIDE",
      emoji: "↔️",
      tone: "bg-yellow-400 text-slate-950",
    }
  }

  if (text.startsWith("Nb")) {
    return {
      text: "NO BALL",
      emoji: "⚠️",
      tone: "bg-purple-500 text-white",
    }
  }

  return null
}

export default function BallFeedback({
  history,
}) {
  const lastEntry =
    history && history.length > 0
      ? history[history.length - 1]
      : null

  const lastLabel = lastEntry
    ? typeof lastEntry === "object"
      ? lastEntry.label
      : lastEntry
    : null

  const feedback = useMemo(
    () =>
      lastLabel
        ? getFeedback(lastLabel)
        : null,
    [lastLabel]
  )

  if (!feedback) return null

  return (
    <div
      key={
        history?.length || 0
      }
      className="
        pointer-events-none
        fixed
        left-1/2
        top-1/3
        z-[150]
        -translate-x-1/2
      "
      aria-hidden="true"
    >
      <div
        className={`
          animate-big-badge
          rounded-2xl
          px-6
          py-3
          text-2xl
          font-black
          uppercase
          tracking-wide
          shadow-2xl
          md:px-8
          md:py-4
          md:text-4xl
          ${feedback.tone}
        `}
      >
        {feedback.emoji}{" "}
        {feedback.text}
      </div>
    </div>
  )
}
