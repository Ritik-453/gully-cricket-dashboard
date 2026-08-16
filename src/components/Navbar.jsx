import {
  NavLink,
  useLocation,
} from "react-router-dom"

const UserIcon = ({
  className,
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    aria-hidden="true"
  >
    <circle
      cx="12"
      cy="8"
      r="3.5"
      stroke="currentColor"
      strokeWidth="1.8"
    />
    <path
      d="M4.5 19.2c1.4-3.2 4.2-5 7.5-5s6.1 1.8 7.5 5"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
)

const NAV_ITEMS = [
  {
    label: "Home",
    subtitle: "Overview",
    to: "/",
  },
  {
    label: "Teams",
    subtitle: "Squads",
    to: "/teams",
  },
  {
    label: "Live",
    subtitle: "Scoring",
    to: "/live",
  },
  {
    label: "Watch",
    subtitle: "Live Score",
    to: "/watch",
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
            gap-3
            px-3
            py-3
            md:gap-4
            md:px-6
            md:py-4
          "
        >
          <div
            className="
              flex
              flex-wrap
              items-center
              gap-3
              lg:flex-nowrap
              lg:justify-between
              lg:gap-4
            "
          >
            <div className="flex min-w-0 flex-1 items-center gap-3 md:items-start md:gap-4">
              <div
                className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-emerald-400/20
                  bg-emerald-500/10
                  text-base
                  font-black
                  text-emerald-300
                  md:h-12
                  md:w-12
                  md:rounded-2xl
                  md:text-lg
                "
              >
                GC
              </div>

              <div className="min-w-0 space-y-0.5 md:space-y-1">
                <div className="hidden text-[11px] font-black uppercase tracking-[0.35em] text-emerald-300 md:block">
                  Match Command
                </div>

                <div className="truncate text-lg font-black tracking-tight md:text-2xl">
                  Gully Cricket Dashboard
                </div>

                <div className="truncate text-xs text-slate-400 md:text-sm">
                  {currentUser
                    ? `Signed in as ${currentUser.name}`
                    : "Guest mode active"}
                </div>
              </div>
            </div>

            <NavLink
              to="/account"
              aria-label="Account"
              className={({
                isActive,
              }) => `
                order-2
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-full
                border
                transition-all
                active:scale-90
                md:h-11
                md:w-11
                lg:order-3
                ${
                  isActive
                    ? "border-emerald-400/40 bg-emerald-500/15 text-emerald-300"
                    : "border-white/10 bg-white/[0.05] text-slate-200 hover:bg-white/[0.1]"
                }
              `}
            >
              {currentUser ? (
                <span className="text-sm font-black">
                  {currentUser.name
                    ?.trim()?.[0]
                    ?.toUpperCase() ||
                    "U"}
                </span>
              ) : (
                <UserIcon className="h-5 w-5" />
              )}
            </NavLink>

            <div
              className="
                order-3
                w-full
                basis-full
                grid
                grid-cols-3
                gap-2
                md:gap-3
                lg:order-2
                lg:w-auto
                lg:basis-auto
              "
            >
              <div className="rounded-xl border border-white/10 bg-white/[0.04] px-2 py-2 md:rounded-2xl md:px-4 md:py-3">
                <div className="truncate text-[9px] font-bold uppercase tracking-[0.12em] text-slate-500 md:text-[11px] md:tracking-[0.24em]">
                  Match
                </div>

                <div className="mt-1 truncate text-xs font-bold text-white md:mt-2 md:text-sm">
                  {liveMatch?.winner
                    ? "Completed"
                    : liveMatchActive
                      ? "Live"
                      : "Ready"}
                </div>

                <div className="mt-0.5 hidden truncate text-xs text-slate-400 md:mt-1 md:block">
                  {liveSummary}
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/[0.04] px-2 py-2 md:rounded-2xl md:px-4 md:py-3">
                <div className="truncate text-[9px] font-bold uppercase tracking-[0.12em] text-slate-500 md:text-[11px] md:tracking-[0.24em]">
                  Teams
                </div>

                <div className="mt-1 truncate text-xs font-bold text-white md:mt-2 md:text-sm">
                  {teamsCount} saved
                </div>

                <div className="mt-0.5 hidden truncate text-xs text-slate-400 md:mt-1 md:block">
                  Match-ready squads
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/[0.04] px-2 py-2 md:rounded-2xl md:px-4 md:py-3">
                <div className="truncate text-[9px] font-bold uppercase tracking-[0.12em] text-slate-500 md:text-[11px] md:tracking-[0.24em]">
                  Archive
                </div>

                <div className="mt-1 truncate text-xs font-bold text-white md:mt-2 md:text-sm">
                  {matchesCount} cards
                </div>

                <div className="mt-0.5 hidden truncate text-xs text-slate-400 md:mt-1 md:block">
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
              md:grid-cols-6
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
          inset-x-2
          bottom-2
          z-50
          grid
          grid-cols-6
          gap-1
          rounded-[1.5rem]
          border
          border-white/10
          bg-slate-950/92
          p-1.5
          shadow-[0_16px_60px_rgba(2,6,23,0.5)]
          backdrop-blur-xl
          md:hidden
        "
        style={{
          paddingBottom:
            "max(0.375rem, env(safe-area-inset-bottom))",
        }}
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
                relative
                flex
                min-h-[3rem]
                flex-col
                items-center
                justify-center
                rounded-xl
                px-0.5
                py-2
                text-center
                transition-all
                ${
                  isActive
                    ? "bg-emerald-500/12 text-white"
                    : "text-slate-400"
                }
              `}
            >
              {item.to === "/live" &&
                liveMatchActive && (
                  <span className="absolute right-1 top-1.5 h-1.5 w-1.5 rounded-full bg-red-500" />
                )}

              {item.to ===
                "/watch" &&
                liveMatchActive && (
                  <span className="absolute right-1 top-1.5 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                )}

              <span className="text-[10px] font-bold leading-tight">
                {item.label}
              </span>

              <span className="mt-0.5 text-[8px] uppercase tracking-[0.1em] leading-tight">
                {item.subtitle}
              </span>
            </NavLink>
          )
        })}
      </nav>
    </>
  )
}
