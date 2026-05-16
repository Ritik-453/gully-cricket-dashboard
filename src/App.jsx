import { useState } from "react"

import Navbar from "./components/Navbar"
import ScoreBoard from "./components/ScoreBoard"
import MatchControls from "./components/MatchControls"
import BallHistory from "./components/BallHistory"
import FallOfWickets from "./components/FallOfWickets"
import CreateTeam from "./pages/CreateTeam"
import MatchSetup from "./components/MatchSetup"
import BattingScorecard from "./components/BattingScorecard"

export default function App() {

  const [score, setScore] = useState(0)
  const [wickets, setWickets] = useState(0)
  const [balls, setBalls] = useState(0)
  const [freeHit, setFreeHit] = useState(false)
  const [history, setHistory] = useState([])
  const [fallOfWickets, setFallOfWickets] = useState([])
  const [teams, setTeams] = useState([])
  const [teamA, setTeamA] = useState(null)
  const [teamB, setTeamB] = useState(null)

const addRuns = (runs) => {

    setScore(prev => prev + runs)

    setBalls(prev => prev + 1)

    setHistory(prev => [...prev, runs])

    setBatters(prev => {

      const updated = [...prev]

      updated[currentStriker].runs += runs

      updated[currentStriker].balls += 1

      return updated
    })

    if (
      runs === 1 ||
      runs === 3
    ) {
      setCurrentStriker(prev =>
        prev === 0 ? 1 : 0
      )
    }

    if (freeHit) {
      setFreeHit(false)
    }
  }

const addWicket = () => {

    if (freeHit) {

      alert("Cannot get out on Free Hit!")

      setBalls(prev => prev + 1)

      setHistory(prev => [...prev, "FH"])

      setFreeHit(false)

      return
    }

    const newWicket = wickets + 1

    const wicketInfo =
      `${score}/${newWicket} (${Math.floor(balls / 6)}.${balls % 6})`

    setWickets(newWicket)

    setBalls(prev => prev + 1)

    setHistory(prev => [...prev, "W"])

    setFallOfWickets(prev => [
      ...prev,
      wicketInfo,
    ])

    setBatters(prev => {

      const updated = [...prev]

      updated[currentStriker] = {
        name: `Batsman ${newWicket + 2}`,
        runs: 0,
        balls: 0,
      }

      return updated
    })
  }

  const addWide = () => {
    setScore(score + 1)

    setHistory(prev => [...prev, "Wd"])
  }

  const addNoBall = () => {
    setScore(score + 1)
    setFreeHit(true)

    setHistory(prev => [...prev, "Nb"])

    setfreeHit(true)
  }

  const overs =
    `${Math.floor(balls / 6)}.${balls % 6}`

  const addTeam = (team) => {
    setTeams(prev => [...prev, team])
  }

  const [batters, setBatters] = useState([
    {
      name: "Batsman 1",
      runs: 0,
      balls: 0,
    },
    {
      name: "Batsman 2",
      runs: 0,
      balls: 0,
    },
  ])

  const [currentStriker, setCurrentStriker] =
    useState(0)

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="p-6 max-w-2xl mx-auto">

        <ScoreBoard
          score={score}
          wickets={wickets}
          overs={overs}
          freeHit={freeHit}
          teamA={teamA}
        />

        <MatchControls
          addRuns={addRuns}
          addWicket={addWicket}
          addWide={addWide}
          addNoBall={addNoBall}
        />

        <BallHistory history={history} />

        <FallOfWickets
          fallOfWickets={fallOfWickets}
        />

        <CreateTeam addTeam={addTeam} />

        <MatchSetup
          teams={teams}
          setTeamA={setTeamA}
          setTeamB={setTeamB}
        />

        <BattingScorecard
          batters={batters}
          currentStriker={currentStriker}
        />

      </div>
    </div>
  )
}