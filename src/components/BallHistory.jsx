export default function BallHistory({ history }) {
  return (
    <div className="bg-zinc-800 p-4 rounded-2xl mt-6">

      <h2 className="text-xl font-bold mb-4">
        Ball History
      </h2>

      <div className="flex flex-wrap gap-3">

        {
          history.map((item, index) => (
            <div
              key={index}
              className="bg-black px-4 py-2 rounded-full"
            >
              {item}
            </div>
          ))
        }

      </div>

    </div>
  )
}