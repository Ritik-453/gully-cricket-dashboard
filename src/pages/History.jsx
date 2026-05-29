import {
  useEffect,
  useState,
} from "react"

import MatchHistory from "../components/MatchHistory"

const isOwnedMatch = (
  match,
  currentUser
) =>
  Boolean(
    currentUser?.id &&
      match.createdById ===
        currentUser.id
  )

export default function History({
  currentUser,
  matches,
}) {
  const [search, setSearch] =
    useState("")

  const [viewMode, setViewMode] =
    useState(
      currentUser ? "mine" : "all"
    )

  useEffect(() => {
    setViewMode(
      currentUser ? "mine" : "all"
    )
  }, [currentUser?.id])

  const searchText =
    search.toLowerCase()

  const searchedMatches =
    matches.filter((match) => {
      const scorerName =
        (
          match.createdByName || ""
        ).toLowerCase()

      return (
        match.teamA
          .toLowerCase()
          .includes(searchText) ||
        match.teamB
          .toLowerCase()
          .includes(searchText) ||
        scorerName.includes(searchText)
      )
    })

  const myMatches =
    searchedMatches.filter((match) =>
      isOwnedMatch(match, currentUser)
    )

  const visibleMatches =
    viewMode === "mine"
      ? myMatches
      : searchedMatches

  return (
    <div className="p-6 space-y-6">
      <div
        className="
          rounded-2xl
          bg-zinc-900
          p-6
          space-y-5
        "
      >
        <div
          className="
            flex
            flex-col
            gap-4
            lg:flex-row
            lg:items-end
            lg:justify-between
          "
        >
          <div className="space-y-2">
            <h1 className="text-3xl font-black">
              Match Archive
            </h1>

            <p className="text-zinc-400">
              Search by team or scorer, then switch between your saved matches and the full public archive.
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() =>
                setViewMode("mine")
              }
              disabled={!currentUser}
              className={`
                rounded-full
                px-4
                py-2
                text-sm
                font-bold
                transition-all
                ${
                  viewMode === "mine"
                    ? "bg-emerald-600 text-white"
                    : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                }
                ${
                  !currentUser
                    ? "cursor-not-allowed opacity-50"
                    : ""
                }
              `}
            >
              My Matches
            </button>

            <button
              onClick={() =>
                setViewMode("all")
              }
              className={`
                rounded-full
                px-4
                py-2
                text-sm
                font-bold
                transition-all
                ${
                  viewMode === "all"
                    ? "bg-blue-600 text-white"
                    : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                }
              `}
            >
              All Matches
            </button>
          </div>
        </div>

        <input
          type="text"
          placeholder="Search team or scorer..."
          value={search}
          onChange={(event) =>
            setSearch(
              event.target.value
            )
          }
          className="
            w-full
            rounded-2xl
            bg-black
            p-3
          "
        />

        <div
          className="
            grid
            grid-cols-1
            gap-3
            md:grid-cols-3
          "
        >
          <div className="rounded-2xl bg-black p-4">
            <div className="text-sm text-zinc-400">
              Visible
            </div>

            <div className="mt-2 text-3xl font-black">
              {visibleMatches.length}
            </div>
          </div>

          <div className="rounded-2xl bg-black p-4">
            <div className="text-sm text-zinc-400">
              My Matches
            </div>

            <div className="mt-2 text-3xl font-black">
              {currentUser
                ? myMatches.length
                : "-"}
            </div>
          </div>

          <div className="rounded-2xl bg-black p-4">
            <div className="text-sm text-zinc-400">
              Total Archive
            </div>

            <div className="mt-2 text-3xl font-black">
              {matches.length}
            </div>
          </div>
        </div>

        {!currentUser && (
          <div className="rounded-2xl border border-zinc-800 bg-black/40 p-4 text-sm text-zinc-400">
            Sign in to unlock the `My Matches` view and track your own scoring history separately.
          </div>
        )}
      </div>

      <MatchHistory
        currentUser={currentUser}
        emptyStateMessage={
          viewMode === "mine"
            ? "No matches saved by this account yet."
            : "No matches found for this search."
        }
        matches={visibleMatches}
      />
    </div>
  )
}
