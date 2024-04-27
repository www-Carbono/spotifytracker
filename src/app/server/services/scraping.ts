'use server'
const getViews = async (token: string): Promise<any> => {
  const first = await fetch(
    'https://api-partner.spotify.com/pathfinder/v1/query?operationName=getAlbum&variables=%7B%22uri%22%3A%22spotify%3Aalbum%3A2VZ9rmzFLZbsMMrmrJF8ur%22%2C%22locale%22%3A%22intl-es%22%2C%22offset%22%3A0%2C%22limit%22%3A50%7D&extensions=%7B%22persistedQuery%22%3A%7B%22version%22%3A1%2C%22sha256Hash%22%3A%22469874edcad37b7a379d4f22f0083a49ea3d6ae097916120d9bbe3e36ca79e9d%22%7D%7D',
    {
      headers: {
        accept: 'application/json',
        'accept-language': 'es',
        'app-platform': 'WebPlayer',
        authorization: `Bearer ${token}`,
        'client-token':
          'AACfpQvKgGGv+fQZdTuDnQ7HF4UZ90q7Tj9I6QN3cHX3om1fD5CIJv0gVpub6vNMSUF0B3Megf3wfSKqmk6yYMsnb6Fp2mf7o7DVra64Febg6Kzt9pZckFYS3FzJAeaZ96T8rFxl8l5s3hMThCJzAkdmNyPDod81h2UljXheFJWBb4FR2DxbzrYLyfnR97NNyydNmVbTd5P00Cv224wq5iwPYQCRxBrugcWizXfrD4tZXJErkpK8B53l9gOmelxDsBIMM9HUbk9nAbObitDwIVO3SM+QmnHhHNDkWS/fEciYiW0=',
        'content-type': 'application/json;charset=UTF-8',
        priority: 'u=1, i',
        'sec-ch-ua':
          '"Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-site',
        'spotify-app-version': '1.2.37.420.gd47d6b2c'
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
  return second.data.albumUnion.tracks.items[0].track.playcount
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

// const scrapeSong = async (): Promise<void> => {
//   const token = await resetToken()
//   const views = await getViews(token)
//   const test = await searchSong('Melendi ', token)
//   console.log(test)
// }

const searchSongSpotify = async (song: any): Promise<any> => {
  const token = await resetToken()
  const request = await fetch(
    `https://api.spotify.com/v1/search?q=${song}&type=track`,
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
