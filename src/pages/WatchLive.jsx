import { useEffect, useState } from "react"
import { doc, onSnapshot } from "firebase/firestore"

import { db } from "../firebase"

import ScoreBoard from "../components/ScoreBoard"
import BattingScorecard from "../components/BattingScorecard"
import BowlingScorecard from "../components/BowlingScorecard"
import BallHistory from "../components/BallHistory"
import FallOfWickets from "../components/FallOfWickets"
import ExtrasCard from "../components/ExtrasCard"
import MatchOverview from "../components/MatchOverview"
import BallFeedback from "../components/BallFeedback"

export default function WatchLive() {
  const [liveData, setLiveData] =
    useState(null)

  const [loading, setLoading] =
    useState(true)

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(
        db,
        "liveScores",
        "current"
      ),
      (snapshot) => {
        setLiveData(
          snapshot.exists()
            ? snapshot.data()
            : null
        )
        setLoading(false)
      },
      (error) => {
        console.log(error)
        setLoading(false)
      }
    )

    return () => {
      unsubscribe()
    }
  }, [])

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-24 text-slate-400">
        <div className="h-10 w-10 animate-pulse rounded-2xl border border-emerald-400/25 bg-emerald-500/10" />
        <div className="text-sm">
          Connecting to the live match...
        </div>
      </div>
    )
  }

  if (
    !liveData ||
    !liveData.matchLocked
  ) {
    return (
      <div className="animate-pop-in mx-auto max-w-md space-y-4 rounded-[1.5rem] border border-dashed border-white/10 bg-slate-950/60 p-8 text-center">
        <div className="text-3xl">
          🏏
        </div>

        <div className="text-xl font-black">
          No Live Match Right Now
        </div>

        <div className="text-sm text-slate-400">
          Once someone starts scoring from the Live tab, the match will appear here automatically — no refresh needed.
        </div>
      </div>
    )
  }

  const battingTeamStub = {
    teamName:
      liveData.battingTeamName,
  }

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-4 md:gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3">
        <div className="flex items-center gap-2 text-sm font-bold text-emerald-300">
          {!liveData.winner && (
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </span>
          )}

          {liveData.winner
            ? "Match Finished"
            : "Watching Live"}
        </div>

        <div className="text-xs text-slate-400">
          {liveData.teamAName} vs{" "}
          {liveData.teamBName}
        </div>
      </div>

      <BallFeedback
        history={liveData.history}
      />

      <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-2">
        <div className="space-y-4 md:space-y-6">
          <ScoreBoard
            balls={liveData.balls}
            freeHit={
              liveData.freeHit
            }
            history={
              liveData.history
            }
            innings={
              liveData.innings
            }
            maxOvers={
              liveData.maxOvers
            }
            overs={liveData.overs}
            score={liveData.score}
            target={liveData.target}
            teamA={
              battingTeamStub
            }
            wickets={
              liveData.wickets
            }
            winner={liveData.winner}
          />

          <ExtrasCard
            extras={liveData.extras}
          />
        </div>

        <div className="space-y-4 md:space-y-6">
          <BattingScorecard
            activeBatters={
              liveData.activeBatters
            }
            batters={liveData.batters}
            strikerName={
              liveData.strikerName
            }
          />

          <BowlingScorecard
            bowlers={liveData.bowlers}
            currentBowlerName={
              liveData.currentBowlerName
            }
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-2">
        <BallHistory
          history={liveData.history}
        />

        <FallOfWickets
          fallOfWickets={
            liveData.fallOfWickets
          }
        />
      </div>

      <MatchOverview
        match={{
          activeBatters:
            liveData.activeBatters,
          batters: liveData.batters,
          balls: liveData.balls,
          bowlers: liveData.bowlers,
          extras: liveData.extras,
          fallOfWickets:
            liveData.fallOfWickets,
          history: liveData.history,
          overs: liveData.overs,
          score: liveData.score,
          wickets: liveData.wickets,
        }}
      />
    </div>
  )
}
