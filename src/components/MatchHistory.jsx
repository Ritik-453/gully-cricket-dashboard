import { useState } from "react"

import ExtrasCard from "./ExtrasCard"
import BattingScorecard from "./BattingScorecard"
import BowlingScorecard from "./BowlingScorecard"
import BallHistory from "./BallHistory"
import FallOfWickets from "./FallOfWickets"

const DEFAULT_EXTRAS = {
  wides: 0,
  noBalls: 0,
}

const formatMatchDate = (createdAt) => {
  if (!createdAt) {
    return "Unknown date"
  }

  const parsedDate = new Date(createdAt)

  if (Number.isNaN(parsedDate.getTime())) {
    return "Unknown date"
  }

  return parsedDate.toLocaleString()
}

export default function MatchHistory({
  currentUser,
  emptyStateMessage = "No Matches Yet",
  matches,
}) {
  const [
    expandedMatchId,
    setExpandedMatchId,
  ] = useState(null)

  return (
    <div className="bg-zinc-900 p-6 rounded-2xl mt-6">
      <h2 className="text-2xl font-bold mb-6">
        Match History
      </h2>

      {matches.length === 0 ? (
        <p>{emptyStateMessage}</p>
      ) : (
        <div className="space-y-4">
          {matches.map((match) => {
            const isExpanded =
              expandedMatchId ===
              match.id

            const isOwnedMatch =
              Boolean(
                currentUser?.id &&
                  match.createdById ===
                    currentUser.id
              )

            const scorerLabel =
              match.createdByName ||
              "Guest scorer"

            const hasSavedScoreboard =
              Array.isArray(
                match.batters
              ) ||
              Array.isArray(
                match.bowlers
              ) ||
              Array.isArray(
                match.history
              )

            return (
              <div
                key={match.id}
                className="bg-black p-4 rounded-xl"
              >
                <div
                  className="
                    flex
                    flex-col
                    gap-4
                    md:flex-row
                    md:items-start
                    md:justify-between
                  "
                >
                  <div className="space-y-2">
                    <div className="text-xl font-bold">
                      {match.teamA}
                      {" vs "}
                      {match.teamB}
                    </div>

                    <div>
                      Score:
                      {" "}
                      {match.score}
                    </div>

                    <div>
                      Overs:
                      {" "}
                      {match.overs}
                    </div>

                    {match.target && (
                      <div>
                        Target:
                        {" "}
                        {match.target}
                      </div>
                    )}

                    <div className="text-zinc-400 text-sm">
                      {formatMatchDate(
                        match.createdAt
                      )}
                    </div>

                    <div className="text-sm text-zinc-400">
                      Scored by:
                      {" "}
                      <span className="font-semibold text-zinc-200">
                        {scorerLabel}
                      </span>

                      {isOwnedMatch && (
                        <span className="ml-2 rounded-full bg-emerald-600/20 px-2 py-1 text-[11px] font-bold uppercase tracking-wide text-emerald-300">
                          Yours
                        </span>
                      )}
                    </div>

                    <div className="text-green-400">
                      {match.winner}
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      setExpandedMatchId(
                        isExpanded
                          ? null
                          : match.id
                      )
                    }
                    className="
                      rounded-xl
                      bg-zinc-800
                      px-4
                      py-2
                      font-semibold
                      hover:bg-zinc-700
                      transition-all
                    "
                  >
                    {isExpanded
                      ? "Hide Scoreboard"
                      : "View Scoreboard"}
                  </button>
                </div>

                {isExpanded && (
                  <div className="mt-6 space-y-6">
                    {hasSavedScoreboard ? (
                      <>
                        <div
                          className="
                            grid
                            grid-cols-2
                            md:grid-cols-4
                            gap-3
                          "
                        >
                          <div className="rounded-2xl bg-zinc-800 p-4">
                            <div className="text-zinc-400 text-sm">
                              Score
                            </div>

                            <div className="mt-2 text-2xl font-bold">
                              {match.score}
                            </div>
                          </div>

                          <div className="rounded-2xl bg-zinc-800 p-4">
                            <div className="text-zinc-400 text-sm">
                              Overs
                            </div>

                            <div className="mt-2 text-2xl font-bold">
                              {match.overs}
                            </div>
                          </div>

                          <div className="rounded-2xl bg-zinc-800 p-4">
                            <div className="text-zinc-400 text-sm">
                              Innings
                            </div>

                            <div className="mt-2 text-2xl font-bold">
                              {match.innings || "-"}
                            </div>
                          </div>

                          <div className="rounded-2xl bg-zinc-800 p-4">
                            <div className="text-zinc-400 text-sm">
                              Target
                            </div>

                            <div className="mt-2 text-2xl font-bold">
                              {match.target || "-"}
                            </div>
                          </div>
                        </div>

                        <ExtrasCard
                          extras={
                            match.extras ||
                            DEFAULT_EXTRAS
                          }
                        />

                        <div
                          className="
                            grid
                            grid-cols-1
                            xl:grid-cols-2
                            gap-6
                          "
                        >
                          <BattingScorecard
                            activeBatters={[]}
                            batters={
                              match.batters ||
                              []
                            }
                            strikerName=""
                          />

                          <BowlingScorecard
                            bowlers={
                              match.bowlers ||
                              []
                            }
                            currentBowlerName=""
                          />
                        </div>

                        <div
                          className="
                            grid
                            grid-cols-1
                            xl:grid-cols-2
                            gap-6
                          "
                        >
                          <BallHistory
                            history={
                              match.history ||
                              []
                            }
                          />

                          <FallOfWickets
                            fallOfWickets={
                              match.fallOfWickets ||
                              []
                            }
                          />
                        </div>
                      </>
                    ) : (
                      <div className="rounded-2xl bg-zinc-800 p-4 text-zinc-300">
                        This older match does not have a saved scoreboard yet.
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
