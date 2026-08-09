export default function BattingScorecard({
  activeBatters,
  batters,
  strikerName,
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
        Batting Scorecard
      </h2>

      {batters.length === 0 ? (
        <p className="text-zinc-400">
          Choose the opening batters to start the innings.
        </p>
      ) : (
        <div className="-mx-4 overflow-x-auto px-4 md:mx-0 md:px-0">
          <table className="w-full min-w-[420px] text-sm md:text-base">
            <thead>
              <tr
                className="
                  border-b
                  border-zinc-600
                  text-left
                "
              >
                <th className="pb-3 pr-2">
                  Batter
                </th>

                <th className="px-2 text-right">R</th>
                <th className="px-2 text-right">B</th>
                <th className="px-2 text-right">4s</th>
                <th className="px-2 text-right">6s</th>
                <th className="pl-2 text-right">SR</th>
              </tr>
            </thead>

            <tbody>
              {batters.map((batter) => {
                const strikeRate =
                  batter.balls > 0
                    ? (
                        (batter.runs /
                          batter.balls) *
                        100
                      ).toFixed(1)
                    : "0.0"

                const isStriker =
                  batter.name ===
                  strikerName

                const isNotOut =
                  activeBatters.includes(
                    batter.name
                  )

                return (
                  <tr
                    key={batter.name}
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
                      {batter.name}

                      {isStriker && (
                        <span
                          className="
                            text-green-400
                            ml-2
                          "
                        >
                          *
                        </span>
                      )}

                      {!isStriker &&
                        isNotOut && (
                          <span
                            className="
                              text-zinc-400
                              ml-2
                              text-xs
                              md:text-sm
                            "
                          >
                            not out
                          </span>
                        )}
                    </td>

                    <td className="px-2 text-right">{batter.runs}</td>
                    <td className="px-2 text-right">{batter.balls}</td>
                    <td className="px-2 text-right">{batter.fours}</td>
                    <td className="px-2 text-right">{batter.sixes}</td>
                    <td className="pl-2 text-right">{strikeRate}</td>
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
