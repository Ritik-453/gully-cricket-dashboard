export default function FallOfWickets({
  fallOfWickets,
}) {
  return (
    <div className="bg-zinc-800 p-4 rounded-2xl mt-6">

      <h2 className="text-xl font-bold mb-4">
        Fall Of Wickets
      </h2>

      {
        fallOfWickets.length === 0 ? (
          <p>No wickets yet</p>
        ) : (
          <div className="space-y-2">

            {
              fallOfWickets.map((item, index) => (
                <div
                  key={index}
                  className="bg-black p-3 rounded-xl"
                >
                  {item}
                </div>
              ))
            }

          </div>
        )
      }

    </div>
  )
}