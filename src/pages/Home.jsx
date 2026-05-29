import { useState } from "react"
import { Link } from "react-router-dom"

const HOME_PANELS = {
  live: {
    title: "Live Match Engine",
    description:
      "Score every ball with extras, free-hit flow, live wicket types, and over-by-over momentum.",
    accent:
      "from-emerald-500/20 to-cyan-500/10",
    statLabel: "Live controls",
    statValue: "Ball-by-ball",
    bullets: [
      "Run rate, chase pressure, and free-hit alerts stay visible.",
      "Bowler rotation and next-batter flow are built into the scorer path.",
      "Dismissal types now separate run out from bowler-earned wickets.",
    ],
  },
  teams: {
    title: "Team Room",
    description:
      "Build squads, assign captains, and keep ownership tied to the signed-in scorer account.",
    accent:
      "from-blue-500/20 to-indigo-500/10",
    statLabel: "Ownership",
    statValue: "Account locked",
    bullets: [
      "Only the owner account can edit or delete its teams.",
      "Legacy or other-user teams stay visible in read-only mode.",
      "Teams flow straight into match setup without retyping players.",
    ],
  },
  archive: {
    title: "Match Archive",
    description:
      "Search past matches, expand saved scoreboards, and separate your own scoring history from the public archive.",
    accent:
      "from-amber-500/20 to-rose-500/10",
    statLabel: "Scoreboards",
    statValue: "Expandable",
    bullets: [
      "My Matches highlights entries scored by your signed-in account.",
      "Past scoreboards include batting, bowling, extras, and fall of wickets.",
      "Search works across teams and scorer names for quick recall.",
    ],
  },
}

const formatMatchDate = (createdAt) => {
  if (!createdAt) {
    return "Unknown date"
  }

  const parsedDate = new Date(createdAt)

  if (Number.isNaN(parsedDate.getTime())) {
    return "Unknown date"
  }

  return parsedDate.toLocaleDateString()
}

export default function Home({
  currentUser,
  liveMatch,
  matches,
  teams,
}) {
  const [activePanel, setActivePanel] =
    useState("live")

  const recentMatches =
    matches.slice(0, 3)

  const liveMatchActive =
    Boolean(
      liveMatch?.inningsReady ||
        liveMatch?.balls > 0
    ) && !liveMatch?.winner

  const panel =
    HOME_PANELS[activePanel]

  const ownedTeams = teams.filter(
    (team) =>
      currentUser?.id &&
      team.ownerId === currentUser.id
  )

  return (
    <div className="p-4 md:p-6 space-y-8">
      <section
        className="
          relative
          overflow-hidden
          rounded-[2rem]
          border
          border-zinc-800
          bg-zinc-950
          px-5
          py-8
          md:px-8
          md:py-10
        "
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(34,197,94,0.18),_transparent_28%),radial-gradient(circle_at_80%_20%,_rgba(59,130,246,0.18),_transparent_25%),radial-gradient(circle_at_bottom_right,_rgba(245,158,11,0.15),_transparent_30%)]" />

        <div className="relative grid gap-8 lg:grid-cols-[1.3fr_0.9fr]">
          <div className="space-y-6">
            <div className="flex flex-wrap gap-3">
              <div className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-emerald-300">
                Grassroots Cricket OS
              </div>

              <div className="rounded-full border border-zinc-700 bg-zinc-900/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-zinc-300">
                {currentUser
                  ? `Signed in as ${currentUser.name}`
                  : "Guest scouting mode"}
              </div>
            </div>

            <div className="space-y-4">
              <h1 className="max-w-3xl text-4xl font-black leading-tight md:text-6xl">
                Run your gully match like a proper night game production desk.
              </h1>

              <p className="max-w-2xl text-base leading-7 text-zinc-300 md:text-lg">
                Score live, rotate bowlers, track real players, save detailed scoreboards, and manage local teams without losing the speed needed on the ground.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                to="/live"
                className="
                  rounded-full
                  bg-emerald-500
                  px-5
                  py-3
                  font-bold
                  text-black
                  transition-all
                  hover:bg-emerald-400
                "
              >
                {liveMatchActive
                  ? "Resume Live Match"
                  : "Start Live Match"}
              </Link>

              <Link
                to="/teams"
                className="
                  rounded-full
                  bg-zinc-800
                  px-5
                  py-3
                  font-bold
                  transition-all
                  hover:bg-zinc-700
                "
              >
                Manage Teams
              </Link>

              <Link
                to="/history"
                className="
                  rounded-full
                  border
                  border-zinc-700
                  px-5
                  py-3
                  font-bold
                  transition-all
                  hover:bg-zinc-900
                "
              >
                Explore History
              </Link>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              <div className="rounded-2xl bg-black/40 p-4 backdrop-blur">
                <div className="text-xs font-bold uppercase tracking-[0.25em] text-zinc-500">
                  Teams
                </div>

                <div className="mt-3 text-4xl font-black">
                  {teams.length}
                </div>

                <div className="mt-2 text-sm text-zinc-400">
                  {currentUser
                    ? `${ownedTeams.length} owned by you`
                    : "Sign in to claim your squads"}
                </div>
              </div>

              <div className="rounded-2xl bg-black/40 p-4 backdrop-blur">
                <div className="text-xs font-bold uppercase tracking-[0.25em] text-zinc-500">
                  Matches
                </div>

                <div className="mt-3 text-4xl font-black">
                  {matches.length}
                </div>

                <div className="mt-2 text-sm text-zinc-400">
                  Archived scorecards ready to reopen
                </div>
              </div>

              <div className="rounded-2xl bg-black/40 p-4 backdrop-blur">
                <div className="text-xs font-bold uppercase tracking-[0.25em] text-zinc-500">
                  Match State
                </div>

                <div className="mt-3 text-2xl font-black md:text-3xl">
                  {liveMatch?.winner
                    ? "Completed"
                    : liveMatchActive
                      ? "Live now"
                      : "Ready"}
                </div>

                <div className="mt-2 text-sm text-zinc-400">
                  {liveMatch?.winner
                    ? liveMatch.winner
                    : liveMatchActive
                      ? `${liveMatch.battingTeamName || "Batting side"} ${liveMatch.score}/${liveMatch.wickets}`
                      : "Build teams and start the innings"}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-[1.75rem] border border-zinc-800 bg-zinc-900/80 p-5 shadow-2xl backdrop-blur">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-xs font-bold uppercase tracking-[0.25em] text-zinc-500">
                    Live Deck
                  </div>

                  <div className="mt-2 text-2xl font-black">
                    {liveMatch?.battingTeamName || "No team selected"}
                  </div>
                </div>

                <div className={`
                  rounded-full
                  px-3
                  py-1
                  text-xs
                  font-bold
                  uppercase
                  tracking-[0.2em]
                  ${
                    liveMatch?.winner
                      ? "bg-emerald-500/20 text-emerald-300"
                      : liveMatchActive
                        ? "bg-red-500/20 text-red-300"
                        : "bg-zinc-800 text-zinc-400"
                  }
                `}>
                  {liveMatch?.winner
                    ? "Result"
                    : liveMatchActive
                      ? "Live"
                      : "Standby"}
                </div>
              </div>

              <div className="mt-6 rounded-[1.5rem] bg-black p-5">
                <div className="text-6xl font-black tracking-tight">
                  {liveMatch?.score || 0}/{liveMatch?.wickets || 0}
                </div>

                <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-zinc-400">
                  <span>Overs {liveMatch?.overs || "0.0"}</span>
                  <span>Innings {liveMatch?.innings || 1}</span>
                  {liveMatch?.target && (
                    <span>
                      Target {liveMatch.target}
                    </span>
                  )}
                </div>

                {liveMatch?.freeHit && (
                  <div className="mt-4 rounded-xl bg-yellow-500 px-3 py-2 text-center text-sm font-black text-black">
                    FREE HIT ACTIVE
                  </div>
                )}

                {liveMatch?.winner && (
                  <div className="mt-4 rounded-xl bg-emerald-600 px-3 py-3 text-center font-black">
                    {liveMatch.winner}
                  </div>
                )}
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-1">
              {recentMatches.length === 0 ? (
                <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-5 text-zinc-400">
                  Your archive will start filling here after the first completed match.
                </div>
              ) : (
                recentMatches.map((match) => (
                  <div
                    key={match.id}
                    className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-4"
                  >
                    <div className="text-sm uppercase tracking-[0.2em] text-zinc-500">
                      Recent result
                    </div>

                    <div className="mt-2 text-lg font-bold">
                      {match.teamA}
                      {" vs "}
                      {match.teamB}
                    </div>

                    <div className="mt-2 text-sm text-zinc-400">
                      {match.score}
                      {" in "}
                      {match.overs}
                      {" ov"}
                    </div>

                    <div className="mt-3 flex items-center justify-between gap-3">
                      <div className="text-sm font-semibold text-emerald-300">
                        {match.winner}
                      </div>

                      <div className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                        {formatMatchDate(
                          match.createdAt
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-[2rem] border border-zinc-800 bg-zinc-900 p-6">
          <div className="flex flex-wrap gap-2">
            {Object.entries(
              HOME_PANELS
            ).map(
              ([
                panelKey,
                panelValue,
              ]) => (
                <button
                  key={panelKey}
                  onClick={() =>
                    setActivePanel(
                      panelKey
                    )
                  }
                  className={`
                    rounded-full
                    px-4
                    py-2
                    text-sm
                    font-bold
                    transition-all
                    ${
                      activePanel ===
                      panelKey
                        ? "bg-white text-black"
                        : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                    }
                  `}
                >
                  {panelValue.title}
                </button>
              )
            )}
          </div>

          <div className={`mt-6 rounded-[1.75rem] bg-gradient-to-br ${panel.accent} p-5`}>
            <div className="rounded-[1.4rem] border border-zinc-800/70 bg-black/60 p-5 backdrop-blur">
              <div className="text-xs font-bold uppercase tracking-[0.25em] text-zinc-500">
                {panel.statLabel}
              </div>

              <div className="mt-3 text-3xl font-black">
                {panel.statValue}
              </div>

              <div className="mt-4 text-base leading-7 text-zinc-300">
                {panel.description}
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-zinc-800 bg-zinc-900 p-6">
          <div className="text-xs font-bold uppercase tracking-[0.25em] text-zinc-500">
            Why It Feels Fast
          </div>

          <div className="mt-3 text-3xl font-black">
            Interactive Scoring Stack
          </div>

          <div className="mt-6 space-y-4">
            {panel.bullets.map(
              (bullet) => (
                <div
                  key={bullet}
                  className="flex gap-4 rounded-2xl bg-black/40 p-4"
                >
                  <div className="mt-1 h-3 w-3 rounded-full bg-emerald-400" />

                  <p className="text-zinc-300 leading-7">
                    {bullet}
                  </p>
                </div>
              )
            )}
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-3">
            <Link
              to="/live"
              className="rounded-2xl bg-emerald-500 px-4 py-4 text-center font-bold text-black transition-all hover:bg-emerald-400"
            >
              Score Now
            </Link>

            <Link
              to="/teams"
              className="rounded-2xl bg-blue-600 px-4 py-4 text-center font-bold transition-all hover:bg-blue-500"
            >
              Pick Squads
            </Link>

            <Link
              to="/history"
              className="rounded-2xl bg-amber-500 px-4 py-4 text-center font-bold text-black transition-all hover:bg-amber-400"
            >
              Rewatch Data
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
