const TONE_STYLES = {
  info: {
    wrap: "bg-emerald-600",
    bar: "bg-emerald-300",
    icon: "ℹ️",
  },
  celebrate: {
    wrap: "bg-amber-500 text-slate-950",
    bar: "bg-amber-200",
    icon: "🎉",
  },
  warning: {
    wrap: "bg-red-600",
    bar: "bg-red-300",
    icon: "⚠️",
  },
}

export default function Toast({
  toast,
}) {
  if (!toast || !toast.message)
    return null

  const tone =
    TONE_STYLES[toast.tone] ||
    TONE_STYLES.info

  return (
    <div
      key={toast.id}
      className="
        fixed
        top-4
        right-3
        left-3
        z-[100]
        flex
        justify-end
        sm:left-auto
        sm:top-5
        sm:right-5
      "
    >
      <div
        className={`
          animate-toast-in
          relative
          overflow-hidden
          rounded-xl
          px-5
          py-3
          shadow-2xl
          font-semibold
          max-w-sm
          ${tone.wrap}
        `}
      >
        <div className="flex items-center gap-2">
          <span>{tone.icon}</span>
          <span>{toast.message}</span>
        </div>

        <div
          className={`
            absolute
            bottom-0
            left-0
            h-1
            animate-toast-bar
            ${tone.bar}
          `}
        />
      </div>
    </div>
  )
}
