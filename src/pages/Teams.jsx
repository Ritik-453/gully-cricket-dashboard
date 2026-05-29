import {
  useEffect,
  useState,
} from "react"

import AuthPanel from "../components/AuthPanel"
import CreateTeam from "./CreateTeam"

const canManageTeam = (
  team,
  currentUser
) =>
  Boolean(
    team.ownerId &&
      currentUser?.id &&
      team.ownerId === currentUser.id
  )

const formatOwnerLabel = (
  team,
  currentUser
) => {
  if (canManageTeam(team, currentUser)) {
    return "Your team"
  }

  if (team.ownerName) {
    return `Owned by ${team.ownerName}`
  }

  return "Legacy team"
}

function TeamCard({
  currentUser,
  isEditing,
  onDelete,
  onEdit,
  team,
}) {
  const ownedByCurrentUser =
    canManageTeam(
      team,
      currentUser
    )

  return (
    <div
      className="
        rounded-2xl
        bg-zinc-900
        p-5
        space-y-4
      "
    >
      <div
        className="
          flex
          flex-col
          gap-3
          md:flex-row
          md:items-start
          md:justify-between
        "
      >
        <div className="space-y-2">
          <div className="text-2xl font-bold">
            {team.teamName}
          </div>

          <div className="text-sm text-zinc-400">
            {formatOwnerLabel(
              team,
              currentUser
            )}
          </div>

          <div className="text-zinc-300">
            Captain:
            {" "}
            <span className="font-semibold">
              {team.captain}
            </span>
          </div>

          <div className="text-zinc-300">
            Squad:
            {" "}
            {team.players.length}
            {" "}
            players
          </div>
        </div>

        {ownedByCurrentUser ? (
          <div className="flex gap-2">
            <button
              onClick={() =>
                onEdit(team)
              }
              className="
                rounded-xl
                bg-blue-600
                px-4
                py-2
                font-semibold
                hover:bg-blue-700
                transition-all
              "
            >
              {isEditing
                ? "Editing"
                : "Edit"}
            </button>

            <button
              onClick={() =>
                onDelete(team)
              }
              className="
                rounded-xl
                bg-red-600
                px-4
                py-2
                font-semibold
                hover:bg-red-700
                transition-all
              "
            >
              Delete
            </button>
          </div>
        ) : (
          <div
            className="
              rounded-xl
              bg-zinc-800
              px-4
              py-2
              text-sm
              font-semibold
              text-zinc-300
            "
          >
            Read only
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {team.players.map((player) => (
          <span
            key={`${team.id}-${player}`}
            className="
              rounded-full
              bg-black
              px-3
              py-1
              text-sm
              text-zinc-200
            "
          >
            {player}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Teams({
  authBusy,
  authReady,
  createTeam,
  currentUser,
  deleteTeam,
  emailLogin,
  emailSignup,
  googleLogin,
  logout,
  teams,
  updateCurrentUserName,
  updateTeam,
}) {
  const [editingTeam, setEditingTeam] =
    useState(null)

  useEffect(() => {
    if (!currentUser) {
      setEditingTeam(null)
    }
  }, [currentUser])

  const ownedTeams = teams.filter(
    (team) =>
      canManageTeam(
        team,
        currentUser
      )
  )

  const readOnlyTeams =
    teams.filter(
      (team) =>
        !canManageTeam(
          team,
          currentUser
        )
    )

  const handleCreateTeam = async (
    teamData
  ) => createTeam(teamData)

  const handleUpdateTeam = async (
    teamData
  ) => {
    if (!editingTeam) {
      return false
    }

    const isUpdated =
      await updateTeam(
        editingTeam.id,
        teamData
      )

    if (isUpdated) {
      setEditingTeam(null)
    }

    return isUpdated
  }

  const handleDeleteTeam = async (
    team
  ) => {
    const shouldDelete =
      window.confirm(
        `Delete ${team.teamName}?`
      )

    if (!shouldDelete) {
      return
    }

    const isDeleted =
      await deleteTeam(team.id)

    if (
      isDeleted &&
      editingTeam?.id === team.id
    ) {
      setEditingTeam(null)
    }
  }

  return (
    <div className="p-6 space-y-6">
      <AuthPanel
        authBusy={authBusy}
        authReady={authReady}
        currentUser={currentUser}
        onEmailLogin={emailLogin}
        onEmailSignup={emailSignup}
        onGoogleLogin={googleLogin}
        onLogout={logout}
        onUpdateName={
          updateCurrentUserName
        }
      />

      {currentUser ? (
        <CreateTeam
          initialTeam={editingTeam}
          mode={
            editingTeam
              ? "edit"
              : "create"
          }
          onCancel={() =>
            setEditingTeam(null)
          }
          onSubmit={
            editingTeam
              ? handleUpdateTeam
              : handleCreateTeam
          }
        />
      ) : (
        <div className="rounded-2xl bg-zinc-900 p-5 text-zinc-400">
          Sign in first to create teams and unlock team editing.
        </div>
      )}

      <div className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-2xl font-bold">
            Your Teams
          </h2>

          <div className="text-sm text-zinc-400">
            {ownedTeams.length}
            {" "}
            owned
          </div>
        </div>

        {ownedTeams.length === 0 ? (
          <div className="rounded-2xl bg-zinc-900 p-5 text-zinc-400">
            {currentUser
              ? "You have not created any teams with this account yet."
              : "Sign in to see and manage your own teams."}
          </div>
        ) : (
          ownedTeams.map((team) => (
            <TeamCard
              key={team.id}
              currentUser={currentUser}
              isEditing={
                editingTeam?.id ===
                team.id
              }
              onDelete={
                handleDeleteTeam
              }
              onEdit={setEditingTeam}
              team={team}
            />
          ))
        )}
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-2xl font-bold">
            Read-Only Teams
          </h2>

          <div className="text-sm text-zinc-400">
            {readOnlyTeams.length}
            {" "}
            locked
          </div>
        </div>

        {readOnlyTeams.length === 0 ? (
          <div className="rounded-2xl bg-zinc-900 p-5 text-zinc-400">
            No other teams are visible right now.
          </div>
        ) : (
          readOnlyTeams.map((team) => (
            <TeamCard
              key={team.id}
              currentUser={currentUser}
              isEditing={false}
              onDelete={
                handleDeleteTeam
              }
              onEdit={setEditingTeam}
              team={team}
            />
          ))
        )}
      </div>
    </div>
  )
}
