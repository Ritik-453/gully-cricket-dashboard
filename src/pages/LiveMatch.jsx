import ScoreBoard from "../components/ScoreBoard"
import BattingScorecard from "../components/BattingScorecard"
import BowlingScorecard from "../components/BowlingScorecard"
import MatchControls from "../components/MatchControls"
import BallHistory from "../components/BallHistory"
import FallOfWickets from "../components/FallOfWickets"
import MatchSetup from "../components/MatchSetup"
import ExtrasCard from "../components/ExtrasCard"
import MatchOverview from "../components/MatchOverview"

export default function LiveMatch(props) {
  return (
    <div
      className="
        flex
        max-w-7xl
        flex-col
        mx-auto
      "
    >
      <div
        className="
          order-2
          lg:order-none
          grid
          grid-cols-1
          lg:grid-cols-2
          gap-4
          md:gap-6
        "
      >
        <div className="space-y-4 md:space-y-6">
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

        <div className="space-y-4 md:space-y-6">
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

      <div className="order-3 lg:order-none mt-6 md:mt-8">
        <MatchControls
          activeBatters={
            props.activeBatters
          }
          addNoBall={props.addNoBall}
          addRuns={props.addRuns}
          addWide={props.addWide}
          addWicket={props.addWicket}
          disabled={
            props.controlsDisabled
          }
          freeHit={props.freeHit}
          pendingNoBall={
            props.pendingNoBall
          }
          statusText={
            props.controlsStatus
          }
          strikerName={
            props.strikerName
          }
        />
      </div>

      <div
        className="
          order-4
          lg:order-none
          grid
          grid-cols-1
          lg:grid-cols-2
          gap-4
          md:gap-6
          mt-6
          md:mt-8
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

      <div className="order-5 lg:order-none">
        <MatchOverview
          match={{
            activeBatters:
              props.activeBatters,
            batters: props.batters,
            balls: props.balls,
            bowlers: props.bowlers,
            extras: props.extras,
            fallOfWickets:
              props.fallOfWickets,
            history: props.history,
            overs: props.overs,
            score: props.score,
            wickets: props.wickets,
          }}
        />
      </div>

      <div className="order-1 lg:order-none mt-0 lg:mt-8">
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
          setMaxOvers={
            props.setMaxOvers
          }
          setTeamA={props.setTeamA}
          setTeamB={props.setTeamB}
          startInnings={
            props.startInnings
          }
          maxOvers={props.maxOvers}
          teamA={props.teamA}
          teamB={props.teamB}
          teams={props.teams}
        />
      </div>
    </div>
  )
}
