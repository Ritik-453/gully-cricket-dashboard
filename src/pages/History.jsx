import MatchHistory from "../components/MatchHistory"

export default function History({
  matches,
}) {

  return (
    <div className="p-6">

      <MatchHistory matches={matches} />

    </div>
  )
}