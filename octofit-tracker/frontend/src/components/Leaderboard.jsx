import ResourcePage from './ResourcePage.jsx'

const leaderboardEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
  : 'http://localhost:8000/api/leaderboard/'

export default function Leaderboard() {
  return (
    <ResourcePage
      resource="leaderboard"
      endpoint={leaderboardEndpoint}
      eyebrow="Team pulse"
      title="Leaderboard"
      description="See who is building the strongest weekly momentum."
      columns={[
        { key: 'rank', label: 'Rank' },
        { key: 'name', label: 'Athlete' },
        { key: 'team', label: 'Team' },
        { key: 'points', label: 'Points' },
      ]}
    />
  )
}