'use server'
export const getViews = async (songId: string): Promise<any> => {
  const token = await resetToken()
  const first = await fetch(
    `https://api-partner.spotify.com/pathfinder/v1/query?operationName=getTrack&variables=%7B%22uri%22%3A%22spotify%3Atrack%3A${songId}%22%7D&extensions=%7B%22persistedQuery%22%3A%7B%22version%22%3A1%2C%22sha256Hash%22%3A%22ae85b52abb74d20a4c331d4143d4772c95f34757bfa8c625474b912b9055b5c0%22%7D%7D`,
    {
      headers: {
        accept: 'application/json',
        'accept-language': 'es',
        'app-platform': 'WebPlayer',
        authorization: `Bearer ${token}`,
        'client-token':
          'AADpy/v7jVfyfIgfg1Aa6y9v/EGc6UOv0ECx7xVAOAb47m74huGIlBkA1Sj5UzaDj9HgmEuldx8gvpIwMbkKu65qNFLY+TOXgMnagbA5Frp04SzkLa6QhOGMXGqqAbjJMSbE9FZLsGakbTzjRyeNYzCjF3FzvN07Eb+PNmuHEni06eMUb3GIskmiOx1joru6RX3oVVKVFqKi+JFhcpFfwl8azDeG9S8nG9qPa8FYNN5eS6gZqcbD/7wTlZOPLP94tnuUmXcB6IWaqxmwpmydVgJY1AmkQLxioEFkzmw0RDUCPdU=',
        'content-type': 'application/json;charset=UTF-8',
        priority: 'u=1, i',
        'sec-ch-ua':
          '"Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-site',
        'spotify-app-version': '1.2.37.455.gae7374f7'
      },
      referrer: 'https://open.spotify.com/',
      referrerPolicy: 'strict-origin-when-cross-origin',
      body: null,
      method: 'GET',
      mode: 'cors',
      credentials: 'include'
    }
  )
  const second = await first.json()
  return second.data.trackUnion.playcount
}

const resetToken = async (): Promise<string> => {
  const data = await fetch('https://open.spotify.com/intl-es')
  const text = await data.text()
  const textStart = text.search('accessToken')
  const textEnd = text.search('accessTokenExpirationTimestampMs')
  const token = text.substring(
    textStart + 'accessToken'.length + 3,
    textEnd - 3
  )
  return token
}

const searchSongSpotify = async (song: any): Promise<any> => {
  const token = await resetToken()
  const request = await fetch(
    `${process.env.SPOTIFY_API_LINK}search?q=${song}&type=track`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )
  const data = await request.json()
  return data.tracks.items
}

export default searchSongSpotify
