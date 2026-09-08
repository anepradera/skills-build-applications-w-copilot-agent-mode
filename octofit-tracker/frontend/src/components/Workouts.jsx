import ResourcePage from './ResourcePage.jsx'

const workoutsEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/'

export default function Workouts() {
  return (
    <ResourcePage
      resource="workouts"
      endpoint={workoutsEndpoint}
      eyebrow="Your next session"
      title="Workouts"
      description="Browse the workouts ready to turn intention into progress."
      columns={[
        { key: 'name', label: 'Workout' },
        { key: 'difficulty', label: 'Difficulty' },
        { key: 'duration', label: 'Duration' },
        { key: 'focus', label: 'Focus' },
      ]}
    />
  )
}