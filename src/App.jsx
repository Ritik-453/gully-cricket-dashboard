import Navbar from "./components/Navbar"
import ScoreBoard from "./components/ScoreBoard"

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="p-6">
        <ScoreBoard />
      </div>
    </div>
  )
}