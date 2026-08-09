import { useState } from "react"

export default function ImportTeamById({
  onImport,
  teams,
}) {
  const [teamId, setTeamId] =
    useState("")

  const [foundTeam, setFoundTeam] =
    useState(null)

  const [error, setError] =
    useState("")

  const [importing, setImporting] =
    useState(false)

  const handleFind = (event) => {
    event.preventDefault()

    const trimmedId = teamId.trim()

    if (!trimmedId) {
      setError(
        "Paste a team ID first."
      )
      setFoundTeam(null)
      return
    }

    const match = teams.find(
      (team) => team.id === trimmedId
    )

    if (!match) {
      setError(
        "No team found with that ID. Double-check it and try again."
      )
      setFoundTeam(null)
      return
    }

    setError("")
    setFoundTeam(match)
  }

  const handleImport = async () => {
    if (!foundTeam) return

    setImporting(true)

    const isImported = await onImport(
      foundTeam
    )

    setImporting(false)

    if (isImported) {
      setFoundTeam(null)
      setTeamId("")
      setError("")
    }
  }

  return (
    <div className="space-y-4">
      <div className="text-sm text-slate-400">
        Paste another team's unique ID to pull in its full squad as your own editable copy — no retyping player names.
      </div>

      <form
        onSubmit={handleFind}
        className="flex flex-col gap-2 sm:flex-row"
      >
        <input
          type="text"
          value={teamId}
          onChange={(event) => {
            setTeamId(
              event.target.value
            )
            setFoundTeam(null)
            setError("")
          }}
          placeholder="Paste team ID..."
          className="flex-1 rounded-2xl border border-white/10 bg-slate-950/85 px-4 py-3 text-sm outline-none transition-all placeholder:text-slate-500 focus:border-emerald-400/35"
        />

        <button
          type="submit"
          className="rounded-2xl bg-sky-500/15 px-5 py-3 text-sm font-bold text-sky-200 transition-all hover:bg-sky-500/25 active:scale-95"
        >
          Find Team
        </button>
      </form>

      {error && (
        <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      )}

      {foundTeam && (
        <div className="animate-pop-in rounded-2xl border border-white/10 bg-white/[0.04] p-4">
          <div className="flex flex-wrap items-center gap-2">
            <div className="text-lg font-black">
              {foundTeam.teamName}
            </div>

            <span className="rounded-full bg-white/[0.06] px-2.5 py-1 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
              {
                foundTeam.players
                  .length
              }{" "}
              players
            </span>
          </div>

          <div className="mt-1 text-sm text-slate-400">
            Captain:{" "}
            {foundTeam.captain ||
              "Not set"}
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {foundTeam.players.map(
              (player) => (
                <span
                  key={player}
                  className="rounded-full border border-white/8 bg-black/35 px-3 py-1 text-xs text-slate-200"
                >
                  {player}
                </span>
              )
            )}
          </div>

          <button
            onClick={handleImport}
            disabled={importing}
            className="mt-4 w-full rounded-full bg-emerald-500 px-4 py-2.5 text-sm font-bold text-slate-950 transition-all hover:bg-emerald-400 active:scale-95 disabled:opacity-60 sm:w-auto"
          >
            {importing
              ? "Importing..."
              : "Import As My Team (Editable)"}
          </button>
        </div>
      )}
    </div>
  )
}
