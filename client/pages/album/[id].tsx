import React, { useEffect, useState } from 'react'
import AlbumTrack from '../../components/AlbumTrack'
import { useRouter } from 'next/router'
import Layout from '../../layouts/Layout'
import { IAlbum } from '../../types/track'
import Head from 'next/head'

interface AlbumProps {
  album: IAlbum
}
const Album: React.FC<AlbumProps> = ({ album: serverAlbums }) => {
  const router = useRouter()
  const [album, setAlbum] = useState(serverAlbums)

  useEffect(() => {
    async function Load() {
      fetch(`http://localhost:5000/album/id?id=${router.query.id}`)
        .then((response) => response.json())
        .then((json) => setAlbum(json))
    }
    if (!serverAlbums) {
      Load()
    }
  }, [])

  if (!album) {
    return <div>loading</div>
  }
  if (!localStorage.getItem('access_token')) {
    router.push('/auth/login')
    return <div>error</div>
  }
  return (
    <Layout>
      <Head>
        <title>{album.name}</title>
      </Head>
      <h1>Album {album.name}</h1>
      {album.track.map((track: any) => (
        <AlbumTrack key={track} _id={track}></AlbumTrack>
      ))}
    </Layout>
  )
}

export default Album

// Album.getInitialProps = async (req: any, res: any) => {
//   if (!req) {
//     return { albums: null }
//   }
//   try {
//     const res2 = await fetch(
//       `http://localhost:5000/album/id?id=${req.query.id}`
//     )
//     const albums = await res2.json()
//     return { albums }
//   } catch (e) {
//     return { error: true }
//   }
// }
