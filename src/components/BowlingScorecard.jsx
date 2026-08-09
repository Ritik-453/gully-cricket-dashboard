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
        <div className="-mx-4 overflow-x-auto px-4 md:mx-0 md:px-0">
          <table className="w-full min-w-[380px] text-sm md:text-base">
            <thead>
              <tr
                className="
                  border-b
                  border-zinc-600
                  text-left
                "
              >
                <th className="pb-3 pr-2">
                  Bowler
                </th>

                <th className="px-2 text-right">O</th>
                <th className="px-2 text-right">R</th>
                <th className="px-2 text-right">W</th>
                <th className="pl-2 text-right">ECO</th>
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
                        py-3
                        pr-2
                        font-semibold
                        md:py-4
                      "
                    >
                      {bowler.name}

                      {isCurrentBowler && (
                        <span
                          className="
                            ml-2
                            text-xs
                            text-yellow-400
                            md:text-sm
                          "
                        >
                          live
                        </span>
                      )}
                    </td>

                    <td className="px-2 text-right">
                      {formatOvers(
                        bowler.balls
                      )}
                    </td>

                    <td className="px-2 text-right">{bowler.runs}</td>
                    <td className="px-2 text-right">{bowler.wickets}</td>
                    <td className="pl-2 text-right">{economy}</td>
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
