import {
  useEffect,
  useState,
} from "react"

const EMPTY_PLAYERS = [
  "",
  "",
  "",
  "",
  "",
]

const createInitialState = (
  initialTeam
) => ({
  teamName: initialTeam?.teamName || "",
  players:
    initialTeam?.players?.length > 0
      ? [...initialTeam.players]
      : [...EMPTY_PLAYERS],
  captain: initialTeam?.captain || "",
})

export default function CreateTeam({
  initialTeam = null,
  mode = "create",
  onCancel,
  onSubmit,
}) {
  const [teamName, setTeamName] =
    useState("")

  const [players, setPlayers] =
    useState(EMPTY_PLAYERS)

  const [captain, setCaptain] =
    useState("")

  const [submitting, setSubmitting] =
    useState(false)

  useEffect(() => {
    const nextState =
      createInitialState(initialTeam)

    setTeamName(nextState.teamName)
    setPlayers(nextState.players)
    setCaptain(nextState.captain)
  }, [initialTeam])

  const handlePlayerChange = (
    index,
    value
  ) => {
    const updatedPlayers = [...players]

    updatedPlayers[index] = value

    setPlayers(updatedPlayers)
  }

  const addPlayerField = () => {
    if (players.length >= 15) {
      return
    }

    setPlayers((previousPlayers) => [
      ...previousPlayers,
      "",
    ])
  }

  const removePlayerField = (
    index
  ) => {
    if (players.length <= 2) {
      return
    }

    const updatedPlayers =
      players.filter(
        (_, playerIndex) =>
          playerIndex !== index
      )

    setPlayers(updatedPlayers)

    if (captain === players[index]) {
      setCaptain("")
    }
  }

  const resetForm = () => {
    const nextState =
      createInitialState(null)

    setTeamName(nextState.teamName)
    setPlayers(nextState.players)
    setCaptain(nextState.captain)
  }

  const handleSubmit = async () => {
    const trimmedTeamName =
      teamName.trim()

    const filteredPlayers =
      players
        .map((player) =>
          player.trim()
        )
        .filter(Boolean)

    if (!trimmedTeamName) {
      alert("Enter Team Name")
      return
    }

    if (filteredPlayers.length < 2) {
      alert(
        "Add at least 2 players"
      )
      return
    }

    if (!captain) {
      alert("Select Captain")
      return
    }

    setSubmitting(true)

    const isSaved = await onSubmit({
      teamName: trimmedTeamName,
      players: filteredPlayers,
      captain,
    })

    setSubmitting(false)

    if (!isSaved) {
      return
    }

    if (mode === "create") {
      resetForm()
      return
    }

    onCancel?.()
  }

  const title =
    mode === "edit"
      ? "Edit Team"
      : "Create Team"

  const submitLabel =
    mode === "edit"
      ? "Update Team"
      : "Create Team"

  const captainOptions = players
    .map((player) => player.trim())
    .filter(Boolean)

  return (
    <div
      className="
        bg-zinc-900
        p-6
        rounded-2xl
        mt-6
      "
    >
      <div
        className="
          flex
          items-center
          justify-between
          gap-3
          mb-6
        "
      >
        <h2
          className="
            text-2xl
            font-bold
          "
        >
          {title}
        </h2>

        {mode === "edit" && (
          <button
            onClick={onCancel}
            className="
              rounded-xl
              bg-zinc-800
              px-4
              py-2
              font-semibold
              hover:bg-zinc-700
              transition-all
            "
          >
            Cancel
          </button>
        )}
      </div>

      <input
        type="text"
        placeholder="Team Name"
        value={teamName}
        onChange={(event) =>
          setTeamName(
            event.target.value
          )
        }
        className="
          w-full
          p-3
          rounded-xl
          bg-black
          mb-4
        "
      />

      <div className="space-y-3">
        {players.map(
          (player, index) => (
            <div
              key={index}
              className="
                flex
                gap-2
              "
            >
              <input
                type="text"
                placeholder={`Player ${index + 1}`}
                value={player}
                onChange={(event) =>
                  handlePlayerChange(
                    index,
                    event.target.value
                  )
                }
                className="
                  flex-1
                  p-3
                  rounded-xl
                  bg-black
                "
              />

              <button
                onClick={() =>
                  removePlayerField(
                    index
                  )
                }
                className="
                  bg-red-600
                  px-4
                  rounded-xl
                  font-bold
                "
              >
                X
              </button>
            </div>
          )
        )}
      </div>

      <button
        onClick={addPlayerField}
        className="
          bg-blue-600
          hover:bg-blue-700
          transition-all
          px-5
          py-3
          rounded-xl
          mt-4
          font-bold
        "
      >
        + Add Player
      </button>

      <select
        value={captain}
        onChange={(event) =>
          setCaptain(
            event.target.value
          )
        }
        className="
          w-full
          p-3
          rounded-xl
          bg-black
          mt-4
        "
      >
        <option value="">
          Select Captain
        </option>

        {captainOptions.map(
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
        onClick={handleSubmit}
        disabled={submitting}
        className="
          bg-green-600
          hover:bg-green-700
          transition-all
          px-6
          py-3
          rounded-xl
          mt-6
          w-full
          font-bold
          disabled:opacity-50
          disabled:cursor-not-allowed
        "
      >
        {submitting
          ? "Saving..."
          : submitLabel}
      </button>
    </div>
  )
}
