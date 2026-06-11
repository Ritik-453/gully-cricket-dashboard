import {
  formatOversFromBalls,
  getMatchInsights,
} from "../utils/matchInsights"

const getBarWidth = (
  value,
  maxValue
) => {
  if (value <= 0) {
    return "0%"
  }

  if (maxValue <= 0) {
    return "0%"
  }

  return `${Math.max(
    (value / maxValue) * 100,
    8
  )}%`
}

export default function MatchOverview({
  match,
  title = "Match Insights",
}) {
  const insights =
    getMatchInsights(match)

  const topScorerLabel =
    insights.topScorer
      ? `${insights.topScorer.runs} (${insights.topScorer.balls})`
      : "No batter yet"

  const bestBowlerLabel =
    insights.bestBowler
      ? `${insights.bestBowler.wickets}/${insights.bestBowler.runs}`
      : "No figures yet"

  const bestBowlerOvers =
    insights.bestBowler
      ? formatOversFromBalls(
          insights.bestBowler.balls
        )
      : "0.0"

  const maxOverRuns = Math.max(
    ...insights.progression.map(
      (over) => over.runs
    ),
    1
  )

  const maxPartnershipRuns =
    Math.max(
      ...insights.partnerships.map(
        (partnership) =>
          partnership.runs
      ),
      1
    )

  return (
    <div
      className="
        rounded-2xl
        bg-zinc-800
        p-4
        mt-6
        space-y-6
      "
    >
      <div
        className="
          flex
          flex-col
          gap-3
          md:flex-row
          md:items-end
          md:justify-between
        "
      >
        <div>
          <h2
            className="
              text-2xl
              font-bold
            "
          >
            {title}
          </h2>

          <p className="mt-2 text-sm text-zinc-400">
            Partnerships, top performers, and scoring momentum from the current innings.
          </p>
        </div>

        <div className="rounded-full bg-black/50 px-4 py-2 text-sm font-semibold text-zinc-300">
          CRR {insights.currentRunRate}
        </div>
      </div>

      <div
        className="
          grid
          gap-3
          md:grid-cols-2
          xl:grid-cols-4
        "
      >
        <div className="rounded-2xl bg-black/40 p-4">
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
            Boundary Runs
          </div>

          <div className="mt-3 text-3xl font-black">
            {insights.boundaryRuns}
          </div>

          <div className="mt-2 text-sm text-zinc-400">
            {insights.boundaries} boundaries landed
          </div>
        </div>

        <div className="rounded-2xl bg-black/40 p-4">
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
            Extras
          </div>

          <div className="mt-3 text-3xl font-black">
            {insights.extras.wides + insights.extras.noBalls}
          </div>

          <div className="mt-2 text-sm text-zinc-400">
            Wd {insights.extras.wides} • Nb {insights.extras.noBalls}
          </div>
        </div>

        <div className="rounded-2xl bg-black/40 p-4">
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
            Scoreless Balls
          </div>

          <div className="mt-3 text-3xl font-black">
            {insights.scorelessBalls}
          </div>

          <div className="mt-2 text-sm text-zinc-400">
            Legal balls with no runs
          </div>
        </div>

        <div className="rounded-2xl bg-black/40 p-4">
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
            Highest Stand
          </div>

          <div className="mt-3 text-3xl font-black">
            {insights.highestPartnership.runs}
          </div>

          <div className="mt-2 text-sm text-zinc-400">
            {insights.highestPartnership.batters?.join(" & ") || "Waiting for batters"}
          </div>
        </div>
      </div>

      <div
        className="
          grid
          gap-6
          xl:grid-cols-[1.05fr_1.25fr]
        "
      >
        <div className="space-y-6">
          <div className="rounded-2xl bg-black/40 p-4 space-y-4">
            <div className="text-lg font-bold">
              Top Performers
            </div>

            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-1">
              <div className="rounded-xl bg-zinc-900 p-4">
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
                  Top Scorer
                </div>

                <div className="mt-3 text-xl font-black">
                  {insights.topScorer?.name || "Pending"}
                </div>

                <div className="mt-1 text-sm text-zinc-400">
                  {insights.topScorer
                    ? topScorerLabel
                    : "Waiting for batting data"}
                </div>
              </div>

              <div className="rounded-xl bg-zinc-900 p-4">
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
                  Best Bowler
                </div>

                <div className="mt-3 text-xl font-black">
                  {insights.bestBowler?.name || "Pending"}
                </div>

                <div className="mt-1 text-sm text-zinc-400">
                  {insights.bestBowler
                    ? `${bestBowlerLabel} in ${bestBowlerOvers} ov`
                    : bestBowlerLabel}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-black/40 p-4 space-y-4">
            <div className="flex items-center justify-between gap-3">
              <div className="text-lg font-bold">
                Over Pulse
              </div>

              <div className="text-sm text-zinc-400">
                Best over: {insights.highestOver.overNumber || "-"} ({insights.highestOver.runs} runs)
              </div>
            </div>

            {insights.progression.length === 0 ? (
              <div className="rounded-xl bg-zinc-900 p-4 text-sm text-zinc-400">
                Over progression will appear as soon as deliveries are recorded.
              </div>
            ) : (
              <div className="max-h-72 space-y-3 overflow-y-auto pr-2">
                {insights.progression.map(
                  (over) => (
                    <div
                      key={over.overIndex}
                      className="rounded-xl bg-zinc-900 p-4"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <div className="font-bold">
                            Over {over.overNumber}
                          </div>

                          <div className="text-sm text-zinc-400">
                            {over.scoreAfter}/{over.wicketsAfter} after {over.oversAfter} ov
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="text-xl font-black">
                            {over.runs}
                          </div>

                          <div className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                            Runs
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 h-2 overflow-hidden rounded-full bg-zinc-800">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400"
                          style={{
                            width:
                              getBarWidth(
                                over.runs,
                                maxOverRuns
                              ),
                          }}
                        />
                      </div>

                      <div className="mt-3 text-xs text-zinc-500">
                        {over.wickets > 0
                          ? `${over.wickets} wicket${over.wickets === 1 ? "" : "s"} in the over`
                          : "No wicket in this over"}
                      </div>
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        </div>

        <div className="rounded-2xl bg-black/40 p-4 space-y-4">
          <div className="flex items-center justify-between gap-3">
            <div className="text-lg font-bold">
              Partnership Board
            </div>

            <div className="text-sm text-zinc-400">
              {insights.score}/{insights.wickets} in {insights.overs}
            </div>
          </div>

          {insights.partnerships.length === 0 ? (
            <div className="rounded-xl bg-zinc-900 p-4 text-sm text-zinc-400">
              Partnership tracking will appear once the innings begins.
            </div>
          ) : (
            <div className="max-h-[28rem] space-y-3 overflow-y-auto pr-2">
              {insights.partnerships.map(
                (
                  partnership,
                  index
                ) => (
                  <div
                    key={`${partnership.label}-${index}`}
                    className="rounded-xl bg-zinc-900 p-4"
                  >
                    <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <div className="text-sm font-bold uppercase tracking-[0.2em] text-zinc-500">
                            {partnership.label}
                          </div>

                          <span
                            className={`
                              rounded-full
                              px-2
                              py-1
                              text-[11px]
                              font-bold
                              uppercase
                              tracking-wide
                              ${
                                partnership.status === "live"
                                  ? "bg-emerald-600/20 text-emerald-300"
                                  : "bg-zinc-800 text-zinc-400"
                              }
                            `}
                          >
                            {partnership.status === "live"
                              ? "Live"
                              : partnership.status === "closed"
                                ? "Closed"
                                : "Broken"}
                          </span>
                        </div>

                        <div className="text-lg font-bold">
                          {partnership.batters.join(" & ")}
                        </div>

                        <div className="text-sm text-zinc-400">
                          {partnership.status === "live"
                            ? `Still batting at ${partnership.endedAt} ov`
                            : `Ended at ${partnership.endedAt} ov${partnership.endedBy ? ` • ${partnership.endedBy}` : ""}`}
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-3xl font-black">
                          {partnership.runs}
                        </div>

                        <div className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                          Runs
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-zinc-800">
                      <div
                        className={`h-full rounded-full ${
                          partnership.status === "live"
                            ? "bg-gradient-to-r from-emerald-400 to-lime-300"
                            : "bg-gradient-to-r from-blue-400 to-cyan-300"
                        }`}
                        style={{
                          width:
                            getBarWidth(
                              partnership.runs,
                              maxPartnershipRuns
                            ),
                        }}
                      />
                    </div>
                  </div>
                )
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
