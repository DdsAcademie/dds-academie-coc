import { readFileSync } from 'fs'

// Chargement manuel du .env.local
const env = readFileSync('.env.local', 'utf-8')
for (const line of env.split('\n')) {
  const [key, ...rest] = line.split('=')
  if (key && rest.length) process.env[key.trim()] = rest.join('=').trim()
}

async function main() {
  const key = process.env.COC_API_KEY
  console.log('Clé trouvée :', key ? 'OUI (' + key.substring(0, 20) + '...)' : 'NON')

  const response = await fetch(
    'https://api.clashofclans.com/v1/clans/%232RJJJ2V09',
    {
      headers: {
        'Authorization': `Bearer ${key}`,
      }
    }
  )

  console.log('Status:', response.status)
  const data = await response.json()
  console.log('Réponse:', JSON.stringify(data, null, 2))
}

main().catch(console.error)
