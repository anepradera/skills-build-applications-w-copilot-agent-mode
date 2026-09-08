import ResourcePage from './ResourcePage.jsx'

export default function Users() {
  return (
    <ResourcePage
      resource="users"
      eyebrow="The roster"
      title="Users"
      description="Everyone on the OctoFit roster, in one clear view."
      columns={[
        { key: 'name', label: 'Name' },
        { key: 'email', label: 'Email' },
        { key: 'team', label: 'Team' },
        { key: 'level', label: 'Level' },
      ]}
    />
  )
}