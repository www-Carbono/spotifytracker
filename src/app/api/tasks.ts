import { isSpotifyUpdated } from '@/server/services/checkSpotifyUpdates'

const handler = async (req: any, res: any): Promise<void> => {
  try {
    await isSpotifyUpdated()
    // task was successful, respond with 200
    res.status(200).send('')
  } catch (err) {
    // task failed, respond with 500 so Mergent will retry
    res.status(500).send({ error: err })
  }
}

export default handler
