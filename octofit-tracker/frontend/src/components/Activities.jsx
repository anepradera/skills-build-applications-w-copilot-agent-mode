import ResourcePage from './ResourcePage.jsx'

export default function Activities() {
  return (
    <ResourcePage
      resource="activities"
      eyebrow="Movement log"
      title="Activities"
      description="A live view of every completed session across OctoFit."
      columns={[
        { key: 'name', label: 'Activity' },
        { key: 'type', label: 'Type' },
        { key: 'duration', label: 'Duration' },
        { key: 'points', label: 'Points' },
      ]}
    />
  )
}