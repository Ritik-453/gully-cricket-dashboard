export default function ScoreBoard({
  score,
  wickets,
  overs,
  freeHit,
  teamA,
  innings,
  target,
  winner,
}) {

  return (
    <div className="bg-zinc-800 p-6 rounded-2xl shadow-xl mt-6">

      <h2 className="text-3xl font-bold">
        {teamA?.teamName || "Select Team"}
      </h2>

      <div className="mt-4 text-5xl font-extrabold">
        {score}/{wickets}
      </div>

      <div className="mt-2 text-lg text-gray-300">
        Overs: {overs}
      </div>

      <div className="mt-3 text-lg">
        Innings: {innings}
      </div>

      {
        target && (
          <div className="mt-2 text-yellow-400 text-lg">
            Target: {target}
          </div>
        )
      }

      {
        freeHit && (
          <div className="mt-3 text-yellow-400 text-2xl font-bold">
            FREE HIT
          </div>
        )
      }

      {
        winner && (
          <div className="mt-4 text-2xl text-green-400 font-bold">
            {winner}
          </div>
        )
      }

    </div>
  )
}