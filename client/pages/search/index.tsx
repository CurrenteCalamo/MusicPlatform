import type { NextPage } from 'next'
import Layout from '../../layouts/Layout'
import styles from '../../styles/scss/Search.module.scss'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useInput } from '../../hooks/useInput'
import NextNProgress from 'nextjs-progressbar'
import TrackList from '../../components/TrackList'
import AlbumList from '../../components/AlbumList'
const Search: NextPage = ({
  tracks: serverTrack,
  albums: serverAlbums,
}: any) => {
  const search = useInput('')
  const [tracks, setTrack] = useState(serverTrack)
  const [albums, setAlbum] = useState(serverAlbums)
  useEffect(() => {
    async function Load() {
      fetch(`http://localhost:5000/track/search?query=${search.value}`)
        .then((response) => response.json())
        .then((json) => setTrack(json))
      fetch(`http://localhost:5000/album/search?query=${search.value}`)
        .then((response) => response.json())
        .then((json) => setAlbum(json))
    }

    Load()
  }, [search.value])
  if (!tracks || !albums) {
    return (
      <NextNProgress
        color="white"
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
        showOnShallow={true}
      />
    )
  }
  return (
    <Layout>
      <Head>
        <title>Eternety</title>
      </Head>
      <div className={styles.SearchWrapper}>
        <div>
          <input
            className={styles.SearchInput}
            placeholder="Artists, songs"
            type=""
            maxLength={100}
            {...search}
          />
        </div>
        <div>
          <h1>Track</h1>
          <TrackList tracks={tracks}></TrackList>
        </div>
        <div>
          <h1>Album</h1>
          <AlbumList albums={albums}></AlbumList>
        </div>
      </div>
    </Layout>
  )
}

export default Search
