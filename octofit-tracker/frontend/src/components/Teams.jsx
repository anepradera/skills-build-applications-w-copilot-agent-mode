import ResourcePage from './ResourcePage.jsx'

export default function Teams() {
  return (
    <ResourcePage
      resource="teams"
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