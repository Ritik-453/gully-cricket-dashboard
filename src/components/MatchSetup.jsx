import {
  useEffect,
  useState,
} from "react"

const getTeamKey = (team) =>
  team?.id || team?.teamName || ""

export default function MatchSetup({
  battingTeam,
  bowlingTeam,
  innings,
  inningsReady,
  matchLocked,
  pendingBatterSelection,
  pendingBowlerSelection,
  remainingBatters,
  selectBowler,
  selectNextBatter,
  setTeamA,
  setTeamB,
  startInnings,
  teamA,
  teamB,
  teams,
}) {
  const [openerOne, setOpenerOne] =
    useState("")

  const [openerTwo, setOpenerTwo] =
    useState("")

  const [
    startingBowler,
    setStartingBowler,
  ] = useState("")

  const [nextBatter, setNextBatter] =
    useState("")

  const [nextBowler, setNextBowler] =
    useState("")

  const battingPlayers =
    battingTeam?.players || []

  const bowlingPlayers =
    bowlingTeam?.players || []

  const nextBowlerOptions =
    pendingBowlerSelection &&
    bowlingPlayers.length > 1
      ? bowlingPlayers.filter(
          (player) =>
            player !==
            pendingBowlerSelection.previousBowlerName
        )
      : bowlingPlayers

  useEffect(() => {
    setOpenerOne("")
    setOpenerTwo("")
    setStartingBowler("")
  }, [
    innings,
    battingTeam?.teamName,
    bowlingTeam?.teamName,
    inningsReady,
  ])

  useEffect(() => {
    setNextBatter("")
  }, [
    innings,
    pendingBatterSelection?.dismissedName,
  ])

  useEffect(() => {
    setNextBowler("")
  }, [
    innings,
    pendingBowlerSelection?.previousBowlerName,
  ])

  const handleTeamSelect = (
    selectedKey,
    setter
  ) => {
    const selectedTeam =
      teams.find(
        (team) =>
          getTeamKey(team) ===
          selectedKey
      ) || null

    setter(selectedTeam)
  }

  return (
    <div
      className="
        bg-zinc-900
        p-6
        rounded-2xl
        mt-6
      "
    >
      <h2
        className="
          text-2xl
          font-bold
          mb-6
        "
      >
        Match Setup
      </h2>

      <div className="space-y-4">
        <select
          value={getTeamKey(teamA)}
          disabled={matchLocked}
          onChange={(event) =>
            handleTeamSelect(
              event.target.value,
              setTeamA
            )
          }
          className="
            w-full
            p-3
            rounded-xl
            bg-black
            disabled:opacity-50
            disabled:cursor-not-allowed
          "
        >
          <option value="">
            Select Team A
          </option>

          {teams.map((team) => (
            <option
              key={getTeamKey(team)}
              value={getTeamKey(team)}
            >
              {team.teamName}
            </option>
          ))}
        </select>

        <select
          value={getTeamKey(teamB)}
          disabled={matchLocked}
          onChange={(event) =>
            handleTeamSelect(
              event.target.value,
              setTeamB
            )
          }
          className="
            w-full
            p-3
            rounded-xl
            bg-black
            disabled:opacity-50
            disabled:cursor-not-allowed
          "
        >
          <option value="">
            Select Team B
          </option>

          {teams.map((team) => (
            <option
              key={getTeamKey(team)}
              value={getTeamKey(team)}
            >
              {team.teamName}
            </option>
          ))}
        </select>
      </div>

      {battingTeam && bowlingTeam && (
        <div
          className="
            mt-6
            rounded-2xl
            bg-black/40
            border
            border-zinc-800
            p-4
            space-y-2
          "
        >
          <div className="text-sm text-zinc-400">
            Innings {innings}
          </div>

          <div className="font-semibold">
            Batting:
            {" "}
            {battingTeam.teamName}
          </div>

          <div className="font-semibold">
            Bowling:
            {" "}
            {bowlingTeam.teamName}
          </div>
        </div>
      )}

      {battingTeam &&
        bowlingTeam &&
        !inningsReady && (
          <div className="mt-6 space-y-4">
            <h3 className="text-lg font-semibold">
              Start Innings
            </h3>

            <select
              value={openerOne}
              onChange={(event) =>
                setOpenerOne(
                  event.target.value
                )
              }
              className="
                w-full
                p-3
                rounded-xl
                bg-black
              "
            >
              <option value="">
                Select Opening Batter 1
              </option>

              {battingPlayers.map(
                (player) => (
                  <option
                    key={player}
                    value={player}
                  >
                    {player}
                  </option>
                )
              )}
            </select>

            <select
              value={openerTwo}
              onChange={(event) =>
                setOpenerTwo(
                  event.target.value
                )
              }
              className="
                w-full
                p-3
                rounded-xl
                bg-black
              "
            >
              <option value="">
                Select Opening Batter 2
              </option>

              {battingPlayers
                .filter(
                  (player) =>
                    player !==
                    openerOne
                )
                .map((player) => (
                  <option
                    key={player}
                    value={player}
                  >
                    {player}
                  </option>
                ))}
            </select>

            <select
              value={startingBowler}
              onChange={(event) =>
                setStartingBowler(
                  event.target.value
                )
              }
              className="
                w-full
                p-3
                rounded-xl
                bg-black
              "
            >
              <option value="">
                Select Starting Bowler
              </option>

              {bowlingPlayers.map(
                (player) => (
                  <option
                    key={player}
                    value={player}
                  >
                    {player}
                  </option>
                )
              )}
            </select>

            <button
              onClick={() =>
                startInnings(
                  openerOne,
                  openerTwo,
                  startingBowler
                )
              }
              className="
                w-full
                rounded-xl
                bg-green-600
                hover:bg-green-700
                transition-all
                py-3
                font-bold
              "
            >
              Start Innings
            </button>
          </div>
        )}

      {pendingBatterSelection && (
        <div className="mt-6 space-y-4">
          <h3 className="text-lg font-semibold">
            Next Batter
          </h3>

          <div className="text-sm text-zinc-400">
            {pendingBatterSelection.dismissedName}
            {" "}
            is out.
          </div>

          <select
            value={nextBatter}
            onChange={(event) =>
              setNextBatter(
                event.target.value
              )
            }
            className="
              w-full
              p-3
              rounded-xl
              bg-black
            "
          >
            <option value="">
              Select Next Batter
            </option>

            {remainingBatters.map(
              (player) => (
                <option
                  key={player}
                  value={player}
                >
                  {player}
                </option>
              )
            )}
          </select>

          <button
            onClick={() =>
              selectNextBatter(
                nextBatter
              )
            }
            className="
              w-full
              rounded-xl
              bg-blue-600
              hover:bg-blue-700
              transition-all
              py-3
              font-bold
            "
          >
            Confirm Batter
          </button>
        </div>
      )}

      {pendingBowlerSelection && (
        <div className="mt-6 space-y-4">
          <h3 className="text-lg font-semibold">
            Next Bowler
          </h3>

          <select
            value={nextBowler}
            onChange={(event) =>
              setNextBowler(
                event.target.value
              )
            }
            className="
              w-full
              p-3
              rounded-xl
              bg-black
            "
          >
            <option value="">
              Select Next Bowler
            </option>

            {nextBowlerOptions.map(
              (player) => (
                <option
                  key={player}
                  value={player}
                >
                  {player}
                </option>
              )
            )}
          </select>

          <button
            onClick={() =>
              selectBowler(
                nextBowler
              )
            }
            className="
              w-full
              rounded-xl
              bg-purple-600
              hover:bg-purple-700
              transition-all
              py-3
              font-bold
            "
          >
            Confirm Bowler
          </button>
        </div>
      )}
    </div>
  )
}
