export default function BowlingScorecard({
  bowler,
}) {

  const overs =
    `${Math.floor(bowler.balls / 6)}.${bowler.balls % 6}`

  const economy =
    bowler.balls > 0
      ? (
          bowler.runs /
          (bowler.balls / 6)
        ).toFixed(2)
      : 0

  return (
    <div className="bg-zinc-800 p-4 rounded-2xl mt-6">

      <h2 className="text-2xl font-bold mb-4">
        Bowling Figures
      </h2>

      <table className="w-full">

        <thead>
          <tr className="text-left border-b border-zinc-600">

            <th className="pb-2">Bowler</th>
            <th>O</th>
            <th>R</th>
            <th>W</th>
            <th>ECO</th>

          </tr>
        </thead>

        <tbody>

          <tr>

            <td className="py-3">
              {bowler.name}
            </td>

            <td>{overs}</td>

            <td>{bowler.runs}</td>

            <td>{bowler.wickets}</td>

            <td>{economy}</td>

          </tr>

        </tbody>

      </table>

    </div>
  )
}