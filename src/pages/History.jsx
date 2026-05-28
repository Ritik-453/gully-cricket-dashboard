import { useState } from "react"

import MatchHistory from "../components/MatchHistory"

export default function History({
  matches,
}) {

  const [search, setSearch] =
    useState("")

  const filteredMatches =
    matches.filter((match) => {

      const searchText =
        search.toLowerCase()

      return (
        match.teamA
          .toLowerCase()
          .includes(searchText) ||

        match.teamB
          .toLowerCase()
          .includes(searchText)
      )
    })

  return (
    <div className="p-6">

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search Team..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="
          w-full
          p-3
          rounded-xl
          bg-zinc-800
          mb-6
        "
      />

      <MatchHistory
        matches={filteredMatches}
      />

    </div>
  )
}