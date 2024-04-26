'use server'
import Spotify from 'spotify-finder'
const data = async (): Promise<any> => {
  const first = await fetch(
    'https://api-partner.spotify.com/pathfinder/v1/query?operationName=getAlbum&variables=%7B%22uri%22%3A%22spotify%3Aalbum%3A2VZ9rmzFLZbsMMrmrJF8ur%22%2C%22locale%22%3A%22intl-es%22%2C%22offset%22%3A0%2C%22limit%22%3A50%7D&extensions=%7B%22persistedQuery%22%3A%7B%22version%22%3A1%2C%22sha256Hash%22%3A%22469874edcad37b7a379d4f22f0083a49ea3d6ae097916120d9bbe3e36ca79e9d%22%7D%7D',
    {
      headers: {
        accept: 'application/json',
        'accept-language': 'es',
        'app-platform': 'WebPlayer',
        authorization:
          'Bearer BQD-3jNTQoY8yPiOHUhOu_7vdiImyasD1MNWHA4Dsje6PpOmvclLwbvOqzvzHiDpRBKoSGcZylf8l-dHauLtGb-UGdapQaatgzS9N1-eGPnqcEKNCfZFtQ4JWj8zQORpwwKsf548Z3XULAx6DY40rnZMr_emiJKT_BHImNwTS8O_ITwMqCKRqcqX3cb8C8WflofEHubw0WCJnBtAxDUI6HF5vNbrsAo2UIVQFf-t4a6yS5nT9GDq1-IwOrUR5uU0rH6L8lcMUJjr42V_uMEQZbL22ZSraIIjRKC3ibz-VUizRA9eNtOUDCaiC2gG1h0k6oLg1WO9mKASmBPKqpVmSCOYzaoV',
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
  const second = first.json()
  return await second
}

const scrapeSong = (): void => {
  const client = new Spotify({
    consumer: {
      key: '47c598b772a34e67b66a53f78927cdbc', // from v2.1.0 is required
      secret: 'ab8ebcd80825414b96bcd5001682db6c' // from v2.1.0 is required
    }
  })

  //   const params = {
  //     q: 'Rompeolas Martin Urrutia', // required
  //     type: 'track', // optional for default 'artist,album,track'
  //     limit: 5 // optional for default 20
  //   }
  //   client.search(params).then((data) => {
  //     console.log(data.tracks.items)
  //     // do something with data
  //   })

  data()
    .then((data) => {
      console.log(data)
    })
    .catch((error: any) => {
      console.log(error)
    })
}

export default scrapeSong
