import { Link } from "react-router-dom"

export default function Navbar({
  currentUser,
}) {
  return (
    <div
      className="
        sticky
        top-0
        z-50
        border-b
        border-zinc-800
        bg-zinc-950/90
        backdrop-blur
        shadow-lg
      "
    >
      <div
        className="
          mx-auto
          flex
          max-w-6xl
          flex-col
          gap-3
          px-4
          py-4
          md:flex-row
          md:items-center
          md:justify-between
        "
      >
        <div>
          <div className="text-lg font-black tracking-wide">
            Gully Cricket Dashboard
          </div>

          <div className="text-sm text-zinc-400">
            {currentUser
              ? `Signed in as ${currentUser.name}`
              : "Guest mode"}
          </div>
        </div>

        <div className="flex flex-wrap gap-3 text-sm font-bold md:text-base">
          <Link
            to="/"
            className="rounded-full bg-zinc-900 px-4 py-2 hover:bg-zinc-800 transition-all"
          >
            Home
          </Link>

          <Link
            to="/live"
            className="rounded-full bg-zinc-900 px-4 py-2 hover:bg-zinc-800 transition-all"
          >
            Live
          </Link>

          <Link
            to="/teams"
            className="rounded-full bg-zinc-900 px-4 py-2 hover:bg-zinc-800 transition-all"
          >
            Teams
          </Link>

          <Link
            to="/history"
            className="rounded-full bg-zinc-900 px-4 py-2 hover:bg-zinc-800 transition-all"
          >
            History
          </Link>
        </div>
      </div>
    </div>
  )
}
