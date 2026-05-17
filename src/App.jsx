import { useState, useEffect } from "react"

import { db } from "./firebase"

import {
  collection,
  getDocs,
  addDoc,
} from "firebase/firestore"

import Navbar from "./components/Navbar"
import ScoreBoard from "./components/ScoreBoard"
import MatchControls from "./components/MatchControls"
import BallHistory from "./components/BallHistory"
import FallOfWickets from "./components/FallOfWickets"
import BattingScorecard from "./components/BattingScorecard"
import BowlingScorecard from "./components/BowlingScorecard"
import MatchSetup from "./components/MatchSetup"
import MatchHistory from "./components/MatchHistory"

import CreateTeam from "./pages/CreateTeam"

export default function App() {

  // SCORE STATES
  const [score, setScore] = useState(0)

  const [wickets, setWickets] = useState(0)

  const [balls, setBalls] = useState(0)

  // MATCH STATES
  const [maxOvers, setMaxOvers] =
    useState(2)

  const [innings, setInnings] =
    useState(1)

  const [target, setTarget] =
    useState(null)

  const [winner, setWinner] =
    useState("")

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
      },
      {
        name: "Batsman 2",
        runs: 0,
        balls: 0,
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

      alert("Error Loading Teams")
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

  // LOAD DATA ON START
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

      console.log(
        "Match Saved"
      )

    } catch (error) {

      console.log(error)

      alert("Error Saving Match")
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

      alert(
        `Innings Over! Target is ${updatedScore + 1}`
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

      alert("Match Finished!")

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

      alert("Match Finished!")
    }
  }

  // ADD RUNS
  const addRuns = (runs) => {

    const updatedScore =
      score + runs

    const updatedBalls =
      balls + 1

    setScore(updatedScore)

    setBalls(updatedBalls)

    setHistory(prev => [
      ...prev,
      runs,
    ])

    // BATTER UPDATE
    setBatters(prev => {

      const updated = [...prev]

      updated[currentStriker].runs += runs

      updated[currentStriker].balls += 1

      return updated
    })

    // BOWLER UPDATE
    setBowler(prev => ({
      ...prev,
      runs: prev.runs + runs,
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

    if (freeHit) {

      alert(
        "Cannot get out on Free Hit!"
      )

      setBalls(prev => prev + 1)

      setHistory(prev => [
        ...prev,
        "FH",
      ])

      setFreeHit(false)

      return
    }

    const updatedBalls =
      balls + 1

    const newWicket =
      wickets + 1

    const wicketInfo =
      `${score}/${newWicket} (${Math.floor(balls / 6)}.${balls % 6})`

    setWickets(newWicket)

    setBalls(updatedBalls)

    setHistory(prev => [
      ...prev,
      "W",
    ])

    // FALL OF WICKETS
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

    setScore(prev => prev + 1)

    setHistory(prev => [
      ...prev,
      "Wd",
    ])

    setBowler(prev => ({
      ...prev,
      runs: prev.runs + 1,
    }))
  }

  // NO BALL
  const addNoBall = () => {

    setScore(prev => prev + 1)

    setHistory(prev => [
      ...prev,
      "Nb",
    ])

    setBowler(prev => ({
      ...prev,
      runs: prev.runs + 1,
    }))

    setFreeHit(true)
  }

  // OVERS
  const overs =
    `${Math.floor(balls / 6)}.${balls % 6}`

  return (
    <div className="min-h-screen bg-black text-white">

      <Navbar />

      <div className="p-6 max-w-4xl mx-auto">

        {/* OVERS INPUT */}
        <div className="mb-6">

          <label className="block mb-2">
            Total Overs
          </label>

          <input
            type="number"
            value={maxOvers}
            onChange={(e) =>
              setMaxOvers(
                Number(e.target.value)
              )
            }
            className="bg-zinc-800 p-3 rounded-xl w-full"
          />

        </div>

        {/* SCOREBOARD */}
        <ScoreBoard
          score={score}
          wickets={wickets}
          overs={overs}
          freeHit={freeHit}
          teamA={
            innings === 1
              ? teamA
              : teamB
          }
          innings={innings}
          target={target}
          winner={winner}
        />

        {/* BATTING */}
        <BattingScorecard
          batters={batters}
          currentStriker={
            currentStriker
          }
        />

        {/* BOWLING */}
        <BowlingScorecard
          bowler={bowler}
        />

        {/* CONTROLS */}
        <MatchControls
          addRuns={addRuns}
          addWicket={addWicket}
          addWide={addWide}
          addNoBall={addNoBall}
        />

        {/* BALL HISTORY */}
        <BallHistory
          history={history}
        />

        {/* FALL OF WICKETS */}
        <FallOfWickets
          fallOfWickets={
            fallOfWickets
          }
        />

        {/* CREATE TEAM */}
        <CreateTeam
          addTeam={addTeam}
        />

        {/* MATCH SETUP */}
        <MatchSetup
          teams={teams}
          setTeamA={setTeamA}
          setTeamB={setTeamB}
        />

        {/* MATCH HISTORY */}
        <MatchHistory
          matches={matches}
        />

      </div>

    </div>
  )
}