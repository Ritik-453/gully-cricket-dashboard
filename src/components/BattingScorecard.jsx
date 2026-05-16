export default function BattingScorecard({
  batters,
  currentStriker,
}) {

  return (
    <div className="bg-zinc-800 p-4 rounded-2xl mt-6">

      <h2 className="text-2xl font-bold mb-4">
        Batting Scorecard
      </h2>

      <table className="w-full">

        <thead>
          <tr className="text-left border-b border-zinc-600">
            <th className="pb-2">Batter</th>
            <th>R</th>
            <th>B</th>
            <th>SR</th>
          </tr>
        </thead>

        <tbody>

          {
            batters.map((batter, index) => {

              const strikeRate =
                batter.balls > 0
                  ? (
                      (batter.runs /
                        batter.balls) *
                      100
                    ).toFixed(1)
                  : 0

              return (
                <tr
                  key={index}
                  className="border-b border-zinc-700"
                >

                  <td className="py-3">

                    {batter.name}

                    {
                      currentStriker === index &&
                      " *"
                    }

                  </td>

                  <td>{batter.runs}</td>

                  <td>{batter.balls}</td>

                  <td>{strikeRate}</td>

                </tr>
              )
            })
          }

        </tbody>

      </table>

    </div>
  )
}