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
    wicketFlowOpen,
    setWicketFlowOpen,
  ] = useState(false)

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

  const onlyRunOutAllowed =
    pendingNoBall

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

  useEffect(() => {
    if (disabled) {
      setWicketFlowOpen(false)
    }
  }, [disabled])

  const openWicketFlow = () => {
    setSelectedDismissal(
      onlyRunOutAllowed
        ? "run_out"
        : "bowled"
    )
    setRunOutCompletedRuns(0)
    setRunOutDismissedBatter(
      "striker"
    )
    setWicketFlowOpen(true)
  }

  const closeWicketFlow = () => {
    setWicketFlowOpen(false)
  }

  const confirmWicket = () => {
    addWicket(selectedDismissal, {
      completedRuns:
        runOutCompletedRuns,
      dismissedBatter:
        runOutDismissedBatter,
    })
    setWicketFlowOpen(false)
  }

  const buttonStyle = `
    min-h-[3.25rem]
    p-3
    rounded-xl
    font-bold
    text-lg
    transition-all
    duration-150
    hover:brightness-110
    hover:-translate-y-0.5
    active:translate-y-0
    active:scale-90
    active:brightness-125
    disabled:opacity-40
    disabled:cursor-not-allowed
    disabled:hover:translate-y-0
    disabled:hover:brightness-100
    md:min-h-0
    md:p-5
    md:rounded-2xl
    md:text-xl
  `

  return (
    <div className="mt-4 space-y-3 md:mt-6 md:space-y-4">
      {statusText && (
        <div
          className="
            rounded-2xl
            border
            border-zinc-800
            bg-zinc-900
            p-3
            text-sm
            text-zinc-300
            md:p-4
          "
        >
          {statusText}
        </div>
      )}

      {!wicketFlowOpen ? (
        <div className="animate-pop-in space-y-3">
          {(pendingNoBall ||
            freeHit) && (
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
          )}

          <div
            className="
              grid
              grid-cols-3
              md:grid-cols-4
              gap-2
              md:gap-4
            "
          >
            {[0, 1, 2, 3].map(
              (runs) => (
                <button
                  key={runs}
                  onClick={() =>
                    addRuns(runs)
                  }
                  disabled={
                    disabled
                  }
                  className={`${buttonStyle} bg-zinc-700`}
                >
                  {runs}
                </button>
              )
            )}

            <button
              onClick={() =>
                addRuns(4)
              }
              disabled={disabled}
              className={`${buttonStyle} bg-blue-600`}
            >
              4
            </button>

            <button
              onClick={() =>
                addRuns(6)
              }
              disabled={disabled}
              className={`${buttonStyle} bg-green-600`}
            >
              6
            </button>

            <button
              onClick={addWide}
              disabled={
                disabled ||
                pendingNoBall
              }
              className={`${buttonStyle} bg-yellow-500 text-black`}
            >
              Wide
            </button>

            <button
              onClick={addNoBall}
              disabled={
                disabled ||
                pendingNoBall
              }
              className={`${buttonStyle} bg-purple-600`}
            >
              No Ball
            </button>

            <button
              onClick={
                openWicketFlow
              }
              disabled={disabled}
              className={`${buttonStyle} bg-red-600 col-span-3 md:col-span-4`}
            >
              WICKET
            </button>
          </div>
        </div>
      ) : (
        <div
          className="
            animate-pop-in
            rounded-2xl
            border
            border-red-500/25
            bg-zinc-900
            p-4
            space-y-4
            md:p-5
          "
        >
          <div className="flex items-center justify-between gap-3">
            <div className="text-lg font-black text-red-300 md:text-xl">
              Recording A Wicket
            </div>

            <button
              onClick={
                closeWicketFlow
              }
              className="rounded-full bg-white/[0.06] px-4 py-2 text-sm font-bold text-zinc-300 transition-all hover:bg-white/[0.1] active:scale-95"
            >
              Cancel
            </button>
          </div>

          {onlyRunOutAllowed ? (
            <div className="rounded-2xl bg-purple-500/10 px-4 py-3 text-sm text-purple-200">
              No-ball in effect — only a run out can be given on this delivery.
            </div>
          ) : (
            <div>
              <div className="mb-2 text-sm text-zinc-400">
                How was the batter out?
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
                      key={
                        option.value
                      }
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
                        active:scale-95
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
            </div>
          )}

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
                    active:scale-95
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
                      active:scale-95
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
                        active:scale-95
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
                Example: run out going for the 2nd run means only 1 completed run should be selected.
              </div>
            </div>
          )}

          <button
            onClick={confirmWicket}
            className="w-full rounded-2xl bg-red-600 py-4 text-lg font-black transition-all hover:brightness-110 active:scale-95 md:text-xl"
          >
            Confirm Wicket —{" "}
            {
              selectedDismissalOption.label
            }
            {isRunOut &&
              ` (${runOutDismissedBatter === "non_striker" ? "non-striker" : "striker"} out, ${runOutCompletedRuns} run${runOutCompletedRuns === 1 ? "" : "s"} completed)`}
          </button>
        </div>
      )}
    </div>
  )
}
