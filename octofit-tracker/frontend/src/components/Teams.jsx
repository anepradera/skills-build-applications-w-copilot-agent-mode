import ResourcePage from './ResourcePage.jsx'

const teamsEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/'

export default function Teams() {
  return (
    <ResourcePage
      resource="teams"
      endpoint={teamsEndpoint}
      eyebrow="Community"
      title="Teams"
      description="Find your crew, compare progress, and keep each other moving."
      columns={[
        { key: 'name', label: 'Team' },
        { key: 'captain', label: 'Captain' },
        { key: 'members', label: 'Members' },
        { key: 'points', label: 'Points' },
      ]}
    />
  )
}