import { useState } from "react"

export default function CreateTeam() {

  const [teamName, setTeamName] = useState("")
  const [players, setPlayers] = useState([
    "",
    "",
    "",
    "",
    "",
  ])

  const [captain, setCaptain] = useState("")

  const handlePlayerChange = (
    index,
    value
  ) => {

    const updatedPlayers = [...players]

    updatedPlayers[index] = value

    setPlayers(updatedPlayers)
  }

  const createTeam = () => {

    const team = {
      teamName,
      players,
      captain,
    }

    console.log(team)

    alert("Team Created!")
  }

  return (
    <div className="bg-zinc-900 p-6 rounded-2xl mt-6">

      <h2 className="text-2xl font-bold mb-6">
        Create Team
      </h2>

      <input
        type="text"
        placeholder="Team Name"
        value={teamName}
        onChange={(e) =>
          setTeamName(e.target.value)
        }
        className="w-full p-3 rounded-xl bg-black mb-4"
      />

      <div className="space-y-3">

        {
          players.map((player, index) => (
            <input
              key={index}
              type="text"
              placeholder={`Player ${index + 1}`}
              value={player}
              onChange={(e) =>
                handlePlayerChange(
                  index,
                  e.target.value
                )
              }
              className="w-full p-3 rounded-xl bg-black"
            />
          ))
        }

      </div>

      <select
        value={captain}
        onChange={(e) =>
          setCaptain(e.target.value)
        }
        className="w-full p-3 rounded-xl bg-black mt-4"
      >

        <option value="">
          Select Captain
        </option>

        {
          players.map((player, index) => (
            <option
              key={index}
              value={player}
            >
              {player || `Player ${index + 1}`}
            </option>
          ))
        }

      </select>

      <button
        onClick={createTeam}
        className="bg-green-600 px-6 py-3 rounded-xl mt-6 w-full"
      >
        Create Team
      </button>

    </div>
  )
}