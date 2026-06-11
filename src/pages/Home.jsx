import { useState } from "react"
import { Link } from "react-router-dom"

const FEATURE_PANELS = {
  command: {
    title: "Command Center",
    description:
      "See the current match state, jump straight into live scoring, and keep the whole workflow visible from one place.",
    accent:
      "from-emerald-500/18 to-cyan-500/10",
    bullets: [
      "Live match state stays visible at the top of the app.",
      "Quick actions reduce the number of taps before scoring starts.",
      "The home page now points users to the next best action.",
    ],
  },
  scoring: {
    title: "Scoring Desk",
    description:
      "The live page is reorganized around setup, active scoring, and review so the scorer always knows where to look.",
    accent:
      "from-amber-500/18 to-rose-500/10",
    bullets: [
      "Setup stays separate from the scoring pad.",
      "Run outs, no-balls, and free hits are guided directly inside controls.",
      "Ball history, wickets, and insights now sit after the active scoring zone.",
    ],
  },
  archive: {
    title: "Review Mode",
    description:
      "Saved matches are easier to reopen, inspect, and understand through scoreboards and insights.",
    accent:
      "from-sky-500/18 to-blue-500/10",
    bullets: [
      "Archive filters and account-aware views reduce clutter.",
      "Past scoreboards now include match insights for fast recap.",
      "Teams, archive, and guide pages now support first-time users better.",
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
    useState("command")

  const liveMatchActive =
    Boolean(
      liveMatch?.inningsReady ||
        liveMatch?.balls > 0
    ) && !liveMatch?.winner

  const panel =
    FEATURE_PANELS[activePanel]

  const ownedTeams = teams.filter(
    (team) =>
      currentUser?.id &&
      team.ownerId === currentUser.id
  )

  const ownedMatches = matches.filter(
    (match) =>
      currentUser?.id &&
      match.createdById === currentUser.id
  )

  const recentMatches =
    matches.slice(0, 4)

  const nextAction = liveMatchActive
    ? {
        label:
          "Resume live scoring",
        to: "/live",
        note: `${liveMatch?.battingTeamName || "Match"} ${liveMatch?.score || 0}/${liveMatch?.wickets || 0} after ${liveMatch?.overs || "0.0"} ov`,
      }
    : teams.length >= 2
      ? {
          label:
            "Open live match setup",
          to: "/live",
          note: "Teams are ready. Set the innings and start scoring.",
        }
      : {
          label:
            "Create your first teams",
          to: "/teams",
          note: "Build at least two squads before opening the scorer.",
        }

  return (
    <div className="space-y-8">
      <section
        className="
          relative
          overflow-hidden
          rounded-[2rem]
          border
          border-white/10
          bg-slate-950/82
          px-5
          py-8
          shadow-[0_24px_90px_rgba(2,6,23,0.35)]
          md:px-8
        "
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(34,197,94,0.18),_transparent_26%),radial-gradient(circle_at_80%_18%,_rgba(56,189,248,0.18),_transparent_24%),radial-gradient(circle_at_bottom_right,_rgba(251,191,36,0.12),_transparent_28%)]" />

        <div className="relative grid gap-8 xl:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-6">
            <div className="flex flex-wrap gap-3">
              <div className="rounded-full border border-emerald-400/25 bg-emerald-500/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.32em] text-emerald-300">
                Stadium Mode
              </div>

              <div className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[11px] font-black uppercase tracking-[0.32em] text-slate-300">
                {currentUser
                  ? `Scorer ${currentUser.name}`
                  : "Guest session"}
              </div>
            </div>

            <div className="space-y-4">
              <h1 className="max-w-4xl text-4xl font-black leading-tight md:text-6xl">
                A friendlier control room for gully, box, and local league cricket.
              </h1>

              <p className="max-w-3xl text-base leading-7 text-slate-300 md:text-lg">
                The app now guides the scorer more clearly: build teams, launch the innings, score ball by ball, and review the match later without losing track of what comes next.
              </p>
            </div>

            <div className="rounded-[1.75rem] border border-white/10 bg-black/35 p-5">
              <div className="text-[11px] font-black uppercase tracking-[0.32em] text-slate-500">
                Next Best Action
              </div>

              <div className="mt-3 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <div className="text-2xl font-black">
                    {nextAction.label}
                  </div>

                  <div className="mt-2 text-sm text-slate-300">
                    {nextAction.note}
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Link
                    to={nextAction.to}
                    className="
                      rounded-full
                      bg-emerald-500
                      px-5
                      py-3
                      font-bold
                      text-slate-950
                      transition-all
                      hover:bg-emerald-400
                    "
                  >
                    Continue
                  </Link>

                  <Link
                    to="/guide"
                    className="
                      rounded-full
                      border
                      border-white/10
                      bg-white/[0.04]
                      px-5
                      py-3
                      font-bold
                      transition-all
                      hover:bg-white/[0.08]
                    "
                  >
                    Open Guide
                  </Link>
                </div>
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-4">
              <div className="rounded-2xl bg-black/35 p-4 backdrop-blur">
                <div className="text-[11px] font-bold uppercase tracking-[0.24em] text-slate-500">
                  Teams
                </div>

                <div className="mt-3 text-4xl font-black">
                  {teams.length}
                </div>

                <div className="mt-2 text-sm text-slate-400">
                  {currentUser
                    ? `${ownedTeams.length} owned by you`
                    : "Sign in to own squads"}
                </div>
              </div>

              <div className="rounded-2xl bg-black/35 p-4 backdrop-blur">
                <div className="text-[11px] font-bold uppercase tracking-[0.24em] text-slate-500">
                  Matches
                </div>

                <div className="mt-3 text-4xl font-black">
                  {matches.length}
                </div>

                <div className="mt-2 text-sm text-slate-400">
                  {currentUser
                    ? `${ownedMatches.length} scored by you`
                    : "Archive stays public"}
                </div>
              </div>

              <div className="rounded-2xl bg-black/35 p-4 backdrop-blur">
                <div className="text-[11px] font-bold uppercase tracking-[0.24em] text-slate-500">
                  Match State
                </div>

                <div className="mt-3 text-2xl font-black">
                  {liveMatch?.winner
                    ? "Result"
                    : liveMatchActive
                      ? "Live now"
                      : "Standby"}
                </div>

                <div className="mt-2 text-sm text-slate-400">
                  {liveMatch?.winner
                    ? liveMatch.winner
                    : liveMatchActive
                      ? `${liveMatch?.score || 0}/${liveMatch?.wickets || 0} in ${liveMatch?.overs || "0.0"} ov`
                      : "Ready for setup"}
                </div>
              </div>

              <div className="rounded-2xl bg-black/35 p-4 backdrop-blur">
                <div className="text-[11px] font-bold uppercase tracking-[0.24em] text-slate-500">
                  Guide
                </div>

                <div className="mt-3 text-2xl font-black">
                  90 sec
                </div>

                <div className="mt-2 text-sm text-slate-400">
                  Learn the flow before the first ball
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-[1.75rem] border border-white/10 bg-slate-900/80 p-5 shadow-2xl backdrop-blur">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-[11px] font-black uppercase tracking-[0.24em] text-slate-500">
                    Live Deck
                  </div>

                  <div className="mt-2 text-2xl font-black">
                    {liveMatch?.battingTeamName || "No team selected"}
                  </div>
                </div>

                <div
                  className={`
                    rounded-full
                    px-3
                    py-1
                    text-[11px]
                    font-black
                    uppercase
                    tracking-[0.2em]
                    ${
                      liveMatch?.winner
                        ? "bg-emerald-500/15 text-emerald-300"
                        : liveMatchActive
                          ? "bg-red-500/15 text-red-300"
                          : "bg-white/[0.06] text-slate-400"
                    }
                  `}
                >
                  {liveMatch?.winner
                    ? "Result"
                    : liveMatchActive
                      ? "Live"
                      : "Standby"}
                </div>
              </div>

              <div className="mt-6 rounded-[1.5rem] bg-black/60 p-5">
                <div className="text-6xl font-black tracking-tight">
                  {liveMatch?.score || 0}/{liveMatch?.wickets || 0}
                </div>

                <div className="mt-3 flex flex-wrap gap-3 text-sm text-slate-400">
                  <span>Overs {liveMatch?.overs || "0.0"}</span>
                  <span>Innings {liveMatch?.innings || 1}</span>
                  {liveMatch?.target && (
                    <span>
                      Target {liveMatch.target}
                    </span>
                  )}
                </div>

                {liveMatch?.freeHit && (
                  <div className="mt-4 rounded-xl bg-amber-400 px-3 py-2 text-center text-sm font-black text-slate-950">
                    FREE HIT ACTIVE
                  </div>
                )}

                {!liveMatchActive &&
                  !liveMatch?.winner && (
                    <div className="mt-4 rounded-xl border border-dashed border-white/10 px-4 py-3 text-sm text-slate-400">
                      Open `Live` to choose teams, overs, opening batters, and the first bowler.
                    </div>
                  )}
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-white/10 bg-slate-900/80 p-5">
              <div className="flex items-center justify-between gap-3">
                <div className="text-lg font-black">
                  Recent Results
                </div>

                <Link
                  to="/history"
                  className="text-sm font-bold text-sky-300 hover:text-sky-200"
                >
                  Open Archive
                </Link>
              </div>

              <div className="mt-4 grid gap-3">
                {recentMatches.length === 0 ? (
                  <div className="rounded-2xl bg-black/45 p-4 text-sm text-slate-400">
                    Complete the first match and the archive will start building here.
                  </div>
                ) : (
                  recentMatches.map((match) => (
                    <div
                      key={match.id}
                      className="rounded-2xl bg-black/45 p-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="font-bold">
                            {match.teamA}
                            {" vs "}
                            {match.teamB}
                          </div>

                          <div className="mt-2 text-sm text-slate-400">
                            {match.score}
                            {" in "}
                            {match.overs}
                            {" ov"}
                          </div>
                        </div>

                        <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500">
                          {formatMatchDate(
                            match.createdAt
                          )}
                        </div>
                      </div>

                      <div className="mt-3 text-sm font-semibold text-emerald-300">
                        {match.winner}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
        <div className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-6">
          <div className="text-[11px] font-black uppercase tracking-[0.34em] text-emerald-300">
            Start Here
          </div>

          <div className="mt-4 space-y-4">
            {[
              {
                title: "Prepare the squads",
                description:
                  "Create at least two teams and set captains so the live page fills itself with real player names.",
                action: "Go to Teams",
                to: "/teams",
              },
              {
                title: "Set the innings",
                description:
                  "Choose Team A, Team B, total overs, opening batters, and the first bowler before scoring begins.",
                action: "Open Live Setup",
                to: "/live",
              },
              {
                title: "Review after the game",
                description:
                  "Open the archive to inspect scorecards, ball history, fall of wickets, and match insights.",
                action: "Explore Archive",
                to: "/history",
              },
            ].map((item, index) => (
              <div
                key={item.title}
                className="rounded-2xl border border-white/8 bg-white/[0.04] p-5"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500/12 text-lg font-black text-emerald-300">
                    {index + 1}
                  </div>

                  <div className="flex-1">
                    <div className="text-xl font-black">
                      {item.title}
                    </div>

                    <div className="mt-2 text-sm leading-7 text-slate-300">
                      {item.description}
                    </div>

                    <Link
                      to={item.to}
                      className="mt-4 inline-flex rounded-full bg-slate-800 px-4 py-2 text-sm font-bold transition-all hover:bg-slate-700"
                    >
                      {item.action}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-6">
          <div className="flex flex-wrap gap-2">
            {Object.entries(
              FEATURE_PANELS
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
                        ? "bg-emerald-500 text-slate-950"
                        : "bg-white/[0.04] text-slate-300 hover:bg-white/[0.08]"
                    }
                  `}
                >
                  {panelValue.title}
                </button>
              )
            )}
          </div>

          <div
            className={`
              mt-5
              rounded-[1.75rem]
              border
              border-white/10
              bg-gradient-to-br
              ${panel.accent}
              p-6
            `}
          >
            <div className="text-3xl font-black">
              {panel.title}
            </div>

            <div className="mt-4 max-w-3xl text-base leading-7 text-slate-100/92">
              {panel.description}
            </div>

            <div className="mt-6 grid gap-3">
              {panel.bullets.map(
                (bullet) => (
                  <div
                    key={bullet}
                    className="rounded-2xl bg-slate-950/52 px-4 py-3 text-sm text-slate-200"
                  >
                    {bullet}
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
