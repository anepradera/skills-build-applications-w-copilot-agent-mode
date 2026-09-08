import ResourcePage from './ResourcePage.jsx'

const usersEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`
  : 'http://localhost:8000/api/users/'

export default function Users() {
  return (
    <ResourcePage
      resource="users"
      endpoint={usersEndpoint}
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