import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="brand-mark" aria-label="OctoFit Tracker home">
          <span className="brand-symbol">O</span>
          <span className="brand-copy">
            <span className="brand-kicker">OCTOFIT</span>
            <span className="brand-name">Performance Club</span>
          </span>
        </div>
        <nav className="main-nav" aria-label="Primary navigation">
          <NavLink to="/activities"><span className="nav-index">01</span>Activities</NavLink>
          <NavLink to="/workouts"><span className="nav-index">02</span>Workouts</NavLink>
          <NavLink to="/teams"><span className="nav-index">03</span>Teams</NavLink>
          <NavLink to="/leaderboard"><span className="nav-index">04</span>Leaderboard</NavLink>
          <NavLink to="/users"><span className="nav-index">05</span>Members</NavLink>
        </nav>
      </header>

      <main className="app-main">
        <Routes>
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="*" element={<Navigate to="/activities" replace />} />
        </Routes>
      </main>
      <footer className="app-footer">
        <span>TRAIN HARD / RECOVER SMART</span>
        <span>OCTOFIT CLUB · 2026</span>
      </footer>
    </div>
  )
}

export default App
