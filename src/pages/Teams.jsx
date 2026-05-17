import CreateTeam from "./CreateTeam"

export default function Teams({
  addTeam,
}) {

  return (
    <div className="p-6">

      <CreateTeam addTeam={addTeam} />

    </div>
  )
}