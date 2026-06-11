import {
  NavLink,
  useLocation,
} from "react-router-dom"

const NAV_ITEMS = [
  {
    label: "Home",
    subtitle: "Overview",
    to: "/",
  },
  {
    label: "Live",
    subtitle: "Scoring",
    to: "/live",
  },
  {
    label: "Teams",
    subtitle: "Squads",
    to: "/teams",
  },
  {
    label: "Archive",
    subtitle: "History",
    to: "/history",
  },
  {
    label: "Guide",
    subtitle: "Help",
    to: "/guide",
  },
]

const getNavLinkClass = ({
  isActive,
}) =>
  `
    group
    rounded-2xl
    border
    px-4
    py-3
    transition-all
    ${
      isActive
        ? "border-emerald-400/40 bg-emerald-500/12 text-white shadow-[0_12px_40px_rgba(16,185,129,0.12)]"
        : "border-transparent bg-white/[0.03] text-zinc-300 hover:border-white/10 hover:bg-white/[0.06]"
    }
  `

export default function Navbar({
  currentUser,
  liveMatch,
  matchesCount,
  teamsCount,
}) {
  const location =
    useLocation()

  const liveMatchActive =
    Boolean(
      liveMatch?.inningsReady ||
        liveMatch?.balls > 0
    ) && !liveMatch?.winner

  const liveSummary =
    liveMatch?.winner
      ? liveMatch.winner
      : liveMatchActive
        ? `${liveMatch?.battingTeamName || "Match live"} ${liveMatch?.score || 0}/${liveMatch?.wickets || 0}`
        : "No active match"

  return (
    <>
      <header
        className="
          sticky
          top-0
          z-50
          border-b
          border-white/10
          bg-slate-950/88
          backdrop-blur-xl
        "
      >
        <div
          className="
            mx-auto
            flex
            max-w-7xl
            flex-col
            gap-4
            px-4
            py-4
            md:px-6
          "
        >
          <div
            className="
              flex
              flex-col
              gap-4
              lg:flex-row
              lg:items-center
              lg:justify-between
            "
          >
            <div className="flex items-start gap-4">
              <div
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-2xl
                  border
                  border-emerald-400/20
                  bg-emerald-500/10
                  text-lg
                  font-black
                  text-emerald-300
                "
              >
                GC
              </div>

              <div className="space-y-1">
                <div className="text-[11px] font-black uppercase tracking-[0.35em] text-emerald-300">
                  Match Command
                </div>

                <div className="text-2xl font-black tracking-tight">
                  Gully Cricket Dashboard
                </div>

                <div className="text-sm text-slate-400">
                  {currentUser
                    ? `Signed in as ${currentUser.name}`
                    : "Guest mode active"}
                </div>
              </div>
            </div>

            <div
              className="
                grid
                gap-3
                sm:grid-cols-3
              "
            >
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
                <div className="text-[11px] font-bold uppercase tracking-[0.24em] text-slate-500">
                  Match State
                </div>

                <div className="mt-2 text-sm font-bold text-white">
                  {liveMatch?.winner
                    ? "Completed"
                    : liveMatchActive
                      ? "Live scoring"
                      : "Ready to start"}
                </div>

                <div className="mt-1 text-xs text-slate-400">
                  {liveSummary}
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
                <div className="text-[11px] font-bold uppercase tracking-[0.24em] text-slate-500">
                  Team Room
                </div>

                <div className="mt-2 text-sm font-bold text-white">
                  {teamsCount} teams saved
                </div>

                <div className="mt-1 text-xs text-slate-400">
                  Match-ready squads
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
                <div className="text-[11px] font-bold uppercase tracking-[0.24em] text-slate-500">
                  Archive
                </div>

                <div className="mt-2 text-sm font-bold text-white">
                  {matchesCount} scorecards
                </div>

                <div className="mt-1 text-xs text-slate-400">
                  Saved results and insights
                </div>
              </div>
            </div>
          </div>

          <nav
            className="
              hidden
              gap-3
              md:grid
              md:grid-cols-5
            "
          >
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={
                  getNavLinkClass
                }
              >
                {({
                  isActive,
                }) => (
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="text-sm font-bold">
                        {item.label}
                      </div>

                      <div
                        className={`
                          mt-1
                          text-xs
                          uppercase
                          tracking-[0.2em]
                          ${
                            isActive
                              ? "text-emerald-200/90"
                              : "text-slate-500"
                          }
                        `}
                      >
                        {item.subtitle}
                      </div>
                    </div>

                    {item.to === "/live" &&
                      liveMatchActive && (
                        <span className="rounded-full bg-red-500/15 px-2 py-1 text-[11px] font-bold uppercase tracking-wide text-red-200">
                          Live
                        </span>
                      )}
                  </div>
                )}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <nav
        className="
          fixed
          inset-x-3
          bottom-3
          z-50
          grid
          grid-cols-5
          gap-2
          rounded-[1.75rem]
          border
          border-white/10
          bg-slate-950/92
          p-2
          shadow-[0_16px_60px_rgba(2,6,23,0.5)]
          backdrop-blur-xl
          md:hidden
        "
      >
        {NAV_ITEMS.map((item) => {
          const isActive =
            location.pathname ===
            item.to

          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={`
                flex
                flex-col
                items-center
                justify-center
                rounded-2xl
                px-2
                py-2.5
                text-center
                transition-all
                ${
                  isActive
                    ? "bg-emerald-500/12 text-white"
                    : "text-slate-400"
                }
              `}
            >
              <span className="text-sm font-bold">
                {item.label}
              </span>

              <span className="mt-1 text-[10px] uppercase tracking-[0.24em]">
                {item.subtitle}
              </span>
            </NavLink>
          )
        })}
      </nav>
    </>
  )
}
