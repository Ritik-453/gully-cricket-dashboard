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

const getFlashClass = (label) => {
  if (!label) return null

  const text = String(label)

  if (text === "6")
    return "bg-emerald-400/25"

  if (text === "4")
    return "bg-sky-400/25"

  if (isWicketLabel(text))
    return "bg-red-500/25"

  if (text === "Wd")
    return "bg-yellow-300/20"

  if (text.startsWith("Nb"))
    return "bg-purple-400/20"

  return null
}

export default function ScoreBoard({
  score,
  wickets,
  overs,
  freeHit,
  teamA,
  innings,
  target,
  winner,
  balls,
  maxOvers,
  history = [],
}) {

  // CURRENT RUN RATE
  const crr =
    balls > 0
      ? (
          (score * 6) / balls
        ).toFixed(2)
      : "0.00"

  // BALLS LEFT
  const totalBalls =
    maxOvers * 6

  const ballsLeft =
    totalBalls - balls

  // RUNS NEEDED
  const runsNeeded =
    target
      ? Math.max(target - score, 0)
      : 0

  // REQUIRED RUN RATE
  const rrr =
    innings === 2 &&
    ballsLeft > 0
      ? (
          (runsNeeded * 6) /
          ballsLeft
        ).toFixed(2)
      : "0.00"

  const lastEntry =
    history.length > 0
      ? history[history.length - 1]
      : null

  const lastLabel = lastEntry
    ? typeof lastEntry === "object"
      ? lastEntry.label
      : lastEntry
    : null

  const flashClass =
    getFlashClass(lastLabel)

  const isLastBallWicket =
    lastLabel &&
    isWicketLabel(String(lastLabel))

  return (
    <div
      className="
        relative
        overflow-hidden
        bg-zinc-800
        p-4
        md:p-6
        rounded-2xl
        shadow-2xl
        sticky
        top-2
        z-30
      "
    >

      {flashClass && (
        <div
          key={history.length}
          className={`
            pointer-events-none
            absolute
            inset-0
            z-0
            ${flashClass}
            animate-flash-fade
          `}
        />
      )}

      <div className="relative z-10">

      {/* TEAM NAME */}
      <h2 className="
        text-xl
        md:text-3xl
        font-bold
        truncate
      ">

        {teamA?.teamName || "Select Team"}

      </h2>

      {/* SCORE */}
      <div
        key={`${score}-${wickets}`}
        className={`
          mt-3
          md:mt-5
          text-4xl
          md:text-7xl
          font-extrabold
          animate-score-pop
          ${
            isLastBallWicket
              ? "animate-shake"
              : ""
          }
        `}
      >

        {score}/{wickets}

      </div>

      {/* OVERS */}
      <div className="
        mt-2
        md:mt-3
        text-base
        md:text-lg
        text-zinc-300
      ">

        Overs: {overs}

      </div>

      {/* TARGET */}
      {
        target && (
          <div className="
            mt-2
            md:mt-3
            text-yellow-400
            text-base
            md:text-lg
            font-semibold
          ">

            Target: {target}

          </div>
        )
      }

      {/* RUN RATE CARDS */}
      <div className="
        grid
        grid-cols-3
        gap-2
        md:gap-3
        mt-4
        md:mt-6
      ">

        {/* CRR */}
        <div className="
          bg-black/40
          p-2
          md:p-3
          rounded-xl
          text-center
        ">

          <div className="
            text-zinc-400
            text-xs
            md:text-sm
          ">
            CRR
          </div>

          <div className="
            text-lg
            md:text-xl
            font-bold
          ">
            {crr}
          </div>

        </div>

        {/* RRR */}
        <div className="
          bg-black/40
          p-2
          md:p-3
          rounded-xl
          text-center
        ">

          <div className="
            text-zinc-400
            text-xs
            md:text-sm
          ">
            RRR
          </div>

          <div className="
            text-lg
            md:text-xl
            font-bold
          ">
            {rrr}
          </div>

        </div>

        {/* NEED */}
        <div className="
          bg-black/40
          p-2
          md:p-3
          rounded-xl
          text-center
        ">

          <div className="
            text-zinc-400
            text-xs
            md:text-sm
          ">
            Need
          </div>

          <div className="
            text-lg
            md:text-xl
            font-bold
          ">
            {runsNeeded}
          </div>

        </div>

      </div>

      {/* BALLS LEFT */}
      {
        innings === 2 && (
          <div className="
            mt-5
            text-center
            text-zinc-300
          ">

            Balls Left: {ballsLeft}

          </div>
        )
      }

      {/* FREE HIT */}
      {
        freeHit && (
          <div className="
            mt-5
            bg-yellow-500
            text-black
            font-bold
            text-center
            py-3
            rounded-xl
            animate-pulse
          ">

            FREE HIT

          </div>
        )
      }

      {/* WINNER */}
      {
        winner && (
          <div className="
            mt-5
            bg-green-600
            text-white
            font-bold
            text-center
            py-4
            rounded-xl
            text-xl
          ">

            🏆 {winner}

          </div>
        )
      }

      </div>

    </div>
  )
}