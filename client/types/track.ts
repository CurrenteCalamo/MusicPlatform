export interface ITrack {
  _id: string
  name: string
  artist: string
  creator: string
  listens: number
  image: string
  audio: string
}

export interface IUser {
  _id: string
  username: string
  email: string
  password: string
  bio?: number
  image?: string
  likeTrack?: string[]
  likeAlbom?: string[]
}
export interface IAlbum {
  _id: string
  name: string
  image: string
  artist: string
  creator: string
  track: []
}
