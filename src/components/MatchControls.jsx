export default function MatchControls({
  addNoBall,
  addRuns,
  addWide,
  addWicket,
  disabled,
  pendingNoBall,
  statusText,
}) {
  const buttonStyle = `
    p-5
    rounded-2xl
    font-bold
    text-xl
    transition-all
    disabled:opacity-40
    disabled:cursor-not-allowed
  `

  return (
    <div className="mt-6 space-y-4">
      {statusText && (
        <div
          className="
            rounded-2xl
            border
            border-zinc-800
            bg-zinc-900
            p-4
            text-sm
            text-zinc-300
          "
        >
          {statusText}
        </div>
      )}

      <div
        className="
          grid
          grid-cols-2
          md:grid-cols-4
          gap-4
        "
      >
        {[0, 1, 2, 3].map((runs) => (
          <button
            key={runs}
            onClick={() =>
              addRuns(runs)
            }
            disabled={disabled}
            className={`${buttonStyle} bg-zinc-700`}
          >
            {runs}
          </button>
        ))}

        <button
          onClick={() => addRuns(4)}
          disabled={disabled}
          className={`${buttonStyle} bg-blue-600`}
        >
          4
        </button>

        <button
          onClick={() => addRuns(6)}
          disabled={disabled}
          className={`${buttonStyle} bg-green-600`}
        >
          6
        </button>

        <button
          onClick={addWide}
          disabled={
            disabled || pendingNoBall
          }
          className={`${buttonStyle} bg-yellow-500 text-black`}
        >
          Wide
        </button>

        <button
          onClick={addNoBall}
          disabled={
            disabled || pendingNoBall
          }
          className={`${buttonStyle} bg-purple-600`}
        >
          No Ball
        </button>

        <button
          onClick={addWicket}
          disabled={
            disabled || pendingNoBall
          }
          className={`${buttonStyle} bg-red-600 col-span-2 md:col-span-4`}
        >
          WICKET
        </button>
      </div>
    </div>
  )
}
