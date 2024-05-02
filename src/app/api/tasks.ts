import { type NextApiRequest, type NextApiResponse } from 'next'
import { isSpotifyUpdated } from '@/server/services/checkSpotifyUpdates'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    await isSpotifyUpdated()
    // La tarea fue exitosa, responde con un código 200
    console.log('pasa por aquí')
    res.status(200).send('results')
  } catch (err) {
    // La tarea falló, responde con un código 500 para que Mergent reintente
    console.log('error')
    res.status(500).json({ error: 'err.message' })
  }
}

export default handler
