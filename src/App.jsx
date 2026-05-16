import { useState } from "react"

import Navbar from "./components/Navbar"
import ScoreBoard from "./components/ScoreBoard"
import MatchControls from "./components/MatchControls"
import BallHistory from "./components/BallHistory"
import FallOfWickets from "./components/FallOfWickets"
import CreateTeam from "./pages/CreateTeam"

export default function App() {

  const [score, setScore] = useState(0)
  const [wickets, setWickets] = useState(0)
  const [balls, setBalls] = useState(0)
  const [freeHit, setFreeHit] = useState(false)
  const [history, setHistory] = useState([])
  const [fallOfWickets, setFallOfWickets] = useState([])

  const addRuns = (runs) => {

    setScore(prev => prev + runs)
    setBalls(prev => prev + 1)

    setHistory(prev => [...prev, runs])

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

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="p-6 max-w-2xl mx-auto">

        <ScoreBoard
          score={score}
          wickets={wickets}
          overs={overs}
          freeHit={freeHit}
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

        <CreateTeam />

      </div>
    </div>
  )
}