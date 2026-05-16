export default function ScoreBoard() {
  return (
    <div className="bg-zinc-800 p-6 rounded-2xl shadow-xl mt-6">
      <h2 className="text-3xl font-bold">
        Thunder Warriors
      </h2>

      <div className="mt-4 text-5xl font-extrabold">
        124/5
      </div>

      <div className="mt-2 text-lg text-gray-300">
        Overs: 14.3
      </div>

      <div className="mt-2 text-green-400">
        CRR: 8.55
      </div>
    </div>
  )
}