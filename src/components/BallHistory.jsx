export default function BallHistory({
  history,
}) {
  const wicketLabels = [
    "W",
    "B",
    "C",
    "LBW",
    "ST",
    "RO",
  ]

  const isWicketLabel = (label) =>
    wicketLabels.some(
      (wicketCode) =>
        label === wicketCode ||
        label.startsWith(
          `${wicketCode}(`
        )
    )

  const overs = history.reduce(
    (
      groupedOvers,
      entry,
      index
    ) => {
      const isObjectEntry =
        typeof entry === "object" &&
        entry !== null

      const overIndex =
        isObjectEntry &&
        typeof entry.over ===
          "number"
          ? entry.over
          : Math.floor(index / 6)

      const label =
        isObjectEntry
          ? entry.label
          : entry

      if (
        !groupedOvers[overIndex]
      ) {
        groupedOvers[overIndex] = []
      }

      groupedOvers[overIndex].push(
        label
      )

      return groupedOvers
    },
    []
  )

  const getBallStyle = (ball) => {
    const label = String(ball)

    if (label === "Wd") {
      return "bg-yellow-500 text-black"
    }

    if (label.startsWith("Nb")) {
      return "bg-purple-600"
    }

    if (isWicketLabel(label)) {
      return "bg-red-600"
    }

    if (label === "4") {
      return "bg-blue-600"
    }

    if (label === "6") {
      return "bg-green-600"
    }

    return "bg-zinc-700"
  }

  return (
    <div
      className="
        bg-zinc-800
        p-4
        rounded-2xl
        mt-6
      "
    >
      <h2
        className="
          text-2xl
          font-bold
          mb-4
        "
      >
        Ball History
      </h2>

      <div
        className="
          max-h-64
          overflow-y-auto
          space-y-4
          pr-2
        "
      >
        {overs.length === 0 ? (
          <p className="text-zinc-400">
            No Balls Yet
          </p>
        ) : (
          overs.map((over, overIndex) => (
            <div
              key={overIndex}
              className="space-y-2"
            >
              <div
                className="
                  text-sm
                  text-zinc-400
                  font-semibold
                "
              >
                Over {overIndex + 1}
              </div>

              <div
                className="
                  flex
                  flex-wrap
                  gap-2
                "
              >
                {over.map(
                  (
                    ball,
                    ballIndex
                  ) => (
                    <div
                      key={ballIndex}
                      className={`
                        min-w-10
                        h-10
                        px-2
                        rounded-full
                        flex
                        items-center
                        justify-center
                        font-bold
                        text-sm
                        ${getBallStyle(ball)}
                      `}
                    >
                      {ball}
                    </div>
                  )
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
