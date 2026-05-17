export default function MatchControls({
  addRuns,
  addWicket,
  addWide,
  addNoBall,
  matchEnded,
}) {
  return (
    <div className="mt-6">
      <div className="grid grid-cols-4 gap-4">

        <button
          disabled={matchEnded}
          onClick={() => addRuns(0)}
          className="bg-zinc-800 p-4 rounded-xl"
        >
          0
        </button>

        <button
          disabled={matchEnded}
          onClick={() => addRuns(1)}
          className="bg-zinc-800 p-4 rounded-xl"
        >
          1
        </button>

        <button
          disabled={matchEnded}
          onClick={() => addRuns(2)}
          className="bg-zinc-800 p-4 rounded-xl"
        >
          2
        </button>

        <button
          disabled={matchEnded}
          onClick={() => addRuns(4)}
          className="bg-blue-600 p-4 rounded-xl"
        >
          4
        </button>

        <button
          disabled={matchEnded}
          onClick={() => addRuns(6)}
          className="bg-green-600 p-4 rounded-xl"
        >
          6
        </button>

        <button
          disabled={matchEnded}
          onClick={addWicket}
          className="bg-red-600 p-4 rounded-xl"
        >
          Wicket
        </button>

        <button
          disabled={matchEnded}
          onClick={addWide}
          className="bg-yellow-500 p-4 rounded-xl"
        >
          Wide
        </button>

        <button
          disabled={matchEnded}
          onClick={addNoBall}
          className="bg-purple-600 p-4 rounded-xl"
        >
          No Ball
        </button>

      </div>
    </div>
  )
}