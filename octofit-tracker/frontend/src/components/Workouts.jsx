import ResourcePage from './ResourcePage.jsx'

export default function Workouts() {
  return (
    <ResourcePage
      resource="workouts"
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