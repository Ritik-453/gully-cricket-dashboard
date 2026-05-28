import { useState, useEffect } from "react"

import {
  Routes,
  Route,
} from "react-router-dom"

import { db } from "./firebase"

import {
  collection,
  getDocs,
  addDoc,
} from "firebase/firestore"

import Navbar from "./components/Navbar"
import Toast from "./components/Toast"
import ExtrasCard from "./components/ExtrasCard"

import Home from "./pages/Home"
import Teams from "./pages/Teams"
import History from "./pages/History"
import LiveMatch from "./pages/LiveMatch"

export default function App() {

  // SCORE STATES
  const [score, setScore] = useState(0)

  const [wickets, setWickets] =
    useState(0)

  const [balls, setBalls] =
    useState(0)

  // MATCH STATES
  const [maxOvers, setMaxOvers] =
    useState(2)

  const [innings, setInnings] =
    useState(1)

  const [target, setTarget] =
    useState(null)

  const [winner, setWinner] =
    useState("")
  
  // TOAST
  const [toast, setToast] =
    useState("")

  // NO BALL FLOW
  const [pendingNoBall, setPendingNoBall] =
    useState(false)

  // EXTRAS
  const [extras, setExtras] =
    useState({
      wides: 0,
      noBalls: 0,
    })

  const [matches, setMatches] =
    useState([])

  // FREE HIT
  const [freeHit, setFreeHit] =
    useState(false)

  // HISTORY
  const [history, setHistory] =
    useState([])

  // FALL OF WICKETS
  const [
    fallOfWickets,
    setFallOfWickets,
  ] = useState([])

  // TEAMS
  const [teams, setTeams] =
    useState([])

  const [teamA, setTeamA] =
    useState(null)

  const [teamB, setTeamB] =
    useState(null)

  // BATTERS
  const [batters, setBatters] =
    useState([
      {
        name: "Batsman 1",
        runs: 0,
        balls: 0,
        fours: 0,
        sixes: 0,
      },
      {
        name: "Batsman 2",
        runs: 0,
        balls: 0,
        fours: 0,
        sixes: 0,
      },
    ])

  const [
    currentStriker,
    setCurrentStriker,
  ] = useState(0)

  // BOWLER
  const [bowler, setBowler] =
    useState({
      name: "Bowler 1",
      runs: 0,
      wickets: 0,
      balls: 0,
    })

  // LOAD TEAMS
  const loadTeams = async () => {

    try {

      const querySnapshot =
        await getDocs(
          collection(db, "teams")
        )

      const loadedTeams = []

      querySnapshot.forEach((doc) => {

        loadedTeams.push({
          id: doc.id,
          ...doc.data(),
        })

      })

      setTeams(loadedTeams)

    } catch (error) {

      console.log(error)
    }
  }

  // LOAD MATCHES
  const loadMatches = async () => {

    try {

      const querySnapshot =
        await getDocs(
          collection(db, "matches")
        )

      const loadedMatches = []

      querySnapshot.forEach((doc) => {

        loadedMatches.push({
          id: doc.id,
          ...doc.data(),
        })

      })

      setMatches(loadedMatches)

    } catch (error) {

      console.log(error)
    }
  }

  useEffect(() => {

    loadTeams()

    loadMatches()

  }, [])

  // CREATE TEAM
  const addTeam = (team) => {

    setTeams(prev => [
      ...prev,
      team,
    ])
  }

  // RESET MATCH
  const resetMatch = () => {

    setScore(0)

    setWickets(0)

    setBalls(0)

    setFreeHit(false)

    setHistory([])

    setFallOfWickets([])

    setBatters([
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

    setBowler({
      name: "Bowler 1",
      runs: 0,
      wickets: 0,
      balls: 0,
    })

    setCurrentStriker(0)
  }

  // SAVE MATCH
  const saveMatch = async (
    winnerName
  ) => {

    const overs =
      `${Math.floor(balls / 6)}.${balls % 6}`

    const matchData = {

      teamA:
        teamA?.teamName || "Team A",

      teamB:
        teamB?.teamName || "Team B",

      winner: winnerName,

      score: `${score}/${wickets}`,

      overs,

      target,

      innings,

      fallOfWickets,

      history,

      createdAt:
        new Date().toISOString(),
    }

    try {

      await addDoc(
        collection(db, "matches"),
        matchData
      )

      loadMatches()

    } catch (error) {

      console.log(error)
    }
  }

  // MATCH END LOGIC
  const checkMatchEnd = (
    updatedBalls,
    updatedScore,
    updatedWickets
  ) => {

    const totalBalls =
      maxOvers * 6

    // FIRST INNINGS END
    if (
      innings === 1 &&
      (
        updatedBalls >= totalBalls ||
        updatedWickets >= 10
      )
    ) {

      setTarget(updatedScore + 1)

      showToast(
        `🎯 Target: ${updatedScore + 1}`
      )

      resetMatch()

      setInnings(2)

      return
    }

    // SECOND INNINGS WIN
    if (
      innings === 2 &&
      target &&
      updatedScore >= target
    ) {

      const result =
        `${teamB?.teamName || "Team B"} Won`

      setWinner(result)

      saveMatch(result)

      showToast("🏆 Match Finished")

      return
    }

    // SECOND INNINGS LOSE
    if (
      innings === 2 &&
      (
        updatedBalls >= totalBalls ||
        updatedWickets >= 10
      )
    ) {

      const result =
        `${teamA?.teamName || "Team A"} Won`

      setWinner(result)

      saveMatch(result)

      showToast("🏆 Match Finished")
    }
  }

  // ADD RUNS
  const addRuns = (runs) => {

    if (winner) return

    let totalRuns = runs

    // NO BALL FLOW
    if (pendingNoBall) {

      totalRuns += 1

      setPendingNoBall(false)

      setFreeHit(true)
    }

    const updatedScore =
      score + totalRuns

    const updatedBalls =
      pendingNoBall
        ? balls
        : balls + 1

    setScore(updatedScore)

    setBalls(updatedBalls)

    setHistory(prev => [
      ...prev,
      totalRuns,
    ])

    // BATTER UPDATE
    setBatters(prev => {

      return prev.map((batter, index) => {

        if (index !== currentStriker) {
          return batter
        }

        return {

          ...batter,

          runs: batter.runs + runs,

          balls:
            pendingNoBall
              ? batter.balls
              : batter.balls + 1,

          fours:
            runs === 4
              ? batter.fours + 1
              : batter.fours,

          sixes:
            runs === 6
              ? batter.sixes + 1
              : batter.sixes,

        }
      })
    })

    // BOWLER UPDATE
    setBowler(prev => ({
      ...prev,
      runs: prev.runs + totalRuns,
      balls: prev.balls + 1,
    }))

    // STRIKE ROTATION
    if (
      runs === 1 ||
      runs === 3
    ) {

      setCurrentStriker(prev =>
        prev === 0 ? 1 : 0
      )
    }

    // OVER END ROTATION
    if (updatedBalls % 6 === 0) {

      setCurrentStriker(prev =>
        prev === 0 ? 1 : 0
      )
    }

    // FREE HIT RESET
    if (freeHit) {
      setFreeHit(false)
    }

    checkMatchEnd(
      updatedBalls,
      updatedScore,
      wickets
    )
  }

  // WICKET
  const addWicket = () => {

    if (winner) return

    if (freeHit) {

      showToast(
        "🏏 Cannot Out On Free Hit"
      )

      setFreeHit(false)

      return
    }

    const updatedBalls =
      balls + 1

    const newWicket =
      wickets + 1

    // FIXED FOW BUG
    const wicketInfo = {
      wicket: newWicket,
      score: score,
      batter:
        batters[currentStriker].name,
      over:
        `${Math.floor(updatedBalls / 6)}.${updatedBalls % 6}`,

    }

    setWickets(newWicket)

    setBalls(updatedBalls)

    setHistory(prev => [
      ...prev,
      "W",
    ])

    setFallOfWickets(prev => [
      ...prev,
      wicketInfo,
    ])

    // BOWLER UPDATE
    setBowler(prev => ({
      ...prev,
      wickets:
        prev.wickets + 1,
      balls: prev.balls + 1,
    }))

    // NEW BATTER
    setBatters(prev => {

      const updated = [...prev]

      updated[currentStriker] = {
        name: `Batsman ${newWicket + 2}`,
        runs: 0,
        balls: 0,
        fours: 0,
        sixes: 0,
      }

      return updated
    })

    checkMatchEnd(
      updatedBalls,
      score,
      newWicket
    )
  }

  // WIDE
  const addWide = () => {

    if (winner) return

    setScore(prev => prev + 1)

    setHistory(prev => [
      ...prev,
      "Wd",
    ])

    setExtras(prev => ({
      ...prev,
      wides: prev.wides + 1,
    }))

    setBowler(prev => ({
      ...prev,
      runs: prev.runs + 1,
    }))
  }

  // NO BALL
  const addNoBall = () => {

    if (winner) return

    setPendingNoBall(true)

    setExtras(prev => ({
      ...prev,
      noBalls:
        prev.noBalls + 1,
    }))

    showToast(
      "🏏 NO BALL"
    )
  }

  // OVERS
  const overs =
    `${Math.floor(balls / 6)}.${balls % 6}`

  const showToast = (msg) => {

    setToast(msg)

    setTimeout(() => {
      setToast("")
    }, 2500)
  }

  return (
    <div className="
        min-h-screen
        bg-gradient-to-br
        from-black
        via-zinc-900
        to-zinc-950
        text-white
      ">
      
      <Toast message={toast} />

      <Navbar />

      <div
        className="
          p-3
          md:p-6
          max-w-4xl
          mx-auto
        "
      >

        <Routes>

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/teams"
            element={
              <Teams
                addTeam={addTeam}
              />
            }
          />

          <Route
            path="/history"
            element={
              <History
                matches={matches}
              />
            }
          />

          <Route
            path="/live"
            element={
              <LiveMatch
                maxOvers={maxOvers}
                setMaxOvers={setMaxOvers}
                score={score}
                wickets={wickets}
                overs={overs}
                freeHit={freeHit}
                innings={innings}
                target={target}
                winner={winner}
                teamA={teamA}
                teamB={teamB}
                batters={batters}
                currentStriker={currentStriker}
                bowler={bowler}
                history={history}
                fallOfWickets={fallOfWickets}
                teams={teams}
                setTeamA={setTeamA}
                setTeamB={setTeamB}
                addRuns={addRuns}
                addWicket={addWicket}
                addWide={addWide}
                addNoBall={addNoBall}
                extras={extras}
                balls={balls}
                maxOvers={maxOvers}
              />
            }
          />

        </Routes>

      </div>

    </div>
  )
}