import { Link } from "react-router-dom"

export default function Navbar() {

  return (
    <div
      className="
        bg-zinc-900
        p-4
        flex
        justify-around
        items-center
        sticky
        top-0
        z-50
        shadow-lg
      "
    >

      <Link
        to="/"
        className="font-bold"
      >
        Home
      </Link>

      <Link
        to="/live"
        className="font-bold"
      >
        Live
      </Link>

      <Link
        to="/teams"
        className="font-bold"
      >
        Teams
      </Link>

      <Link
        to="/history"
        className="font-bold"
      >
        History
      </Link>

    </div>
  )
}