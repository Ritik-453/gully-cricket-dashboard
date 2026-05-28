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
    <div className="
      p-3
      md:p-6
      max-w-7xl
      mx-auto
    ">

      {/* OVERS INPUT */}
      <div className="mb-6">

        <label className="
          block
          mb-2
          text-zinc-300
        ">
          Total Overs
        </label>

        <input
          type="number"
          disabled={props.balls > 0 || props.innings > 1}
          value={props.maxOvers}
          onChange={(e) =>
            props.setMaxOvers(
              Number(e.target.value)
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

      {/* TOP DASHBOARD */}
      <div className="
        grid
        grid-cols-1
        lg:grid-cols-2
        gap-6
      ">

        {/* LEFT SIDE */}
        <div className="space-y-6">

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
            balls={props.balls}
            maxOvers={props.maxOvers}
          />

          {
            props.extras && (
              <ExtrasCard
                extras={props.extras}
              />
            )
          }

        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-6">

          <BattingScorecard
            batters={props.batters}
            currentStriker={
              props.currentStriker
            }
          />

          <BowlingScorecard
            bowler={props.bowler}
          />

        </div>

      </div>

      {/* MATCH CONTROLS */}
      <div className="mt-8">

        <MatchControls
          addRuns={props.addRuns}
          addWicket={props.addWicket}
          addWide={props.addWide}
          addNoBall={props.addNoBall}
        />

      </div>

      {/* LOWER SECTION */}
      <div className="
        grid
        grid-cols-1
        lg:grid-cols-2
        gap-6
        mt-8
      ">

        <BallHistory
          history={props.history}
        />

        <FallOfWickets
          fallOfWickets={
            props.fallOfWickets
          }
        />

      </div>

      {/* MATCH SETUP */}
      <div className="mt-8">

        <MatchSetup
          teams={props.teams}
          setTeamA={props.setTeamA}
          setTeamB={props.setTeamB}
        />

      </div>

    </div>
  )
}