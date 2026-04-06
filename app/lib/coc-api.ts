const COC_API_BASE = 'https://api.clashofclans.com/v1'
const COC_API_KEY = process.env.COC_API_KEY!

function encodeTag(tag: string): string {
  return encodeURIComponent(tag.startsWith('#') ? tag : `#${tag}`)
}

function getHeaders() {
  return {
    'Authorization': `Bearer ${COC_API_KEY}`,
    'Content-Type': 'application/json',
  }
}

export async function getClanInfo(tag: string) {
  const response = await fetch(
    `${COC_API_BASE}/clans/${encodeTag(tag)}`,
    {
      headers: getHeaders(),
      next: { revalidate: 300 },
    }
  )

  if (!response.ok) {
    throw new Error(`Erreur API COC pour ${tag}: ${response.status}`)
  }

  return response.json()
}

export async function getAllClansInfo() {
  const tags = ['#2RJJJ2V09', '#8CLGGL8V', '#99UPQRLJ']

  const results = await Promise.allSettled(
    tags.map(tag => getClanInfo(tag))
  )

  return results.map((result, index) => {
    if (result.status === 'fulfilled') {
      return result.value
    } else {
      console.error(`Erreur clan ${tags[index]}:`, result.reason)
      return null
    }
  })
}
