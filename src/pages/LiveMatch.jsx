import ScoreBoard from "../components/ScoreBoard"
import BattingScorecard from "../components/BattingScorecard"
import BowlingScorecard from "../components/BowlingScorecard"
import MatchControls from "../components/MatchControls"
import BallHistory from "../components/BallHistory"
import FallOfWickets from "../components/FallOfWickets"
import MatchSetup from "../components/MatchSetup"

export default function LiveMatch(props) {

  return (
    <div className="p-6 max-w-4xl mx-auto">

      {/* OVERS INPUT */}
      <div className="mb-6">

        <label className="block mb-2">
          Total Overs
        </label>

        <input
          type="number"
          value={props.maxOvers}
          onChange={(e) =>
            props.setMaxOvers(
              Number(e.target.value)
            )
          }
          className="bg-zinc-800 p-3 rounded-xl w-full"
        />

      </div>

      <ScoreBoard
        score={props.score}
        wickets={props.wickets}
        overs={props.overs}
        freeHit={props.freeHit}
        teamA={
          props.innings === 1
            ? props.teamA
            : props.teamB
        }
        innings={props.innings}
        target={props.target}
        winner={props.winner}
      />

      <BattingScorecard
        batters={props.batters}
        currentStriker={
          props.currentStriker
        }
      />

      <BowlingScorecard
        bowler={props.bowler}
      />

      <MatchControls
        addRuns={props.addRuns}
        addWicket={props.addWicket}
        addWide={props.addWide}
        addNoBall={props.addNoBall}
      />

      <BallHistory
        history={props.history}
      />

      <FallOfWickets
        fallOfWickets={
          props.fallOfWickets
        }
      />

      <MatchSetup
        teams={props.teams}
        setTeamA={props.setTeamA}
        setTeamB={props.setTeamB}
      />

    </div>
  )
}