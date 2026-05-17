import { Link } from "react-router-dom"

export default function Navbar() {

  return (
    <div className="bg-zinc-900 p-4 flex gap-6">

      <Link to="/">
        Home
      </Link>

      <Link to="/live">
        Live Match
      </Link>

      <Link to="/teams">
        Teams
      </Link>

      <Link to="/history">
        History
      </Link>

    </div>
  )
}