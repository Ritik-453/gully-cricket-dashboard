import {
  useDeferredValue,
  useEffect,
  useState,
} from "react"
import { Link } from "react-router-dom"

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
    return "Managed by you"
  }

  if (team.ownerName) {
    return `Owned by ${team.ownerName}`
  }

  return "Legacy imported team"
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
    <div className="rounded-[1.7rem] border border-white/10 bg-slate-950/78 p-5 shadow-[0_20px_70px_rgba(2,6,23,0.22)]">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <div className="text-2xl font-black">
              {team.teamName}
            </div>

            <span
              className={`
                rounded-full
                px-2.5
                py-1
                text-[11px]
                font-black
                uppercase
                tracking-[0.22em]
                ${
                  ownedByCurrentUser
                    ? "bg-emerald-500/15 text-emerald-300"
                    : "bg-white/[0.06] text-slate-400"
                }
              `}
            >
              {ownedByCurrentUser
                ? "Editable"
                : "Read only"}
            </span>
          </div>

          <div className="text-sm text-slate-400">
            {formatOwnerLabel(
              team,
              currentUser
            )}
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl bg-white/[0.04] px-4 py-3">
              <div className="text-[11px] font-bold uppercase tracking-[0.24em] text-slate-500">
                Captain
              </div>

              <div className="mt-2 font-bold">
                {team.captain}
              </div>
            </div>

            <div className="rounded-2xl bg-white/[0.04] px-4 py-3">
              <div className="text-[11px] font-bold uppercase tracking-[0.24em] text-slate-500">
                Squad Size
              </div>

              <div className="mt-2 font-bold">
                {team.players.length} players
              </div>
            </div>
          </div>
        </div>

        {ownedByCurrentUser ? (
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() =>
                onEdit(team)
              }
              className={`
                rounded-full
                px-4
                py-2.5
                text-sm
                font-bold
                transition-all
                ${
                  isEditing
                    ? "bg-sky-500 text-slate-950"
                    : "bg-sky-500/15 text-sky-200 hover:bg-sky-500/25"
                }
              `}
            >
              {isEditing
                ? "Editing"
                : "Edit Team"}
            </button>

            <button
              onClick={() =>
                onDelete(team)
              }
              className="rounded-full bg-rose-500/15 px-4 py-2.5 text-sm font-bold text-rose-200 transition-all hover:bg-rose-500/25"
            >
              Delete
            </button>
          </div>
        ) : (
          <div className="rounded-full bg-white/[0.05] px-4 py-2.5 text-sm font-bold text-slate-300">
            View only
          </div>
        )}
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {team.players.map((player) => (
          <span
            key={`${team.id}-${player}`}
            className="rounded-full border border-white/8 bg-black/35 px-3 py-1.5 text-sm text-slate-200"
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

  const [search, setSearch] =
    useState("")

  const deferredSearch =
    useDeferredValue(search)

  useEffect(() => {
    if (!currentUser) {
      setEditingTeam(null)
    }
  }, [currentUser])

  const normalizedSearch =
    deferredSearch
      .trim()
      .toLowerCase()

  const searchedTeams =
    teams.filter((team) => {
      if (!normalizedSearch) {
        return true
      }

      const haystack = [
        team.teamName,
        team.captain,
        ...team.players,
        team.ownerName || "",
      ]
        .join(" ")
        .toLowerCase()

      return haystack.includes(
        normalizedSearch
      )
    })

  const ownedTeams =
    searchedTeams.filter((team) =>
      canManageTeam(
        team,
        currentUser
      )
    )

  const readOnlyTeams =
    searchedTeams.filter(
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
    <div className="space-y-8">
      <section className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-[0_24px_90px_rgba(2,6,23,0.35)]">
        <div className="grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
          <div className="space-y-5">
            <div className="text-[11px] font-black uppercase tracking-[0.34em] text-sky-300">
              Team Workspace
            </div>

            <div className="space-y-3">
              <h1 className="text-4xl font-black leading-tight md:text-5xl">
                Keep squads organized before the first ball is scored.
              </h1>

              <p className="max-w-3xl text-base leading-7 text-slate-300">
                This page now separates account access, team building, and squad review into a cleaner workspace. Sign in, create or edit your teams, then send them straight into live setup without retyping players.
              </p>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              <div className="rounded-2xl bg-white/[0.04] p-4">
                <div className="text-[11px] font-bold uppercase tracking-[0.24em] text-slate-500">
                  Visible Teams
                </div>

                <div className="mt-3 text-4xl font-black">
                  {searchedTeams.length}
                </div>
              </div>

              <div className="rounded-2xl bg-white/[0.04] p-4">
                <div className="text-[11px] font-bold uppercase tracking-[0.24em] text-slate-500">
                  Your Teams
                </div>

                <div className="mt-3 text-4xl font-black">
                  {currentUser
                    ? ownedTeams.length
                    : 0}
                </div>
              </div>

              <div className="rounded-2xl bg-white/[0.04] p-4">
                <div className="text-[11px] font-bold uppercase tracking-[0.24em] text-slate-500">
                  Read Only
                </div>

                <div className="mt-3 text-4xl font-black">
                  {readOnlyTeams.length}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                to="/live"
                className="rounded-full bg-emerald-500 px-5 py-3 font-bold text-slate-950 transition-all hover:bg-emerald-400"
              >
                Use Teams In Live Match
              </Link>

              <Link
                to="/guide"
                className="rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 font-bold transition-all hover:bg-white/[0.08]"
              >
                Open Quick Guide
              </Link>
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-white/10 bg-black/30 p-5">
            <div className="text-[11px] font-black uppercase tracking-[0.3em] text-emerald-300">
              Search Squads
            </div>

            <div className="mt-4 text-sm text-slate-400">
              Find teams by team name, captain, player, or owner.
            </div>

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value
                )
              }
              placeholder="Search teams, captains, or players..."
              className="mt-4 w-full rounded-2xl border border-white/10 bg-slate-950/85 px-4 py-3 outline-none transition-all placeholder:text-slate-500 focus:border-emerald-400/35"
            />

            <div className="mt-4 rounded-2xl bg-white/[0.04] p-4 text-sm text-slate-300">
              {editingTeam
                ? `Editing ${editingTeam.teamName}. Finish updating it or cancel before switching.`
                : currentUser
                  ? "You can create new teams and edit only the teams owned by your account."
                  : "Sign in first if you want to create or edit teams."}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-6">
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

          {!currentUser && (
            <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/78 p-5 text-sm leading-7 text-slate-400">
              Sign in to unlock team creation and editing. Public teams stay visible so you can still inspect squads before creating your own.
            </div>
          )}
        </div>

        <div>
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
            <div className="rounded-[1.75rem] border border-dashed border-white/10 bg-slate-950/60 p-8 text-center text-slate-400">
              Account access sits on the left. Once you sign in, the team builder will appear here.
            </div>
          )}
        </div>
      </section>

      <section className="space-y-8">
        <div className="space-y-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="text-[11px] font-black uppercase tracking-[0.34em] text-emerald-300">
                Editable Squads
              </div>

              <h2 className="mt-2 text-3xl font-black">
                Your Teams
              </h2>
            </div>

            <div className="text-sm text-slate-400">
              Teams owned by this account
            </div>
          </div>

          {ownedTeams.length === 0 ? (
            <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/78 p-5 text-slate-400">
              {currentUser
                ? "No editable teams match this search yet."
                : "Sign in to see the teams you own here."}
            </div>
          ) : (
            <div className="grid gap-4">
              {ownedTeams.map((team) => (
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
              ))}
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="text-[11px] font-black uppercase tracking-[0.34em] text-slate-400">
                Shared Visibility
              </div>

              <h2 className="mt-2 text-3xl font-black">
                Read-Only Teams
              </h2>
            </div>

            <div className="text-sm text-slate-400">
              Visible, but locked for editing
            </div>
          </div>

          {readOnlyTeams.length === 0 ? (
            <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/78 p-5 text-slate-400">
              No read-only teams match the current search.
            </div>
          ) : (
            <div className="grid gap-4">
              {readOnlyTeams.map((team) => (
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
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
