export default function BattingScorecard({
  batters,
  currentStriker,
}) {

  return (
    <div className="
      bg-zinc-800
      p-4
      rounded-2xl
      mt-6
    ">

      <h2 className="
        text-2xl
        font-bold
        mb-4
      ">
        Batting Scorecard
      </h2>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="
              border-b
              border-zinc-600
              text-left
            ">

              <th className="pb-3">
                Batter
              </th>

              <th>R</th>

              <th>B</th>

              <th>4s</th>

              <th>6s</th>

              <th>SR</th>

            </tr>

          </thead>

          <tbody>

            {
              batters.map((
                batter,
                index
              ) => {

                const strikeRate =
                  batter.balls > 0
                    ? (
                        (
                          batter.runs /
                          batter.balls
                        ) * 100
                      ).toFixed(1)
                    : "0.0"

                return (

                  <tr
                    key={index}
                    className="
                      border-b
                      border-zinc-700
                    "
                  >

                    <td className="
                      py-4
                      font-semibold
                    ">

                      {batter.name}

                      {
                        currentStriker === index &&
                        (
                          <span className="
                            text-green-400
                            ml-2
                          ">
                            *
                          </span>
                        )
                      }

                    </td>

                    <td>
                      {batter.runs}
                    </td>

                    <td>
                      {batter.balls}
                    </td>

                    <td>
                      {batter.fours || 0}
                    </td>

                    <td>
                      {batter.sixes || 0}
                    </td>

                    <td>
                      {strikeRate}
                    </td>

                  </tr>
                )
              })
            }

          </tbody>

        </table>

      </div>

    </div>
  )
}