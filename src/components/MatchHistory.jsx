export default function MatchHistory({
  matches,
}) {

  return (
    <div className="bg-zinc-900 p-6 rounded-2xl mt-6">

      <h2 className="text-2xl font-bold mb-6">

        Match History

      </h2>

      {
        matches.length === 0 ? (

          <p>No Matches Yet</p>

        ) : (

          <div className="space-y-4">

            {
              matches.map((match) => (

                <div
                  key={match.id}
                  className="bg-black p-4 rounded-xl"
                >

                  <div className="text-xl font-bold">

                    {match.teamA}
                    {" vs "}
                    {match.teamB}

                  </div>

                  <div className="mt-2">

                    Score:
                    {" "}
                    {match.score}

                  </div>

                  <div>

                    Overs:
                    {" "}
                    {match.overs}

                  </div>

                  <div className="text-green-400 mt-2">

                    {match.winner}

                  </div>

                </div>
              ))
            }

          </div>
        )
      }

    </div>
  )
}