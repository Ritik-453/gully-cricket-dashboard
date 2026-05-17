export default function MatchControls({
  addRuns,
  addWicket,
  addWide,
  addNoBall,
}) {

  const buttonStyle = `
    p-5
    rounded-2xl
    font-bold
    text-xl
    active:scale-95
    transition-all
  `

  return (
    <div className="mt-6">

      <div
        className="
          grid
          grid-cols-2
          md:grid-cols-4
          gap-4
        "
      >

        <button
          onClick={() => addRuns(0)}
          className={`${buttonStyle} bg-zinc-700`}
        >
          0
        </button>

        <button
          onClick={() => addRuns(1)}
          className={`${buttonStyle} bg-zinc-700`}
        >
          1
        </button>

        <button
          onClick={() => addRuns(2)}
          className={`${buttonStyle} bg-zinc-700`}
        >
          2
        </button>

        <button
          onClick={() => addRuns(3)}
          className={`${buttonStyle} bg-zinc-700`}
        >
          3
        </button>

        <button
          onClick={() => addRuns(4)}
          className={`${buttonStyle} bg-blue-600`}
        >
          4
        </button>

        <button
          onClick={() => addRuns(6)}
          className={`${buttonStyle} bg-green-600`}
        >
          6
        </button>

        <button
          onClick={addWide}
          className={`${buttonStyle} bg-yellow-500`}
        >
          Wide
        </button>

        <button
          onClick={addNoBall}
          className={`${buttonStyle} bg-purple-600`}
        >
          No Ball
        </button>

        <button
          onClick={addWicket}
          className={`${buttonStyle} bg-red-600 col-span-2 md:col-span-4`}
        >
          WICKET
        </button>

      </div>

    </div>
  )
}