export default function ScoreBoard({
  score,
  wickets,
  overs,
  freeHit,
  teamA,
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
        {
    freeHit && (
      <div className="mt-3 text-yellow-400 text-xl font-bold">
        FREE HIT
      </div>
    )
  }
      </div>
    </div>
  )
}