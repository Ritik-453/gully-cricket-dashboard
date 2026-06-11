import {
  useEffect,
  useState,
} from "react"

const DISMISSAL_OPTIONS = [
  {
    value: "bowled",
    label: "Bowled",
  },
  {
    value: "caught",
    label: "Caught",
  },
  {
    value: "lbw",
    label: "LBW",
  },
  {
    value: "stumped",
    label: "Stumped",
  },
  {
    value: "run_out",
    label: "Run Out",
  },
]

const RUN_OUT_OPTIONS = [
  0,
  1,
  2,
  3,
  4,
]

export default function MatchControls({
  activeBatters,
  addNoBall,
  addRuns,
  addWide,
  addWicket,
  disabled,
  freeHit,
  pendingNoBall,
  statusText,
  strikerName,
}) {
  const [
    selectedDismissal,
    setSelectedDismissal,
  ] = useState("bowled")

  const [
    runOutCompletedRuns,
    setRunOutCompletedRuns,
  ] = useState(0)

  const [
    runOutDismissedBatter,
    setRunOutDismissedBatter,
  ] = useState("striker")

  const selectedDismissalOption =
    DISMISSAL_OPTIONS.find(
      (option) =>
        option.value ===
        selectedDismissal
    ) || DISMISSAL_OPTIONS[0]

  const isRunOut =
    selectedDismissal === "run_out"

  const nonStrikerName =
    activeBatters.find(
      (name) =>
        name !== strikerName
    ) || ""

  useEffect(() => {
    if (
      !nonStrikerName &&
      runOutDismissedBatter ===
        "non_striker"
    ) {
      setRunOutDismissedBatter(
        "striker"
      )
    }
  }, [
    nonStrikerName,
    runOutDismissedBatter,
  ])

  const wicketDisabled =
    disabled ||
    (
      pendingNoBall &&
      !isRunOut
    )

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
          rounded-2xl
          border
          border-zinc-800
          bg-zinc-900
          p-4
          space-y-4
        "
      >
        <div
          className="
            flex
            flex-col
            gap-2
            md:flex-row
            md:items-center
            md:justify-between
          "
        >
          <div>
            <div className="text-sm text-zinc-400">
              Dismissal Type
            </div>

            <div className="text-lg font-bold">
              {
                selectedDismissalOption.label
              }
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {pendingNoBall && (
              <div className="rounded-full bg-purple-500/20 px-3 py-1 text-xs font-bold uppercase tracking-wide text-purple-300">
                No ball pending
              </div>
            )}

            {freeHit && (
              <div className="rounded-full bg-yellow-500/20 px-3 py-1 text-xs font-bold uppercase tracking-wide text-yellow-300">
                Free hit active
              </div>
            )}
          </div>
        </div>

        <div
          className="
            grid
            grid-cols-2
            gap-2
            md:grid-cols-5
          "
        >
          {DISMISSAL_OPTIONS.map(
            (option) => (
              <button
                key={option.value}
                onClick={() =>
                  setSelectedDismissal(
                    option.value
                  )
                }
                className={`
                  rounded-xl
                  px-3
                  py-3
                  text-sm
                  font-semibold
                  transition-all
                  ${
                    selectedDismissal ===
                    option.value
                      ? "bg-red-600 text-white"
                      : "bg-black text-zinc-300 hover:bg-zinc-800"
                  }
                `}
              >
                {option.label}
              </button>
            )
          )}
        </div>

        {isRunOut && (
          <div
            className="
              rounded-2xl
              bg-black/50
              p-4
              space-y-3
            "
          >
            <div className="text-sm text-zinc-400">
              Who is out?
            </div>

            <div
              className={`
                grid
                gap-2
                ${
                  nonStrikerName
                    ? "grid-cols-2"
                    : "grid-cols-1"
                }
              `}
            >
              <button
                onClick={() =>
                  setRunOutDismissedBatter(
                    "striker"
                  )
                }
                className={`
                  rounded-xl
                  px-3
                  py-3
                  text-left
                  transition-all
                  ${
                    runOutDismissedBatter ===
                    "striker"
                      ? "bg-red-600 text-white"
                      : "bg-zinc-800 text-zinc-200 hover:bg-zinc-700"
                  }
                `}
              >
                <div className="font-bold">
                  {strikerName ||
                    "Current striker"}
                </div>

                <div className="text-xs uppercase tracking-wide opacity-80">
                  Striker
                </div>
              </button>

              {nonStrikerName && (
                <button
                  onClick={() =>
                    setRunOutDismissedBatter(
                      "non_striker"
                    )
                  }
                  className={`
                    rounded-xl
                    px-3
                    py-3
                    text-left
                    transition-all
                    ${
                      runOutDismissedBatter ===
                      "non_striker"
                        ? "bg-red-600 text-white"
                        : "bg-zinc-800 text-zinc-200 hover:bg-zinc-700"
                    }
                  `}
                >
                  <div className="font-bold">
                    {
                      nonStrikerName
                    }
                  </div>

                  <div className="text-xs uppercase tracking-wide opacity-80">
                    Non-striker
                  </div>
                </button>
              )}
            </div>

            <div className="text-sm text-zinc-400">
              Completed runs before the wicket
            </div>

            <div className="grid grid-cols-5 gap-2">
              {RUN_OUT_OPTIONS.map(
                (runs) => (
                  <button
                    key={runs}
                    onClick={() =>
                      setRunOutCompletedRuns(
                        runs
                      )
                    }
                    className={`
                      rounded-xl
                      px-3
                      py-3
                      text-sm
                      font-bold
                      transition-all
                      ${
                        runOutCompletedRuns ===
                        runs
                          ? "bg-emerald-500 text-black"
                          : "bg-zinc-800 text-zinc-200 hover:bg-zinc-700"
                      }
                    `}
                  >
                    {runs}
                  </button>
                )
              )}
            </div>

            <div className="text-xs leading-6 text-zinc-400">
              Choose the dismissed batter, then set the runs already completed before the wicket. Example: run out on the 2nd run means only 1 completed run should be selected.
            </div>
          </div>
        )}
      </div>

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
          onClick={() =>
            addWicket(
              selectedDismissal,
              {
                completedRuns:
                  runOutCompletedRuns,
                dismissedBatter:
                  runOutDismissedBatter,
              }
            )
          }
          disabled={wicketDisabled}
          className={`${buttonStyle} bg-red-600 col-span-2 md:col-span-4`}
        >
          WICKET -{" "}
          {
            selectedDismissalOption.label
          }
          {isRunOut &&
            ` - ${runOutDismissedBatter === "non_striker" ? "non-striker" : "striker"} out - ${runOutCompletedRuns} run${runOutCompletedRuns === 1 ? "" : "s"} completed`}
        </button>
      </div>
    </div>
  )
}
