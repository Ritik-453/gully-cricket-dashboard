export default function Toast({
  message,
}) {

  if (!message) return null

  return (
    <div
      className="
        fixed
        top-5
        right-5
        bg-emerald-600
        text-white
        px-6
        py-3
        rounded-xl
        shadow-2xl
        z-[100]
      "
    >
      {message}
    </div>
  )
}