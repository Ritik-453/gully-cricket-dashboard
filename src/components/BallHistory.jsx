export default function BallHistory({
  history,
}) {

  // GROUP BALLS INTO OVERS
  const overs = []

  for (let i = 0; i < history.length; i += 6) {

    overs.push(
      history.slice(i, i + 6)
    )
  }

  const getBallStyle = (ball) => {

    if (ball === "W") {
      return "bg-red-600"
    }

    if (ball === "Wd") {
      return "bg-yellow-500 text-black"
    }

    if (ball === "Nb") {
      return "bg-purple-600"
    }

    if (ball === 4) {
      return "bg-blue-600"
    }

    if (ball === 6) {
      return "bg-green-600"
    }

    return "bg-zinc-700"
  }

  return (
    <div className="
      bg-zinc-800
      p-4
      rounded-2xl
      mt-6
    ">

      <h2 className="
        text-2xl
        font-bold
        mb-4
      ">
        Ball History
      </h2>

      <div className="
        max-h-64
        overflow-y-auto
        space-y-4
        pr-2
      ">

        {
          overs.length === 0 ? (

            <p className="text-zinc-400">
              No Balls Yet
            </p>

          ) : (

            overs.map((over, overIndex) => (

              <div
                key={overIndex}
                className="space-y-2"
              >

                <div className="
                  text-sm
                  text-zinc-400
                  font-semibold
                ">

                  Over {overIndex + 1}

                </div>

                <div className="
                  flex
                  flex-wrap
                  gap-2
                ">

                  {
                    over.map((ball, ballIndex) => (

                      <div
                        key={ballIndex}
                        className={`
                          w-10
                          h-10
                          rounded-full
                          flex
                          items-center
                          justify-center
                          font-bold
                          ${getBallStyle(ball)}
                        `}
                      >

                        {ball}

                      </div>
                    ))
                  }

                </div>

              </div>
            ))
          )
        }

      </div>

    </div>
  )
}