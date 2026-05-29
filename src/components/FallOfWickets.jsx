export default function FallOfWickets({
  fallOfWickets,
}) {
  return (
    <div
      className="
        bg-zinc-800
        p-4
        rounded-2xl
        mt-6
      "
    >
      <h2
        className="
          text-2xl
          font-bold
          mb-4
        "
      >
        Fall Of Wickets
      </h2>

      <div
        className="
          max-h-64
          overflow-y-auto
          space-y-3
          pr-2
        "
      >
        {fallOfWickets.length === 0 ? (
          <p className="text-zinc-400">
            No Wickets Yet
          </p>
        ) : (
          fallOfWickets.map(
            (wicket, index) => (
              <div
                key={index}
                className="
                  bg-black/40
                  rounded-xl
                  p-4
                  flex
                  justify-between
                  items-center
                  gap-4
                "
              >
                <div className="space-y-2">
                  <div
                    className="
                      text-red-400
                      font-bold
                      text-lg
                    "
                  >
                    {wicket.wicket}
                    -
                    {wicket.score}
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <div className="text-zinc-300 text-sm">
                      {wicket.batter}
                    </div>

                    {wicket.type && (
                      <span
                        className="
                          rounded-full
                          bg-red-600/20
                          px-2
                          py-1
                          text-[11px]
                          font-bold
                          uppercase
                          tracking-wide
                          text-red-300
                        "
                      >
                        {wicket.type}
                      </span>
                    )}
                  </div>
                </div>

                <div
                  className="
                    text-zinc-400
                    text-sm
                  "
                >
                  {wicket.over} ov
                </div>
              </div>
            )
          )
        )}
      </div>
    </div>
  )
}
