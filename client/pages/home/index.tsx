import { useEffect, useState } from 'react'
import Layout from '../../layouts/Layout'
import TrackList from '../../components/TrackList'
import AlbumList from '../../components/AlbumList'
import styles from '../../styles/scss/Home.module.scss'
import { useRouter } from 'next/router'

const Home = ({ tracks: serverTrack, albums: serverAlbums }: any) => {
  const [tracks, setTrack] = useState(serverTrack)
  const [albums, setAlbum] = useState(serverAlbums)
  const router = useRouter()
  useEffect(() => {
    async function Load() {
      fetch(`http://localhost:5000/track/getAll?offset=2`)
        .then((response) => response.json())
        .then((json) => setTrack(json))

      fetch(`http://localhost:5000/album/getAll`)
        .then((response) => response.json())
        .then((json) => setAlbum(json))
    }
    if (!serverTrack || !serverAlbums) {
      Load()
    }
  }, [])
  if (!tracks || !albums) {
    return <div>loading</div>
  }
  if (!localStorage.getItem('access_token')) {
    router.push('/auth/login')
    return <div>error</div>
  }
  return (
    <Layout>
      <div className={styles.HomeWrapper}>
        <div>
          <h1>Tracks for you</h1>

          <TrackList tracks={tracks}></TrackList>
        </div>
        <div>
          <h1>Albums for you</h1>

          <AlbumList albums={albums}></AlbumList>
        </div>
      </div>
    </Layout>
  )
}

Home.getInitialProps = async (req: any, res: any) => {
  if (!req) {
    return { tracks: null, albums: null }
  }
  try {
    const res = await fetch('http://localhost:5000/track/getAll?offset=2')
    const tracks = await res.json()
    const res2 = await fetch('http://localhost:5000/album/getAll')
    const albums = await res2.json()
    return { tracks, albums }
  } catch (e) {
    console.log(e)
  }
}

export default Home
