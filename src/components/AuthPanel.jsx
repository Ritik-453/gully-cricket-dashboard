import {
  useEffect,
  useState,
} from "react"

export default function AuthPanel({
  authBusy,
  authReady,
  currentUser,
  onEmailLogin,
  onEmailSignup,
  onGoogleLogin,
  onLogout,
  onUpdateName,
}) {
  const [mode, setMode] =
    useState("login")

  const [name, setName] =
    useState("")

  const [email, setEmail] =
    useState("")

  const [password, setPassword] =
    useState("")

  useEffect(() => {
    setName(currentUser?.name || "")
  }, [currentUser?.name])

  const resetForm = () => {
    setEmail("")
    setPassword("")
  }

  const handleSubmit = async (
    event
  ) => {
    event.preventDefault()

    const trimmedEmail =
      email.trim()

    if (mode === "signup") {
      const isSignedUp =
        await onEmailSignup({
          name,
          email: trimmedEmail,
          password,
        })

      if (isSignedUp) {
        resetForm()
      }

      return
    }

    const isLoggedIn =
      await onEmailLogin({
        email: trimmedEmail,
        password,
      })

    if (isLoggedIn) {
      resetForm()
    }
  }

  const handleNameSave = async (
    event
  ) => {
    event.preventDefault()
    await onUpdateName(name)
  }

  if (!authReady) {
    return (
      <div
        className="
          rounded-2xl
          bg-zinc-900
          p-6
          text-zinc-300
        "
      >
        Checking sign-in status...
      </div>
    )
  }

  if (currentUser) {
    return (
      <div
        className="
          rounded-2xl
          bg-zinc-900
          p-6
          space-y-4
        "
      >
        <div>
          <h2 className="text-2xl font-bold">
            Account
          </h2>

          <p className="mt-2 text-zinc-400">
            Signed in as
            {" "}
            {currentUser.email || currentUser.name}
          </p>
        </div>

        <form
          onSubmit={handleNameSave}
          className="
            flex
            flex-col
            gap-3
            md:flex-row
          "
        >
          <input
            type="text"
            value={name}
            onChange={(event) =>
              setName(
                event.target.value
              )
            }
            className="
              flex-1
              rounded-xl
              bg-black
              p-3
            "
            placeholder="Display name"
          />

          <button
            type="submit"
            disabled={authBusy}
            className="
              rounded-xl
              bg-emerald-600
              px-5
              py-3
              font-bold
              hover:bg-emerald-700
              transition-all
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >
            Save Name
          </button>
        </form>

        <div
          className="
            flex
            flex-col
            gap-3
            md:flex-row
            md:items-center
            md:justify-between
          "
        >
          <div className="text-sm text-zinc-500">
            User ID:
            {" "}
            {currentUser.id}
          </div>

          <button
            onClick={onLogout}
            disabled={authBusy}
            className="
              rounded-xl
              bg-red-600
              px-5
              py-3
              font-bold
              hover:bg-red-700
              transition-all
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >
            Sign Out
          </button>
        </div>
      </div>
    )
  }

  return (
    <div
      className="
        rounded-2xl
        bg-zinc-900
        p-6
        space-y-4
      "
    >
      <div>
        <h2 className="text-2xl font-bold">
          Sign In To Manage Teams
        </h2>

        <p className="mt-2 text-zinc-400">
          Use email login or Google to create, edit, and delete your own teams.
        </p>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() =>
            setMode("login")
          }
          className={`
            rounded-xl
            px-4
            py-2
            font-semibold
            transition-all
            ${
              mode === "login"
                ? "bg-blue-600"
                : "bg-zinc-800 hover:bg-zinc-700"
            }
          `}
        >
          Login
        </button>

        <button
          onClick={() =>
            setMode("signup")
          }
          className={`
            rounded-xl
            px-4
            py-2
            font-semibold
            transition-all
            ${
              mode === "signup"
                ? "bg-blue-600"
                : "bg-zinc-800 hover:bg-zinc-700"
            }
          `}
        >
          Sign Up
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-3"
      >
        {mode === "signup" && (
          <input
            type="text"
            placeholder="Display name"
            value={name}
            onChange={(event) =>
              setName(
                event.target.value
              )
            }
            className="
              w-full
              rounded-xl
              bg-black
              p-3
            "
          />
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) =>
            setEmail(
              event.target.value
            )
          }
          className="
            w-full
            rounded-xl
            bg-black
            p-3
          "
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) =>
            setPassword(
              event.target.value
            )
          }
          className="
            w-full
            rounded-xl
            bg-black
            p-3
          "
        />

        <button
          type="submit"
          disabled={authBusy}
          className="
            w-full
            rounded-xl
            bg-green-600
            py-3
            font-bold
            hover:bg-green-700
            transition-all
            disabled:opacity-50
            disabled:cursor-not-allowed
          "
        >
          {authBusy
            ? "Please wait..."
            : mode === "signup"
              ? "Create Account"
              : "Sign In"}
        </button>
      </form>

      <button
        onClick={onGoogleLogin}
        disabled={authBusy}
        className="
          w-full
          rounded-xl
          bg-white
          py-3
          font-bold
          text-black
          hover:bg-zinc-200
          transition-all
          disabled:opacity-50
          disabled:cursor-not-allowed
        "
      >
        Continue With Google
      </button>
    </div>
  )
}
