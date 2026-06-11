import { Link } from "react-router-dom"

const START_FLOW = [
  {
    title: "1. Build the squads",
    description:
      "Create the two teams first, add players, then assign a captain so match setup is fast.",
    action: "Open Teams",
    to: "/teams",
  },
  {
    title: "2. Set the innings",
    description:
      "Choose teams, total overs, opening batters, and the first bowler before the first ball.",
    action: "Open Live Match",
    to: "/live",
  },
  {
    title: "3. Score ball by ball",
    description:
      "Use the run pad for bat runs, the extras buttons for wides and no-balls, and the dismissal panel for wickets.",
    action: "Start Scoring",
    to: "/live",
  },
]

const QUICK_RULES = [
  {
    title: "No ball and free hit",
    note:
      "A no-ball adds 1 extra and the next ball becomes a free hit. On a free hit, only run out stays available.",
  },
  {
    title: "Run-out scoring",
    note:
      "If a batter is run out going for the second run, count only the completed run before the wicket and choose whether the striker or non-striker is out.",
  },
  {
    title: "Bowler rotation",
    note:
      "The app asks for the next bowler only after a completed over, not after wides or no-balls.",
  },
  {
    title: "Archive review",
    note:
      "Saved matches keep batting, bowling, ball history, fall of wickets, and the new insights dashboard for quick recap.",
  },
]

export default function Guide() {
  return (
    <div className="space-y-8">
      <section
        className="
          relative
          overflow-hidden
          rounded-[2rem]
          border
          border-white/10
          bg-slate-950/80
          px-5
          py-8
          shadow-[0_24px_90px_rgba(2,6,23,0.35)]
          md:px-8
        "
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.16),_transparent_26%),radial-gradient(circle_at_bottom_right,_rgba(34,197,94,0.15),_transparent_28%)]" />

        <div className="relative grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-5">
            <div className="text-[11px] font-black uppercase tracking-[0.34em] text-sky-300">
              Quick Start Guide
            </div>

            <h1 className="max-w-3xl text-4xl font-black leading-tight md:text-5xl">
              Learn the full scoring flow before the toss is even done.
            </h1>

            <p className="max-w-2xl text-base leading-7 text-slate-300 md:text-lg">
              This page is built for scorers who want the app to feel obvious in the first two minutes. Follow the steps below and you can go from empty dashboard to live scoreboard without hunting through menus.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                to="/live"
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
                Go To Live Match
              </Link>

              <Link
                to="/teams"
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
                Prepare Teams
              </Link>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <div className="text-[11px] font-bold uppercase tracking-[0.24em] text-slate-500">
                Best For
              </div>

              <div className="mt-3 text-lg font-bold">
                First-time scorers
              </div>

              <div className="mt-2 text-sm text-slate-400">
                Understand the order of actions before the match starts.
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <div className="text-[11px] font-bold uppercase tracking-[0.24em] text-slate-500">
                Live Tip
              </div>

              <div className="mt-3 text-lg font-bold">
                Setup first
              </div>

              <div className="mt-2 text-sm text-slate-400">
                The live page now keeps setup, score controls, and scorecards in their own clear zones.
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <div className="text-[11px] font-bold uppercase tracking-[0.24em] text-slate-500">
                Archive Tip
              </div>

              <div className="mt-3 text-lg font-bold">
                Review after play
              </div>

              <div className="mt-2 text-sm text-slate-400">
                Use the archive to reopen full scoreboards and match insights once the innings is done.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-[2rem] border border-white/10 bg-slate-950/78 p-6">
          <div className="text-[11px] font-black uppercase tracking-[0.34em] text-emerald-300">
            Match Workflow
          </div>

          <div className="mt-4 grid gap-4">
            {START_FLOW.map((step) => (
              <div
                key={step.title}
                className="rounded-2xl border border-white/8 bg-white/[0.04] p-5"
              >
                <div className="text-xl font-black">
                  {step.title}
                </div>

                <div className="mt-3 text-sm leading-7 text-slate-300">
                  {step.description}
                </div>

                <Link
                  to={step.to}
                  className="mt-4 inline-flex rounded-full bg-slate-800 px-4 py-2 text-sm font-bold transition-all hover:bg-slate-700"
                >
                  {step.action}
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[2rem] border border-white/10 bg-slate-950/78 p-6">
            <div className="text-[11px] font-black uppercase tracking-[0.34em] text-amber-300">
              Scoring Notes
            </div>

            <div className="mt-4 space-y-3">
              {QUICK_RULES.map((rule) => (
                <div
                  key={rule.title}
                  className="rounded-2xl bg-white/[0.04] p-4"
                >
                  <div className="font-bold">
                    {rule.title}
                  </div>

                  <div className="mt-2 text-sm leading-7 text-slate-300">
                    {rule.note}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-slate-950/78 p-6">
            <div className="text-[11px] font-black uppercase tracking-[0.34em] text-sky-300">
              Best Route
            </div>

            <ol className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
              <li>1. Create or review teams in `Teams`.</li>
              <li>2. Open `Live` and finish match setup.</li>
              <li>3. Score the innings from the control pad.</li>
              <li>4. Review the scoreboard and insights in `Archive`.</li>
            </ol>
          </div>
        </div>
      </section>
    </div>
  )
}
