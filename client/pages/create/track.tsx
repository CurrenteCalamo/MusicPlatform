import React, { useState } from 'react'
import styles from '../../styles/scss/Create.module.scss'

import FileUpload from '../../components/FileUpload'
import { useInput } from '../../hooks/useInput'
import axios from 'axios'
import { useRouter } from 'next/router'
import Layout from '../../layouts/Layout'
import Head from 'next/head'

const Create = () => {
  const [image, setImage]: any = useState({})
  const [audio, setAudio]: any = useState({})
  const name = useInput('')
  const artist = useInput('')
  const router = useRouter()

  const send = () => {
    const UserId: any = localStorage.getItem('UserId')
    if (image && audio && name.value && artist.value) {
      const formData = new FormData()
      formData.append('name', name.value)
      formData.append('artist', artist.value)
      formData.append('image', image)
      formData.append('audio', audio)
      formData.append('creator', UserId)
      axios
        .post('http://localhost:5000/track/create', formData)
        .then((res) => router.push('/home'))
        .catch((e) => console.log(e))
    } else {
      alert('something wrong')
    }
  }
  if (!localStorage.getItem('access_token')) {
    router.push('/auth/login')
    return <div>error</div>
  }
  return (
    <Layout>
      <Head>
        <title>Create track</title>
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
              placeholder="Artist"
              {...artist}
            />
          </div>
          {image ? (
            <FileUpload setFile={setImage} accept="image/*">
              <div>Загрузить изображение</div>
            </FileUpload>
          ) : (
            <div></div>
          )}
          {audio ? (
            <FileUpload setFile={setAudio} accept="audio/*">
              <div>Загрузить audio</div>
            </FileUpload>
          ) : (
            <div></div>
          )}
          <div className={styles.ButtonWrapper}>
            <button
              className={styles.FloatingButton}
              type="button"
              onClick={send}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Create
