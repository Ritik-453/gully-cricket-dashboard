export default function BowlingScorecard({
  bowler,
}) {

  // OVERS FORMAT
  const overs =
    `${Math.floor(bowler.balls / 6)}.${bowler.balls % 6}`

  // ECONOMY
  const economy =
    bowler.balls > 0
      ? (
          bowler.runs /
          (bowler.balls / 6)
        ).toFixed(2)
      : "0.00"

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
        Bowling Scorecard
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
                Bowler
              </th>

              <th>O</th>

              <th>R</th>

              <th>W</th>

              <th>ECO</th>

            </tr>

          </thead>

          <tbody>

            <tr className="
              border-b
              border-zinc-700
            ">

              <td className="
                py-4
                font-semibold
              ">
                {bowler.name}
              </td>

              <td>
                {overs}
              </td>

              <td>
                {bowler.runs}
              </td>

              <td>
                {bowler.wickets}
              </td>

              <td>
                {economy}
              </td>

            </tr>

          </tbody>

        </table>

      </div>

    </div>
  )
}