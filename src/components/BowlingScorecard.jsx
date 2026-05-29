const formatOvers = (balls) =>
  `${Math.floor(balls / 6)}.${balls % 6}`

export default function BowlingScorecard({
  bowlers,
  currentBowlerName,
}) {
  return (
    <div
      className="
        bg-zinc-800
        p-4
        rounded-2xl
        mt-6
      "
    >
      <h2
        className="
          text-2xl
          font-bold
          mb-4
        "
      >
        Bowling Scorecard
      </h2>

      {bowlers.length === 0 ? (
        <p className="text-zinc-400">
          Choose the starting bowler to begin the innings.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr
                className="
                  border-b
                  border-zinc-600
                  text-left
                "
              >
                <th className="pb-3">
                  Bowler
                </th>

                <th>O</th>
                <th>R</th>
                <th>W</th>
                <th>ECO</th>
              </tr>
            </thead>

            <tbody>
              {bowlers.map((bowler) => {
                const economy =
                  bowler.balls > 0
                    ? (
                        bowler.runs /
                        (bowler.balls / 6)
                      ).toFixed(2)
                    : "0.00"

                const isCurrentBowler =
                  bowler.name ===
                  currentBowlerName

                return (
                  <tr
                    key={bowler.name}
                    className="
                      border-b
                      border-zinc-700
                    "
                  >
                    <td
                      className="
                        py-4
                        font-semibold
                      "
                    >
                      {bowler.name}

                      {isCurrentBowler && (
                        <span
                          className="
                            ml-2
                            text-sm
                            text-yellow-400
                          "
                        >
                          live
                        </span>
                      )}
                    </td>

                    <td>
                      {formatOvers(
                        bowler.balls
                      )}
                    </td>

                    <td>{bowler.runs}</td>
                    <td>{bowler.wickets}</td>
                    <td>{economy}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
