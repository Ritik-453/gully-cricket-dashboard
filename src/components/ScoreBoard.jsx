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

  return (
    <div
      className="
        bg-zinc-800
        p-5
        md:p-6
        rounded-2xl
        shadow-2xl
        sticky
        top-2
        z-40
      "
    >

      {/* TEAM NAME */}
      <h2 className="
        text-2xl
        md:text-3xl
        font-bold
      ">

        {teamA?.teamName || "Select Team"}

      </h2>

      {/* SCORE */}
      <div className="
        mt-5
        text-5xl
        md:text-7xl
        font-extrabold
      ">

        {score}/{wickets}

      </div>

      {/* OVERS */}
      <div className="
        mt-3
        text-lg
        text-zinc-300
      ">

        Overs: {overs}

      </div>

      {/* TARGET */}
      {
        target && (
          <div className="
            mt-3
            text-yellow-400
            text-lg
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
        gap-3
        mt-6
      ">

        {/* CRR */}
        <div className="
          bg-black/40
          p-3
          rounded-xl
          text-center
        ">

          <div className="
            text-zinc-400
            text-sm
          ">
            CRR
          </div>

          <div className="
            text-xl
            font-bold
          ">
            {crr}
          </div>

        </div>

        {/* RRR */}
        <div className="
          bg-black/40
          p-3
          rounded-xl
          text-center
        ">

          <div className="
            text-zinc-400
            text-sm
          ">
            RRR
          </div>

          <div className="
            text-xl
            font-bold
          ">
            {rrr}
          </div>

        </div>

        {/* NEED */}
        <div className="
          bg-black/40
          p-3
          rounded-xl
          text-center
        ">

          <div className="
            text-zinc-400
            text-sm
          ">
            Need
          </div>

          <div className="
            text-xl
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
  )
}