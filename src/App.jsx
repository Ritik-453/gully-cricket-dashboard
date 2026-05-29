import { useEffect, useState } from "react"
import { Routes, Route } from "react-router-dom"
import {
  addDoc,
  collection,
  getDocs,
} from "firebase/firestore"

import { db } from "./firebase"

import Navbar from "./components/Navbar"
import Toast from "./components/Toast"

import Home from "./pages/Home"
import Teams from "./pages/Teams"
import History from "./pages/History"
import LiveMatch from "./pages/LiveMatch"

const INITIAL_EXTRAS = {
  wides: 0,
  noBalls: 0,
}

const createBatterStats = (name) => ({
  name,
  runs: 0,
  balls: 0,
  fours: 0,
  sixes: 0,
})

const createBowlerStats = (name) => ({
  name,
  runs: 0,
  wickets: 0,
  balls: 0,
})

const formatOvers = (legalBalls) =>
  `${Math.floor(legalBalls / 6)}.${legalBalls % 6}`

const getTeamKey = (team) =>
  team?.id || team?.teamName || ""

const getOtherActiveBatter = (
  activeBatters,
  strikerName
) =>
  activeBatters.find(
    (name) => name !== strikerName
  ) || ""

const updateBowlerList = (
  bowlers,
  bowlerName,
  updater
) => {
  const existingBowler =
    bowlers.find(
      (bowler) =>
        bowler.name === bowlerName
    )

  if (!existingBowler) {
    return [
      ...bowlers,
      updater(
        createBowlerStats(bowlerName)
      ),
    ]
  }

  return bowlers.map((bowler) =>
    bowler.name === bowlerName
      ? updater(bowler)
      : bowler
  )
}

const sortMatches = (matches) =>
  [...matches].sort(
    (firstMatch, secondMatch) =>
      new Date(
        secondMatch.createdAt || 0
      ) -
      new Date(firstMatch.createdAt || 0)
  )

export default function App() {
  const [score, setScore] =
    useState(0)

  const [wickets, setWickets] =
    useState(0)

  const [balls, setBalls] =
    useState(0)

  const [maxOvers, setMaxOvers] =
    useState(2)

  const [innings, setInnings] =
    useState(1)

  const [target, setTarget] =
    useState(null)

  const [winner, setWinner] =
    useState("")

  const [toast, setToast] =
    useState("")

  const [
    pendingNoBall,
    setPendingNoBall,
  ] = useState(false)

  const [extras, setExtras] =
    useState(INITIAL_EXTRAS)

  const [matches, setMatches] =
    useState([])

  const [freeHit, setFreeHit] =
    useState(false)

  const [history, setHistory] =
    useState([])

  const [
    fallOfWickets,
    setFallOfWickets,
  ] = useState([])

  const [teams, setTeams] =
    useState([])

  const [teamA, setTeamA] =
    useState(null)

  const [teamB, setTeamB] =
    useState(null)

  const [batters, setBatters] =
    useState([])

  const [
    activeBatters,
    setActiveBatters,
  ] = useState([])

  const [
    strikerName,
    setStrikerName,
  ] = useState("")

  const [bowlers, setBowlers] =
    useState([])

  const [
    currentBowlerName,
    setCurrentBowlerName,
  ] = useState("")

  const [
    inningsReady,
    setInningsReady,
  ] = useState(false)

  const [
    pendingBatterSelection,
    setPendingBatterSelection,
  ] = useState(null)

  const [
    pendingBowlerSelection,
    setPendingBowlerSelection,
  ] = useState(null)

  const battingTeam =
    innings === 1 ? teamA : teamB

  const bowlingTeam =
    innings === 1 ? teamB : teamA

  const battingPlayers =
    battingTeam?.players || []

  const bowlingPlayers =
    bowlingTeam?.players || []

  const maxWickets =
    battingPlayers.length > 0
      ? Math.max(
          battingPlayers.length - 1,
          1
        )
      : 10

  const usedBatterNames =
    batters.map((batter) => batter.name)

  const remainingBatters =
    battingPlayers.filter(
      (player) =>
        !usedBatterNames.includes(player)
    )

  const currentBowler =
    bowlers.find(
      (bowler) =>
        bowler.name === currentBowlerName
    ) || null

  const sameTeamsSelected =
    teamA &&
    teamB &&
    getTeamKey(teamA) ===
      getTeamKey(teamB)

  const matchLocked =
    inningsReady ||
    balls > 0 ||
    innings > 1 ||
    Boolean(winner)

  const controlsDisabled =
    Boolean(winner) ||
    !teamA ||
    !teamB ||
    sameTeamsSelected ||
    !inningsReady ||
    Boolean(
      pendingBatterSelection
    ) ||
    Boolean(
      pendingBowlerSelection
    ) ||
    !currentBowlerName

  let setupStatus = ""

  if (winner) {
    setupStatus =
      "Match finished. Start a fresh live match to score again."
  } else if (!teamA || !teamB) {
    setupStatus =
      "Select Team A and Team B to set up the match."
  } else if (sameTeamsSelected) {
    setupStatus =
      "Choose two different teams before starting the innings."
  } else if (!inningsReady) {
    setupStatus =
      `Pick opening batters and a starting bowler for innings ${innings}.`
  } else if (
    pendingBatterSelection &&
    pendingBowlerSelection
  ) {
    setupStatus =
      "Choose the next batter and next bowler to continue."
  } else if (
    pendingBatterSelection
  ) {
    setupStatus =
      `Choose the next batter for ${battingTeam?.teamName || "the batting side"}.`
  } else if (
    pendingBowlerSelection
  ) {
    setupStatus =
      `Choose the next bowler for ${bowlingTeam?.teamName || "the bowling side"}.`
  }

  const controlsStatus =
    pendingNoBall
      ? "No ball active. Tap 0-6 to record the bat runs."
      : setupStatus

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

      loadedTeams.sort(
        (firstTeam, secondTeam) =>
          firstTeam.teamName.localeCompare(
            secondTeam.teamName
          )
      )

      setTeams(loadedTeams)
    } catch (error) {
      console.log(error)
    }
  }

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

      setMatches(
        sortMatches(loadedMatches)
      )
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loadTeams()
    loadMatches()
  }, [])

  const showToast = (message) => {
    setToast(message)

    setTimeout(() => {
      setToast("")
    }, 2500)
  }

  const addTeam = (team) => {
    setTeams((previousTeams) =>
      [
        ...previousTeams,
        team,
      ].sort((firstTeam, secondTeam) =>
        firstTeam.teamName.localeCompare(
          secondTeam.teamName
        )
      )
    )
  }

  const resetInningsState = () => {
    setScore(0)
    setWickets(0)
    setBalls(0)
    setFreeHit(false)
    setPendingNoBall(false)
    setExtras(INITIAL_EXTRAS)
    setHistory([])
    setFallOfWickets([])
    setBatters([])
    setActiveBatters([])
    setStrikerName("")
    setBowlers([])
    setCurrentBowlerName("")
    setInningsReady(false)
    setPendingBatterSelection(null)
    setPendingBowlerSelection(null)
  }

  const saveMatch = async (
    winnerName,
    snapshot
  ) => {
    const matchData = {
      teamA:
        teamA?.teamName || "Team A",
      teamB:
        teamB?.teamName || "Team B",
      winner: winnerName,
      score: `${snapshot.score}/${snapshot.wickets}`,
      overs: formatOvers(
        snapshot.balls
      ),
      target: snapshot.target,
      innings: snapshot.innings,
      extras: snapshot.extras,
      fallOfWickets:
        snapshot.fallOfWickets,
      history: snapshot.history,
      batters: snapshot.batters,
      bowlers: snapshot.bowlers,
      createdAt:
        new Date().toISOString(),
    }

    try {
      const docRef = await addDoc(
        collection(db, "matches"),
        matchData
      )

      setMatches((previousMatches) =>
        sortMatches([
          {
            id: docRef.id,
            ...matchData,
          },
          ...previousMatches,
        ])
      )
    } catch (error) {
      console.log(error)
    }
  }

  const finishMatch = (
    result,
    snapshot
  ) => {
    setWinner(result)
    saveMatch(result, snapshot)
    showToast("Match finished")
  }

  const prepareNextInnings = (
    nextTarget
  ) => {
    resetInningsState()
    setTarget(nextTarget)
    setInnings(2)
    showToast(
      `Target: ${nextTarget}`
    )
  }

  const startInnings = (
    openerOne,
    openerTwo,
    startingBowler
  ) => {
    if (!teamA || !teamB) {
      showToast(
        "Select both teams first"
      )
      return
    }

    if (sameTeamsSelected) {
      showToast(
        "Pick two different teams"
      )
      return
    }

    if (
      !openerOne ||
      !openerTwo ||
      openerOne === openerTwo
    ) {
      showToast(
        "Choose two different openers"
      )
      return
    }

    if (
      !startingBowler ||
      !bowlingPlayers.includes(
        startingBowler
      )
    ) {
      showToast(
        "Choose the starting bowler"
      )
      return
    }

    const openingBatters = [
      createBatterStats(
        openerOne
      ),
      createBatterStats(
        openerTwo
      ),
    ]

    setBatters(openingBatters)
    setActiveBatters([
      openerOne,
      openerTwo,
    ])
    setStrikerName(openerOne)
    setBowlers([
      createBowlerStats(
        startingBowler
      ),
    ])
    setCurrentBowlerName(
      startingBowler
    )
    setInningsReady(true)
    setPendingBatterSelection(null)
    setPendingBowlerSelection(null)
    setPendingNoBall(false)
    setFreeHit(false)

    showToast(
      `Innings ${innings} started`
    )
  }

  const selectNextBatter = (
    nextBatterName
  ) => {
    if (
      !pendingBatterSelection
    ) {
      return
    }

    if (
      !nextBatterName ||
      !remainingBatters.includes(
        nextBatterName
      )
    ) {
      showToast(
        "Choose the next batter"
      )
      return
    }

    const updatedBatters = [
      ...batters,
      createBatterStats(
        nextBatterName
      ),
    ]

    const updatedActiveBatters =
      activeBatters.map((name) =>
        name ===
        pendingBatterSelection.dismissedName
          ? nextBatterName
          : name
      )

    const nextStriker =
      pendingBatterSelection.overCompleted
        ? pendingBatterSelection.survivingBatterName
        : nextBatterName

    setBatters(updatedBatters)
    setActiveBatters(
      updatedActiveBatters
    )
    setStrikerName(nextStriker)
    setPendingBatterSelection(null)

    if (
      pendingBowlerSelection
    ) {
      showToast(
        "Choose the next bowler"
      )
      return
    }

    showToast(
      `${nextBatterName} is in`
    )
  }

  const selectBowler = (
    nextBowlerName
  ) => {
    if (!nextBowlerName) {
      showToast(
        "Choose the next bowler"
      )
      return
    }

    const mustRotateBowler =
      pendingBowlerSelection &&
      bowlingPlayers.length > 1

    if (
      mustRotateBowler &&
      nextBowlerName ===
        pendingBowlerSelection.previousBowlerName
    ) {
      showToast(
        "Choose a different bowler for the new over"
      )
      return
    }

    const updatedBowlers =
      bowlers.some(
        (bowler) =>
          bowler.name ===
          nextBowlerName
      )
        ? bowlers
        : [
            ...bowlers,
            createBowlerStats(
              nextBowlerName
            ),
          ]

    setBowlers(updatedBowlers)
    setCurrentBowlerName(
      nextBowlerName
    )
    setPendingBowlerSelection(
      null
    )

    if (
      pendingBatterSelection
    ) {
      showToast(
        "Choose the next batter"
      )
      return
    }

    showToast(
      `${nextBowlerName} is bowling`
    )
  }

  const handlePostDeliveryState = ({
    updatedScore,
    updatedWickets,
    updatedBalls,
    updatedHistory,
    updatedFallOfWickets,
    updatedBatters,
    updatedBowlers,
    updatedExtras,
    pendingBatterData = null,
  }) => {
    const totalBalls =
      maxOvers * 6

    const inningsClosed =
      updatedBalls >= totalBalls ||
      updatedWickets >= maxWickets

    const snapshot = {
      score: updatedScore,
      wickets: updatedWickets,
      balls: updatedBalls,
      innings,
      target,
      extras: updatedExtras,
      history: updatedHistory,
      fallOfWickets:
        updatedFallOfWickets,
      batters: updatedBatters,
      bowlers: updatedBowlers,
    }

    if (
      innings === 1 &&
      inningsClosed
    ) {
      prepareNextInnings(
        updatedScore + 1
      )
      return
    }

    if (
      innings === 2 &&
      target &&
      updatedScore >= target
    ) {
      const result =
        `${teamB?.teamName || "Team B"} Won`

      finishMatch(
        result,
        snapshot
      )

      return
    }

    if (
      innings === 2 &&
      inningsClosed
    ) {
      const result =
        `${teamA?.teamName || "Team A"} Won`

      finishMatch(
        result,
        snapshot
      )

      return
    }

    const overCompleted =
      updatedBalls > 0 &&
      updatedBalls % 6 === 0

    if (pendingBatterData) {
      setPendingBatterSelection(
        pendingBatterData
      )
    }

    if (overCompleted) {
      setPendingBowlerSelection({
        previousBowlerName:
          currentBowlerName,
      })
    }

    if (
      pendingBatterData &&
      overCompleted
    ) {
      showToast(
        "Choose the next batter and bowler"
      )
      return
    }

    if (pendingBatterData) {
      showToast(
        "Choose the next batter"
      )
      return
    }

    if (overCompleted) {
      showToast(
        "Choose the next bowler"
      )
    }
  }

  const addRuns = (runs) => {
    if (
      winner ||
      controlsDisabled ||
      !currentBowlerName
    ) {
      return
    }

    const isNoBallDelivery =
      pendingNoBall

    const legalBall =
      !isNoBallDelivery

    const totalRuns =
      runs +
      (isNoBallDelivery ? 1 : 0)

    const updatedScore =
      score + totalRuns

    const updatedBalls =
      balls +
      (legalBall ? 1 : 0)

    const historyLabel =
      isNoBallDelivery
        ? runs === 0
          ? "Nb"
          : `Nb+${runs}`
        : runs

    const updatedHistory = [
      ...history,
      {
        over: Math.floor(
          balls / 6
        ),
        label: historyLabel,
      },
    ]

    const updatedBatters =
      batters.map((batter) =>
        batter.name !== strikerName
          ? batter
          : {
              ...batter,
              runs:
                batter.runs + runs,
              balls:
                batter.balls +
                (legalBall ? 1 : 0),
              fours:
                runs === 4
                  ? batter.fours + 1
                  : batter.fours,
              sixes:
                runs === 6
                  ? batter.sixes + 1
                  : batter.sixes,
            }
      )

    const updatedBowlers =
      updateBowlerList(
        bowlers,
        currentBowlerName,
        (bowler) => ({
          ...bowler,
          runs:
            bowler.runs + totalRuns,
          balls:
            bowler.balls +
            (legalBall ? 1 : 0),
        })
      )

    const updatedExtras =
      extras

    const otherBatter =
      getOtherActiveBatter(
        activeBatters,
        strikerName
      )

    let nextStriker = strikerName

    if (
      runs === 1 ||
      runs === 3
    ) {
      nextStriker =
        otherBatter || strikerName
    }

    if (
      legalBall &&
      updatedBalls % 6 === 0
    ) {
      nextStriker =
        nextStriker === strikerName
          ? otherBatter ||
            strikerName
          : strikerName
    }

    setScore(updatedScore)
    setBalls(updatedBalls)
    setHistory(updatedHistory)
    setBatters(updatedBatters)
    setBowlers(updatedBowlers)
    setStrikerName(nextStriker)
    setPendingNoBall(false)
    setFreeHit(
      isNoBallDelivery
    )

    handlePostDeliveryState({
      updatedScore,
      updatedWickets: wickets,
      updatedBalls,
      updatedHistory,
      updatedFallOfWickets:
        fallOfWickets,
      updatedBatters,
      updatedBowlers,
      updatedExtras,
    })
  }

  const addWicket = () => {
    if (
      winner ||
      controlsDisabled ||
      !currentBowlerName
    ) {
      return
    }

    if (pendingNoBall) {
      showToast(
        "Complete the no ball outcome first"
      )
      return
    }

    if (freeHit) {
      setFreeHit(false)
      showToast(
        "Cannot give wicket on a free hit"
      )
      return
    }

    const updatedBalls =
      balls + 1

    const updatedWickets =
      wickets + 1

    const dismissedBatterName =
      strikerName

    const survivingBatterName =
      getOtherActiveBatter(
        activeBatters,
        strikerName
      )

    const overCompleted =
      updatedBalls % 6 === 0

    const wicketInfo = {
      wicket: updatedWickets,
      score,
      batter:
        dismissedBatterName,
      over: formatOvers(
        updatedBalls
      ),
    }

    const updatedHistory = [
      ...history,
      {
        over: Math.floor(
          balls / 6
        ),
        label: "W",
      },
    ]

    const updatedFallOfWickets = [
      ...fallOfWickets,
      wicketInfo,
    ]

    const updatedBowlers =
      updateBowlerList(
        bowlers,
        currentBowlerName,
        (bowler) => ({
          ...bowler,
          wickets:
            bowler.wickets + 1,
          balls:
            bowler.balls + 1,
        })
      )

    const inningsWillContinue =
      updatedWickets < maxWickets &&
      updatedBalls <
        maxOvers * 6

    const nextStriker =
      overCompleted
        ? survivingBatterName
        : ""

    setWickets(updatedWickets)
    setBalls(updatedBalls)
    setHistory(updatedHistory)
    setFallOfWickets(
      updatedFallOfWickets
    )
    setBowlers(updatedBowlers)
    setStrikerName(nextStriker)
    setPendingNoBall(false)
    setFreeHit(false)

    handlePostDeliveryState({
      updatedScore: score,
      updatedWickets,
      updatedBalls,
      updatedHistory,
      updatedFallOfWickets,
      updatedBatters: batters,
      updatedBowlers,
      updatedExtras: extras,
      pendingBatterData:
        inningsWillContinue
          ? {
              dismissedName:
                dismissedBatterName,
              survivingBatterName,
              overCompleted,
            }
          : null,
    })
  }

  const addWide = () => {
    if (
      winner ||
      controlsDisabled ||
      !currentBowlerName
    ) {
      return
    }

    if (pendingNoBall) {
      showToast(
        "Complete the no ball outcome first"
      )
      return
    }

    const updatedScore =
      score + 1

    const updatedHistory = [
      ...history,
      {
        over: Math.floor(
          balls / 6
        ),
        label: "Wd",
      },
    ]

    const updatedExtras = {
      ...extras,
      wides:
        extras.wides + 1,
    }

    const updatedBowlers =
      updateBowlerList(
        bowlers,
        currentBowlerName,
        (bowler) => ({
          ...bowler,
          runs:
            bowler.runs + 1,
        })
      )

    setScore(updatedScore)
    setHistory(updatedHistory)
    setExtras(updatedExtras)
    setBowlers(updatedBowlers)

    handlePostDeliveryState({
      updatedScore,
      updatedWickets: wickets,
      updatedBalls: balls,
      updatedHistory,
      updatedFallOfWickets:
        fallOfWickets,
      updatedBatters: batters,
      updatedBowlers,
      updatedExtras,
    })
  }

  const addNoBall = () => {
    if (
      winner ||
      controlsDisabled
    ) {
      return
    }

    if (pendingNoBall) {
      showToast(
        "Record the current no ball first"
      )
      return
    }

    setPendingNoBall(true)
    setExtras((previousExtras) => ({
      ...previousExtras,
      noBalls:
        previousExtras.noBalls + 1,
    }))

    showToast(
      "No ball. Record the bat runs now."
    )
  }

  const overs =
    formatOvers(balls)

  return (
    <div
      className="
        min-h-screen
        bg-gradient-to-br
        from-black
        via-zinc-900
        to-zinc-950
        text-white
      "
    >
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
              <Teams addTeam={addTeam} />
            }
          />

          <Route
            path="/history"
            element={
              <History matches={matches} />
            }
          />

          <Route
            path="/live"
            element={
              <LiveMatch
                activeBatters={
                  activeBatters
                }
                addNoBall={addNoBall}
                addRuns={addRuns}
                addWide={addWide}
                addWicket={addWicket}
                balls={balls}
                batters={batters}
                bowlers={bowlers}
                controlsDisabled={
                  controlsDisabled
                }
                controlsStatus={
                  controlsStatus
                }
                currentBowler={
                  currentBowler
                }
                currentBowlerName={
                  currentBowlerName
                }
                extras={extras}
                fallOfWickets={
                  fallOfWickets
                }
                freeHit={freeHit}
                history={history}
                innings={innings}
                inningsReady={
                  inningsReady
                }
                matchLocked={
                  matchLocked
                }
                maxOvers={maxOvers}
                overs={overs}
                pendingBatterSelection={
                  pendingBatterSelection
                }
                pendingBowlerSelection={
                  pendingBowlerSelection
                }
                pendingNoBall={
                  pendingNoBall
                }
                remainingBatters={
                  remainingBatters
                }
                score={score}
                selectBowler={
                  selectBowler
                }
                selectNextBatter={
                  selectNextBatter
                }
                setMaxOvers={
                  setMaxOvers
                }
                setTeamA={setTeamA}
                setTeamB={setTeamB}
                startInnings={
                  startInnings
                }
                strikerName={
                  strikerName
                }
                target={target}
                teamA={teamA}
                teamB={teamB}
                teams={teams}
                winner={winner}
                wickets={wickets}
                battingTeam={
                  battingTeam
                }
                bowlingTeam={
                  bowlingTeam
                }
              />
            }
          />
        </Routes>
      </div>
    </div>
  )
}
