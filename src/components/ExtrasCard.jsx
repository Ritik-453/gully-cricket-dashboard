export default function ExtrasCard({
  extras,
}) {

  const totalExtras =
    extras.wides +
    extras.noBalls

  return (
    <div className="bg-zinc-800 p-4 rounded-2xl mt-6">

      <h2 className="text-2xl font-bold mb-4">
        Extras
      </h2>

      <div className="space-y-2">

        <div>
          Total: {totalExtras}
        </div>

        <div>
          Wides: {extras.wides}
        </div>

        <div>
          No Balls: {extras.noBalls}
        </div>

      </div>

    </div>
  )
}