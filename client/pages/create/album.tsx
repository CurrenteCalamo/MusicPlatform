import React, { useEffect, useState } from 'react'
import styles from '../../styles/scss/Create.module.scss'
import FileUpload from '../../components/FileUpload'
import { useInput } from '../../hooks/useInput'
import axios from 'axios'
import { useRouter } from 'next/router'
import AlbumTrack from '../../components/AlbumTrack'
import { ITrack } from '../../types/track'
import Layout from '../../layouts/Layout'
import Head from 'next/head'
interface CreateTrackProps {
  tracks: ITrack[]
}

const Create: React.FC<CreateTrackProps> = ({ tracks: serverTrack }) => {
  const [image, setImage]: any = useState({})
  const [array, setarray]: any = useState([])
  const search = useInput('')
  const [tracks, setTrack] = useState(serverTrack)

  const name = useInput('')
  const artist = useInput('')
  const router = useRouter()

  const send = () => {
    const UserId: any = localStorage.getItem('UserId')
    if (image && name.value && artist.value) {
      const formData = new FormData()
      formData.append('name', name.value)
      formData.append('artist', artist.value)
      formData.append('image', image)
      formData.append('track', array)
      formData.append('creator', UserId)
      axios
        .post('http://localhost:5000/album/create', formData)
        .then((resp) => router.push('/home'))
        .catch((e) => console.log(e))
    } else {
      alert('Something wrong')
    }
  }

  useEffect(() => {
    async function Load() {
      fetch(`http://localhost:5000/track/search?query=${search.value}`)
        .then((response) => response.json())
        .then((json) => setTrack(json))
    }

    Load()
  }, [search.value])

  if (!tracks) {
    return <div>loading</div>
  }
  if (!localStorage.getItem('access_token')) {
    router.push('/auth/login')
    return <div>error</div>
  }
  return (
    <Layout>
      <Head>
        <title>Create album</title>
      </Head>
      <div className={styles.CreateTrackWrapper}>
        <div>
          <div>
            <input
              className={styles.CreateTrackInput}
              placeholder="Track name"
              {...name}
            />
            <input
              className={styles.CreateTrackInput}
              placeholder="artist"
              {...artist}
            />
          </div>

          {image ? (
            <FileUpload setFile={setImage} accept="image/*">
              <div>Загрузить изображение</div>
            </FileUpload>
          ) : (
            <div>Image accept</div>
          )}
          <div className={styles.ButtonWrapper}>
            <button
              className={styles.FloatingButton}
              type="button"
              onClick={send}
            >
              send
            </button>
          </div>
        </div>
        {array.map((track: any) => (
          <AlbumTrack key={track} _id={track}></AlbumTrack>
        ))}
        <div className={styles.SearchWrapper}>
          <div>
            <input
              className={styles.CreateTrackInput}
              maxLength={100}
              placeholder="Search track"
              {...search}
            />
          </div>

          <div>
            <div>
              {tracks.map((track) => (
                <div
                  key={track._id}
                  onClick={() => {
                    setarray([...array, track._id])
                  }}
                  className={styles.TrackItemWrapper}
                >
                  <div className={styles.TrackContener}>
                    <div className={styles.TrackItemImage}></div>
                    <div className={styles.TrackItemTitle}>
                      <div>{track.name}</div>
                      <div>{track.artist}</div>
                    </div>
                  </div>
                  <div className={styles.TrackItemSecond}>
                    <div>{track.listens}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Create
