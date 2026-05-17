import { useState } from "react"

import { db } from "../firebase"

import {
  collection,
  addDoc,
} from "firebase/firestore"

export default function CreateTeam({
  addTeam,
}) {

  const [teamName, setTeamName] =
    useState("")

  const [players, setPlayers] =
    useState([
      "",
      "",
      "",
      "",
      "",
    ])

  const [captain, setCaptain] =
    useState("")

  // PLAYER INPUT CHANGE
  const handlePlayerChange = (
    index,
    value
  ) => {

    const updatedPlayers = [...players]

    updatedPlayers[index] = value

    setPlayers(updatedPlayers)
  }

  // CREATE TEAM
  const createTeam = async () => {

    // VALIDATION
    if (!teamName) {
      alert("Enter Team Name")
      return
    }

    if (!captain) {
      alert("Select Captain")
      return
    }

    const filteredPlayers =
      players.filter(
        player => player.trim() !== ""
      )

    if (filteredPlayers.length < 2) {
      alert(
        "Add at least 2 players"
      )
      return
    }

    const team = {
      teamName,
      players: filteredPlayers,
      captain,
      createdAt:
        new Date().toISOString(),
    }

    try {

      // SAVE TO FIREBASE
      await addDoc(
        collection(db, "teams"),
        team
      )

      // SAVE TO LOCAL STATE
      addTeam(team)

      alert("Team Saved Successfully!")

      // RESET FORM
      setTeamName("")

      setPlayers([
        "",
        "",
        "",
        "",
        "",
      ])

      setCaptain("")

    } catch (error) {

      console.log(error)

      alert("Error Saving Team")
    }
  }

  return (
    <div className="bg-zinc-900 p-6 rounded-2xl mt-6">

      <h2 className="text-2xl font-bold mb-6">
        Create Team
      </h2>

      {/* TEAM NAME */}
      <input
        type="text"
        placeholder="Team Name"
        value={teamName}
        onChange={(e) =>
          setTeamName(e.target.value)
        }
        className="w-full p-3 rounded-xl bg-black mb-4"
      />

      {/* PLAYERS */}
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

      {/* CAPTAIN */}
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
              {
                player ||
                `Player ${index + 1}`
              }
            </option>
          ))
        }

      </select>

      {/* BUTTON */}
      <button
        onClick={createTeam}
        className="bg-green-600 hover:bg-green-700 transition-all px-6 py-3 rounded-xl mt-6 w-full font-bold"
      >
        Create Team
      </button>

    </div>
  )
}