import ResourcePage from './ResourcePage.jsx'

export default function Leaderboard() {
  return (
    <ResourcePage
      resource="leaderboard"
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