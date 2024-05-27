'use server'
export const getViews = async (songId: any, type: string): Promise<any> => {
  const token = await resetToken()
  const URL =
    type === 'track'
      ? `https://api-partner.spotify.com/pathfinder/v1/query?operationName=getTrack&variables=%7B%22uri%22%3A%22spotify%3Atrack%3A${songId}%22%7D&extensions=%7B%22persistedQuery%22%3A%7B%22version%22%3A1%2C%22sha256Hash%22%3A%22ae85b52abb74d20a4c331d4143d4772c95f34757bfa8c625474b912b9055b5c0%22%7D%7D`
      : `https://api-partner.spotify.com/pathfinder/v1/query?operationName=queryArtistOverview&variables=%7B%22uri%22%3A%22spotify%3Aartist%3A${songId}%22%2C%22locale%22%3A%22intl-es%22%2C%22includePrerelease%22%3Atrue%7D&extensions=%7B%22persistedQuery%22%3A%7B%22version%22%3A1%2C%22sha256Hash%22%3A%22da986392124383827dc03cbb3d66c1de81225244b6e20f8d78f9f802cc43df6e%22%7D%7D`

  const first = await fetch(URL, {
    headers: {
      accept: 'application/json',
      'accept-language': 'es',
      'app-platform': 'WebPlayer',
      authorization: `Bearer ${token}`,
      'content-type': 'application/json;charset=UTF-8',
      priority: 'u=1, i',
      'sec-ch-ua':
        '"Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"Windows"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-site',
      'spotify-app-version': '1.2.38.409.gca8ff1bf'
    },
    referrer: 'https://open.spotify.com/',
    referrerPolicy: 'strict-origin-when-cross-origin',
    body: null,
    method: 'GET',
    mode: 'cors',
    credentials: 'include'
  })
  console.log(first)
  const second = await first.json()
  if (type === 'track') {
    return second.data.trackUnion.playcount
  } else {
    return second.data.artistUnion.stats // .followers para seguidores y .monthlyListeners para oyentes
  }
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

const searchSongSpotify = async (song: any, type: string): Promise<any> => {
  // track
  const LINK =
    type === 'track'
      ? `${process.env.SPOTIFY_API_LINK}search?q=${song}&type=${type}&limit=10`
      : `${process.env.SPOTIFY_API_LINK}search?q=${song}&type=artist&limit=10`
  const token = await resetToken()
  const request = await fetch(LINK, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  const data = await request.json()
  return data
}

export const CompareData = async (
  songId: string,
  artistId: string
): Promise<any> => {
  // Scrapea los datos actuales
  const songViews = await getViews(songId, 'track')
  const artistFollowersPromise = await getViews(artistId, 'followers')
  const artistFollowers: string = artistFollowersPromise.followers.toString()
  const artistMonthlyListeners: string =
    artistFollowersPromise.monthlyListeners.toString()

  return { songViews, artistFollowers, artistMonthlyListeners }
}

export default searchSongSpotify
