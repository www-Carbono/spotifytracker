interface ExternalUrls {
  spotify: string
}

interface Image {
  heigth: number
  width: number
  url: string
}

interface Artist {
  external_urls: ExternalUrls
  href: string
  id: string
  name: string
  type: string
  uri: string
}

interface Album {
  album_type: string
  artists: Artist[]
  available_markets: string[]
  external_urls: ExternalUrls
  href: string
  id: string
  images: Image[]
  name: string
  release_date: string
  release_date_precision: string
  total_tracks: number
  type: string
  uri: string
}

export interface Track {
  album: Album
  artists: Artist[]
  available_markets: string[]
  disc_number: number
  duration_ms: number
  explicit: boolean
  external_ids: { isrc: string }
  external_urls: ExternalUrls
  href: string
  id: string
  is_local: boolean
  name: string
  popularity: number
  preview_url: string
  track_number: number
  type: string
  uri: string
}

export interface SpotifyUpdaterData {
  DatabaseSongViews: string
  DatabaseMonthlyListeners: string
  DatabaseArtistFollowers: string
  DatabaseViewsCurrentDate: string
  DatabaseListenersCurrentDate: string
  DatabaseFollowersCurrentDate: string
  CurrentSongViews: string
  CurrentMonthlyListeners: string
  CurrentArtistFollowers: string
  CurrentDate: string
}

export interface OyentesMensuales {
  artistname: string
  coverlink: string
  songlink: string
  monthlylisteners: any
  userId: string
  id: string
}
