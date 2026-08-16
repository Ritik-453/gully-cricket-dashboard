import { useMemo, useState } from "react"

const stripWonSuffix = (winner) =>
  (winner || "")
    .replace(/\s+Won$/i, "")
    .trim()

const buildTeamRecords = (
  matches
) => {
  const table = {}

  const ensureTeam = (name) => {
    if (!name) return null

    if (!table[name]) {
      table[name] = {
        name,
        played: 0,
        won: 0,
        lost: 0,
      }
    }

    return table[name]
  }

  matches.forEach((match) => {
    const teamAEntry = ensureTeam(
      match.teamA
    )
    const teamBEntry = ensureTeam(
      match.teamB
    )

    const winnerName =
      stripWonSuffix(match.winner)

    if (teamAEntry) {
      teamAEntry.played += 1
    }

    if (teamBEntry) {
      teamBEntry.played += 1
    }

    if (
      winnerName &&
      table[winnerName]
    ) {
      table[winnerName].won += 1
    }

    ;[
      match.teamA,
      match.teamB,
    ].forEach((name) => {
      if (
        name &&
        name !== winnerName &&
        table[name]
      ) {
        table[name].lost += 1
      }
    })
  })

  return Object.values(table)
    .map((team) => ({
      ...team,
      winPct:
        team.played > 0
          ? Math.round(
              (team.won /
                team.played) *
                100
            )
          : 0,
    }))
    .sort(
      (a, b) =>
        b.won - a.won ||
        b.winPct - a.winPct ||
        a.name.localeCompare(b.name)
    )
}

const buildPlayerRecords = (
  matches
) => {
  const table = {}

  const ensurePlayer = (name) => {
    if (!name) return null

    if (!table[name]) {
      table[name] = {
        name,
        matchIds: new Set(),
        runs: 0,
        fours: 0,
        sixes: 0,
        wickets: 0,
      }
    }

    return table[name]
  }

  matches.forEach((match) => {
    ;(match.batters || []).forEach(
      (batter) => {
        const entry = ensurePlayer(
          batter.name
        )
        if (!entry) return

        entry.matchIds.add(match.id)
        entry.runs +=
          batter.runs || 0
        entry.fours +=
          batter.fours || 0
        entry.sixes +=
          batter.sixes || 0
      }
    )

    ;(match.bowlers || []).forEach(
      (bowler) => {
        const entry = ensurePlayer(
          bowler.name
        )
        if (!entry) return

        entry.matchIds.add(match.id)
        entry.wickets +=
          bowler.wickets || 0
      }
    )
  })

  return Object.values(table)
    .map((player) => ({
      ...player,
      matchesPlayed:
        player.matchIds.size,
    }))
    .sort(
      (a, b) =>
        b.runs - a.runs ||
        b.wickets - a.wickets
    )
}

export default function RecordsBoard({
  matches,
}) {
  const [view, setView] = useState(
    "teams"
  )

  const teamRecords = useMemo(
    () =>
      buildTeamRecords(matches),
    [matches]
  )

  const playerRecords = useMemo(
    () =>
      buildPlayerRecords(matches),
    [matches]
  )

  if (matches.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-white/10 bg-zinc-900/60 p-8 text-center text-slate-400">
        Finish a match to start building team and player records.
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2 rounded-2xl border border-white/10 bg-slate-950/60 p-1.5">
        <button
          onClick={() =>
            setView("teams")
          }
          className={`
            flex-1
            rounded-xl
            px-3
            py-2.5
            text-sm
            font-bold
            transition-all
            active:scale-95
            ${
              view === "teams"
                ? "bg-emerald-500 text-slate-950"
                : "text-slate-300 hover:bg-white/[0.05]"
            }
          `}
        >
          Team Records
        </button>

        <button
          onClick={() =>
            setView("players")
          }
          className={`
            flex-1
            rounded-xl
            px-3
            py-2.5
            text-sm
            font-bold
            transition-all
            active:scale-95
            ${
              view === "players"
                ? "bg-sky-500 text-slate-950"
                : "text-slate-300 hover:bg-white/[0.05]"
            }
          `}
        >
          Player Records
        </button>
      </div>

      {view === "teams" ? (
        <div className="animate-pop-in rounded-2xl bg-zinc-900 p-4 md:p-6">
          <div className="-mx-4 overflow-x-auto px-4 md:mx-0 md:px-0">
            <table className="w-full min-w-[420px] text-sm md:text-base">
              <thead>
                <tr className="border-b border-zinc-600 text-left">
                  <th className="pb-3 pr-2">
                    Team
                  </th>
                  <th className="px-2 text-right">
                    Played
                  </th>
                  <th className="px-2 text-right">
                    Won
                  </th>
                  <th className="px-2 text-right">
                    Lost
                  </th>
                  <th className="pl-2 text-right">
                    Win %
                  </th>
                </tr>
              </thead>

              <tbody>
                {teamRecords.map(
                  (team, index) => (
                    <tr
                      key={team.name}
                      className="border-b border-zinc-800"
                    >
                      <td className="py-3 pr-2 font-semibold md:py-4">
                        {index ===
                          0 && (
                          <span className="mr-1.5">
                            🏆
                          </span>
                        )}
                        {team.name}
                      </td>
                      <td className="px-2 text-right">
                        {team.played}
                      </td>
                      <td className="px-2 text-right text-emerald-400">
                        {team.won}
                      </td>
                      <td className="px-2 text-right text-red-400">
                        {team.lost}
                      </td>
                      <td className="pl-2 text-right">
                        {team.winPct}%
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="animate-pop-in rounded-2xl bg-zinc-900 p-4 md:p-6">
          <div className="-mx-4 overflow-x-auto px-4 md:mx-0 md:px-0">
            <table className="w-full min-w-[460px] text-sm md:text-base">
              <thead>
                <tr className="border-b border-zinc-600 text-left">
                  <th className="pb-3 pr-2">
                    Player
                  </th>
                  <th className="px-2 text-right">
                    Matches
                  </th>
                  <th className="px-2 text-right">
                    Runs
                  </th>
                  <th className="px-2 text-right">
                    4s
                  </th>
                  <th className="px-2 text-right">
                    6s
                  </th>
                  <th className="pl-2 text-right">
                    Wkts
                  </th>
                </tr>
              </thead>

              <tbody>
                {playerRecords.map(
                  (player, index) => (
                    <tr
                      key={
                        player.name
                      }
                      className="border-b border-zinc-800"
                    >
                      <td className="py-3 pr-2 font-semibold md:py-4">
                        {index ===
                          0 && (
                          <span className="mr-1.5">
                            ⭐
                          </span>
                        )}
                        {player.name}
                      </td>
                      <td className="px-2 text-right">
                        {
                          player.matchesPlayed
                        }
                      </td>
                      <td className="px-2 text-right">
                        {player.runs}
                      </td>
                      <td className="px-2 text-right">
                        {player.fours}
                      </td>
                      <td className="px-2 text-right">
                        {player.sixes}
                      </td>
                      <td className="pl-2 text-right">
                        {
                          player.wickets
                        }
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
