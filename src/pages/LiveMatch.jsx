import ScoreBoard from "../components/ScoreBoard"
import BattingScorecard from "../components/BattingScorecard"
import BowlingScorecard from "../components/BowlingScorecard"
import MatchControls from "../components/MatchControls"
import BallHistory from "../components/BallHistory"
import FallOfWickets from "../components/FallOfWickets"
import MatchSetup from "../components/MatchSetup"
import ExtrasCard from "../components/ExtrasCard"

export default function LiveMatch(props) {
  return (
    <div
      className="
        p-3
        md:p-6
        max-w-7xl
        mx-auto
      "
    >
      <div className="mb-6">
        <label
          className="
            block
            mb-2
            text-zinc-300
          "
        >
          Total Overs
        </label>

        <input
          type="number"
          min="1"
          disabled={props.matchLocked}
          value={props.maxOvers}
          onChange={(event) =>
            props.setMaxOvers(
              Number(
                event.target.value
              ) || 1
            )
          }
          className="
            bg-zinc-800
            p-3
            rounded-xl
            w-full
            disabled:opacity-50
            disabled:cursor-not-allowed
          "
        />
      </div>

      <div
        className="
          grid
          grid-cols-1
          lg:grid-cols-2
          gap-6
        "
      >
        <div className="space-y-6">
          <ScoreBoard
            balls={props.balls}
            freeHit={props.freeHit}
            innings={props.innings}
            maxOvers={props.maxOvers}
            overs={props.overs}
            score={props.score}
            target={props.target}
            teamA={props.battingTeam}
            wickets={props.wickets}
            winner={props.winner}
          />

          <ExtrasCard
            extras={props.extras}
          />
        </div>

        <div className="space-y-6">
          <BattingScorecard
            activeBatters={
              props.activeBatters
            }
            batters={props.batters}
            strikerName={
              props.strikerName
            }
          />

          <BowlingScorecard
            bowlers={props.bowlers}
            currentBowlerName={
              props.currentBowlerName
            }
          />
        </div>
      </div>

      <div className="mt-8">
        <MatchControls
          addNoBall={props.addNoBall}
          addRuns={props.addRuns}
          addWide={props.addWide}
          addWicket={props.addWicket}
          disabled={
            props.controlsDisabled
          }
          pendingNoBall={
            props.pendingNoBall
          }
          statusText={
            props.controlsStatus
          }
        />
      </div>

      <div
        className="
          grid
          grid-cols-1
          lg:grid-cols-2
          gap-6
          mt-8
        "
      >
        <BallHistory
          history={props.history}
        />

        <FallOfWickets
          fallOfWickets={
            props.fallOfWickets
          }
        />
      </div>

      <div className="mt-8">
        <MatchSetup
          battingTeam={
            props.battingTeam
          }
          bowlingTeam={
            props.bowlingTeam
          }
          innings={props.innings}
          inningsReady={
            props.inningsReady
          }
          matchLocked={
            props.matchLocked
          }
          pendingBatterSelection={
            props.pendingBatterSelection
          }
          pendingBowlerSelection={
            props.pendingBowlerSelection
          }
          remainingBatters={
            props.remainingBatters
          }
          selectBowler={
            props.selectBowler
          }
          selectNextBatter={
            props.selectNextBatter
          }
          setTeamA={props.setTeamA}
          setTeamB={props.setTeamB}
          startInnings={
            props.startInnings
          }
          teamA={props.teamA}
          teamB={props.teamB}
          teams={props.teams}
        />
      </div>
    </div>
  )
}
