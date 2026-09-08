const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

function findItems(payload) {
  if (Array.isArray(payload)) return payload
  if (!payload || typeof payload !== 'object') return []

  for (const key of ['data', 'results', 'items']) {
    if (payload[key] !== undefined) {
      const items = findItems(payload[key])
      if (items.length || Array.isArray(payload[key])) return items
    }
  }

  return []
}

export async function fetchCollection(endpoint, signal) {
  const response = await fetch(endpoint, { signal })
  if (!response.ok) {
    throw new Error(`Unable to load API resource (${response.status})`)
  }

  return findItems(await response.json())
}