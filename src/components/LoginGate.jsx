import { useState } from "react"

const inputClass = `
  w-full
  rounded-2xl
  border
  border-white/10
  bg-black/40
  px-4
  py-3
  text-sm
  text-white
  outline-none
  transition-all
  placeholder:text-slate-500
  focus:border-emerald-400/40
`

const primaryButtonClass = `
  w-full
  rounded-2xl
  bg-emerald-500
  py-3
  font-bold
  text-slate-950
  transition-all
  hover:bg-emerald-400
  active:scale-95
  disabled:cursor-not-allowed
  disabled:opacity-60
`

const GoogleIcon = () => (
  <svg
    viewBox="0 0 48 48"
    className="h-5 w-5"
    aria-hidden="true"
  >
    <path
      fill="#FFC107"
      d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.5z"
    />
    <path
      fill="#FF3D00"
      d="M6.3 14.7l6.6 4.8C14.6 15.1 18.9 12 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4 16.3 4 9.6 8.3 6.3 14.7z"
    />
    <path
      fill="#4CAF50"
      d="M24 44c5.5 0 10.4-1.9 14.3-5.1l-6.6-5.6c-2 1.5-4.6 2.7-7.7 2.7-5.2 0-9.6-3.3-11.2-7.9l-6.6 5.1C9.5 39.6 16.2 44 24 44z"
    />
    <path
      fill="#1976D2"
      d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.2 4.2-4.1 5.6l6.6 5.6C41.5 36 44 30.6 44 24c0-1.3-.1-2.7-.4-3.5z"
    />
  </svg>
)

export default function LoginGate({
  authBusy,
  onContinueAsGuest,
  onEmailLogin,
  onEmailSignup,
  onForgotPassword,
  onGoogleLogin,
}) {
  const [mode, setMode] =
    useState("login")

  const [name, setName] =
    useState("")

  const [email, setEmail] =
    useState("")

  const [password, setPassword] =
    useState("")

  const [resetSent, setResetSent] =
    useState(false)

  const switchTab = (
    nextMode
  ) => {
    setMode(nextMode)
    setPassword("")
    setResetSent(false)
  }

  const handleSubmit = async (
    event
  ) => {
    event.preventDefault()

    const trimmedEmail =
      email.trim()

    if (mode === "signup") {
      await onEmailSignup({
        name,
        email: trimmedEmail,
        password,
      })
      return
    }

    if (mode === "forgot") {
      const isSent =
        await onForgotPassword(
          trimmedEmail
        )

      if (isSent) {
        setResetSent(true)
      }
      return
    }

    await onEmailLogin({
      email: trimmedEmail,
      password,
    })
  }

  return (
    <div className="fixed inset-0 z-[300] overflow-y-auto bg-slate-950">
      <div
        className="
          animate-gate-backdrop
          pointer-events-none
          absolute
          inset-0
          overflow-hidden
        "
        aria-hidden="true"
      >
        <div className="animate-float-slow absolute -left-24 -top-24 h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl" />
        <div className="animate-float-slow-reverse absolute -bottom-24 -right-16 h-80 w-80 rounded-full bg-sky-500/20 blur-3xl" />
      </div>

      <div className="relative flex min-h-screen items-center justify-center px-4 py-10">
        <div className="animate-gate-in w-full max-w-md">
          <div className="mb-6 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-400/25 bg-emerald-500/10 text-xl font-black text-emerald-300">
              GC
            </div>

            <div className="mt-4 text-2xl font-black tracking-tight text-white">
              Gully Cricket Dashboard
            </div>

            <div className="mt-1 text-sm text-slate-400">
              Score matches, manage squads, and keep your gully cricket history in one place.
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-white/10 bg-slate-900/85 p-5 shadow-[0_30px_100px_rgba(2,6,23,0.55)] backdrop-blur md:p-6">
            {mode !== "forgot" && (
              <div className="relative mb-5 grid grid-cols-2 rounded-2xl border border-white/10 bg-black/30 p-1">
                <div
                  className="absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-xl bg-emerald-500 transition-transform duration-300 ease-out"
                  style={{
                    transform:
                      mode ===
                      "signup"
                        ? "translateX(calc(100% + 0.25rem))"
                        : "translateX(0%)",
                  }}
                />

                <button
                  type="button"
                  onClick={() =>
                    switchTab(
                      "login"
                    )
                  }
                  className={`
                    relative
                    z-10
                    rounded-xl
                    py-2.5
                    text-sm
                    font-bold
                    transition-colors
                    active:scale-95
                    ${
                      mode ===
                      "login"
                        ? "text-slate-950"
                        : "text-slate-300"
                    }
                  `}
                >
                  Sign In
                </button>

                <button
                  type="button"
                  onClick={() =>
                    switchTab(
                      "signup"
                    )
                  }
                  className={`
                    relative
                    z-10
                    rounded-xl
                    py-2.5
                    text-sm
                    font-bold
                    transition-colors
                    active:scale-95
                    ${
                      mode ===
                      "signup"
                        ? "text-slate-950"
                        : "text-slate-300"
                    }
                  `}
                >
                  Create Account
                </button>
              </div>
            )}

            {mode === "forgot" && (
              <div className="mb-5 flex items-center justify-between">
                <div className="text-lg font-black text-white">
                  Reset Password
                </div>

                <button
                  type="button"
                  onClick={() =>
                    switchTab(
                      "login"
                    )
                  }
                  className="text-sm font-bold text-slate-400 transition-colors hover:text-white active:scale-95"
                >
                  Back
                </button>
              </div>
            )}

            <div
              key={`${mode}-${resetSent}`}
              className="animate-tab-content"
            >
              {mode === "forgot" ? (
                resetSent ? (
                  <div className="space-y-4 text-center">
                    <div className="text-4xl">
                      📬
                    </div>

                    <div className="text-sm text-slate-300">
                      If an account exists for{" "}
                      <span className="font-bold text-white">
                        {email}
                      </span>
                      , a reset link is on its way. Check your inbox (and spam folder).
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        switchTab(
                          "login"
                        )
                      }
                      className={
                        primaryButtonClass
                      }
                    >
                      Back To Sign In
                    </button>
                  </div>
                ) : (
                  <form
                    onSubmit={
                      handleSubmit
                    }
                    className="space-y-3"
                  >
                    <div className="text-sm text-slate-400">
                      Enter the email on your account and we&apos;ll send a link to reset your password.
                    </div>

                    <input
                      type="email"
                      required
                      placeholder="Email"
                      value={email}
                      onChange={(
                        event
                      ) =>
                        setEmail(
                          event
                            .target
                            .value
                        )
                      }
                      className={
                        inputClass
                      }
                    />

                    <button
                      type="submit"
                      disabled={
                        authBusy
                      }
                      className={
                        primaryButtonClass
                      }
                    >
                      {authBusy
                        ? "Sending..."
                        : "Send Reset Link"}
                    </button>
                  </form>
                )
              ) : (
                <form
                  onSubmit={
                    handleSubmit
                  }
                  className="space-y-3"
                >
                  {mode ===
                    "signup" && (
                    <input
                      type="text"
                      required
                      placeholder="Display name"
                      value={name}
                      onChange={(
                        event
                      ) =>
                        setName(
                          event
                            .target
                            .value
                        )
                      }
                      className={
                        inputClass
                      }
                    />
                  )}

                  <input
                    type="email"
                    required
                    placeholder="Email"
                    value={email}
                    onChange={(
                      event
                    ) =>
                      setEmail(
                        event
                          .target
                          .value
                      )
                    }
                    className={
                      inputClass
                    }
                  />

                  <input
                    type="password"
                    required
                    placeholder="Password"
                    value={
                      password
                    }
                    onChange={(
                      event
                    ) =>
                      setPassword(
                        event
                          .target
                          .value
                      )
                    }
                    className={
                      inputClass
                    }
                  />

                  {mode ===
                    "login" && (
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() =>
                          switchTab(
                            "forgot"
                          )
                        }
                        className="text-xs font-bold text-emerald-300 transition-colors hover:text-emerald-200 active:scale-95"
                      >
                        Forgot password?
                      </button>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={
                      authBusy
                    }
                    className={
                      primaryButtonClass
                    }
                  >
                    {authBusy
                      ? "Please wait..."
                      : mode ===
                          "signup"
                        ? "Create Account"
                        : "Sign In"}
                  </button>
                </form>
              )}
            </div>

            {mode !== "forgot" && (
              <>
                <div className="my-5 flex items-center gap-3">
                  <div className="h-px flex-1 bg-white/10" />

                  <div className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
                    Or
                  </div>

                  <div className="h-px flex-1 bg-white/10" />
                </div>

                <button
                  type="button"
                  onClick={
                    onGoogleLogin
                  }
                  disabled={
                    authBusy
                  }
                  className="flex w-full items-center justify-center gap-3 rounded-2xl bg-white py-3 font-bold text-slate-900 transition-all hover:bg-slate-100 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <GoogleIcon />
                  Continue With Google
                </button>
              </>
            )}
          </div>

          <button
            type="button"
            onClick={
              onContinueAsGuest
            }
            className="mt-4 w-full rounded-2xl border border-white/10 bg-white/[0.03] py-3 text-sm font-bold text-slate-300 transition-all hover:bg-white/[0.06] active:scale-95"
          >
            Continue As Guest
          </button>

          <div className="mt-3 text-center text-xs leading-5 text-slate-500">
            Guest mode lets you explore and score matches right away. Sign in anytime later to save your own teams.
          </div>
        </div>
      </div>
    </div>
  )
}
