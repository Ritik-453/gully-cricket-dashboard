export default function MatchSetup({
  teams,
  setTeamA,
  setTeamB,
}) {

  return (
    <div className="bg-zinc-900 p-6 rounded-2xl mt-6">

      <h2 className="text-2xl font-bold mb-6">
        Match Setup
      </h2>

      <div className="space-y-4">

        <select
          onChange={(e) =>
            setTeamA(
              JSON.parse(e.target.value)
            )
          }
          className="w-full p-3 rounded-xl bg-black"
        >

          <option>
            Select Team A
          </option>

          {
            teams.map((team, index) => (
              <option
                key={index}
                value={JSON.stringify(team)}
              >
                {team.teamName}
              </option>
            ))
          }

        </select>

        <select
          onChange={(e) =>
            setTeamB(
              JSON.parse(e.target.value)
            )
          }
          className="w-full p-3 rounded-xl bg-black"
        >

          <option>
            Select Team B
          </option>

          {
            teams.map((team, index) => (
              <option
                key={index}
                value={JSON.stringify(team)}
              >
                {team.teamName}
              </option>
            ))
          }

        </select>

      </div>

    </div>
  )
}