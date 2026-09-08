import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function displayValue(value) {
  if (value === null || value === undefined || value === '') return '—'
  if (typeof value === 'object') return JSON.stringify(value)
  return String(value)
}

export default function ResourcePage({ resource, endpoint, eyebrow, title, description, columns }) {
  const [items, setItems] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    fetchCollection(endpoint, controller.signal)
      .then((nextItems) => {
        setItems(nextItems)
        setStatus('ready')
      })
      .catch((requestError) => {
        if (requestError.name === 'AbortError') return
        setError(requestError.message)
        setStatus('error')
      })

    return () => controller.abort()
  }, [endpoint, resource])

  return (
    <section className="resource-page">
      <div className="page-heading">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="page-description">{description}</p>
      </div>

      <div className="resource-toolbar">
        <span className="resource-count">
          {status === 'loading' ? 'Loading…' : `${items.length} records`}
        </span>
        <span className="endpoint-label">/api/{resource}/</span>
      </div>

      <div className="table-frame">
        {status === 'loading' && <p className="table-message">Loading data…</p>}
        {status === 'error' && <p className="table-message error-message">{error}</p>}
        {status === 'ready' && items.length === 0 && (
          <p className="table-message">No records have been added yet.</p>
        )}
        {status === 'ready' && items.length > 0 && (
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  {columns.map((column) => <th key={column.key}>{column.label}</th>)}
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={item.id || item._id || index}>
                    {columns.map((column) => (
                      <td key={column.key}>{displayValue(item[column.key])}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  )
}