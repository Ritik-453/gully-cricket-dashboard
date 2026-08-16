import { useState } from "react"

import AuthPanel from "../components/AuthPanel"

export default function Account({
  authBusy,
  authReady,
  changePassword,
  currentUser,
  emailLogin,
  emailSignup,
  forgotPassword,
  googleLogin,
  logout,
  updateCurrentUserName,
}) {
  const hasPasswordProvider =
    Boolean(
      currentUser?.providerIds?.includes(
        "password"
      )
    )

  const [
    currentPassword,
    setCurrentPassword,
  ] = useState("")

  const [
    newPassword,
    setNewPassword,
  ] = useState("")

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("")

  const [formError, setFormError] =
    useState("")

  const [changing, setChanging] =
    useState(false)

  const handleChangePassword =
    async (event) => {
      event.preventDefault()
      setFormError("")

      if (newPassword.length < 6) {
        setFormError(
          "New password must be at least 6 characters."
        )
        return
      }

      if (
        newPassword !==
        confirmPassword
      ) {
        setFormError(
          "New password and confirmation don't match."
        )
        return
      }

      setChanging(true)

      const isChanged =
        await changePassword({
          currentPassword,
          newPassword,
        })

      setChanging(false)

      if (isChanged) {
        setCurrentPassword("")
        setNewPassword("")
        setConfirmPassword("")
      }
    }

  return (
    <div className="animate-pop-in mx-auto max-w-2xl space-y-6">
      <div className="space-y-2">
        <div className="text-[11px] font-black uppercase tracking-[0.34em] text-emerald-300">
          Account
        </div>

        <h1 className="text-3xl font-black">
          Your Account
        </h1>

        <p className="text-sm leading-6 text-slate-400">
          Sign in, manage your display name, and update your password from here.
        </p>
      </div>

      <AuthPanel
        authBusy={authBusy}
        authReady={authReady}
        currentUser={currentUser}
        onEmailLogin={emailLogin}
        onEmailSignup={emailSignup}
        onForgotPassword={
          forgotPassword
        }
        onGoogleLogin={googleLogin}
        onLogout={logout}
        onUpdateName={
          updateCurrentUserName
        }
      />

      {currentUser &&
        hasPasswordProvider && (
          <div className="rounded-2xl bg-zinc-900 p-5 space-y-4 md:p-6">
            <h2 className="text-xl font-bold md:text-2xl">
              Change Password
            </h2>

            <form
              onSubmit={
                handleChangePassword
              }
              className="space-y-3"
            >
              <input
                type="password"
                placeholder="Current password"
                value={
                  currentPassword
                }
                onChange={(
                  event
                ) =>
                  setCurrentPassword(
                    event.target
                      .value
                  )
                }
                className="w-full rounded-xl bg-black p-3"
              />

              <input
                type="password"
                placeholder="New password"
                value={newPassword}
                onChange={(
                  event
                ) =>
                  setNewPassword(
                    event.target
                      .value
                  )
                }
                className="w-full rounded-xl bg-black p-3"
              />

              <input
                type="password"
                placeholder="Confirm new password"
                value={
                  confirmPassword
                }
                onChange={(
                  event
                ) =>
                  setConfirmPassword(
                    event.target
                      .value
                  )
                }
                className="w-full rounded-xl bg-black p-3"
              />

              {formError && (
                <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                  {formError}
                </div>
              )}

              <button
                type="submit"
                disabled={
                  changing ||
                  authBusy
                }
                className="w-full rounded-xl bg-emerald-600 py-3 font-bold transition-all hover:bg-emerald-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {changing
                  ? "Updating..."
                  : "Update Password"}
              </button>
            </form>
          </div>
        )}

      {currentUser &&
        !hasPasswordProvider && (
          <div className="rounded-2xl border border-dashed border-white/10 bg-zinc-900/60 p-5 text-sm text-slate-400 md:p-6">
            You&apos;re signed in with Google, so there&apos;s no password to manage here.
          </div>
        )}
    </div>
  )
}
