import Head from 'next/head'
import Layout from '../../layouts/Layout'
import TrackList from '../../components/TrackList'
import { useCallback, useEffect, useState } from 'react'
import AlbumList from '../../components/AlbumList'
import FileUpload from '../../components/FileUpload'

import styles from '../../styles/scss/User.module.scss'
import { IAlbum, ITrack, IUser } from '../../types/track'
import axios from 'axios'
import { useRouter } from 'next/router'

interface UserProps {
  _id: string
  tracks: ITrack[]
  user: IUser
  albums: IAlbum[]
  getInitialProps?: string
}

const User: React.FC<UserProps> = ({
  user: serverUser,
  tracks: serverTrack,
  albums: serverAlbums,
}) => {
  const [image, setImage]: any = useState()
  const [user, setuser] = useState(serverUser)
  const [tracks, setTrack] = useState(serverTrack)
  const [albums, setAlbum] = useState(serverAlbums)
  const router = useRouter()

  async function Load() {
    try {
      await fetch('http://localhost:5000/profile', {
        method: 'GET',
        mode: 'cors',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      })
        .then((response) => response.json())
        .then((json) => {
          setuser(json)
          localStorage.setItem('UserId', json._id)
        })

      await fetch(
        `http://localhost:5000/track/searchCreator?id=${localStorage.getItem(
          'UserId'
        )}`
      )
        .then((response) => response.json())
        .then((json) => setTrack(json))

      await fetch(
        `http://localhost:5000/album/searchCreator?id=${localStorage.getItem(
          'UserId'
        )}`
      )
        .then((response) => response.json())
        .then((json) => setAlbum(json))
    } catch (e) {
      console.log(e)
    }
  }

  const addimage = async () => {
    if (image) {
      const formData = new FormData()
      formData.append('image', image)
      axios
        .post(`http://localhost:5000/user/addImage?id=${user._id}`, formData)
        .then(() => {
          router.push('/home')
        })
    } else {
      alert('something wrong')
    }
  }
  if (image) {
    addimage()
  }
  const generate = useCallback(Load, [user])

  useEffect(() => {
    if (!user || !albums || !tracks) {
      generate()
    }
  })
  if (!user || !albums || !tracks) {
    return <div>loading</div>
  }
  const Avatar = {
    UserImage: {
      background: ` center/100% no-repeat url(http://localhost:5000/${user.image})`,
      width: '140px',
      height: '140px',
      borderRadius: '100px',
      border: 'solid white 2px',
      boxShadow: '0 0 250px 10px #000000',
    },
  }
  if (!localStorage.getItem('access_token')) {
    router.push('/auth/login')
    return <div>error</div>
  }
  return (
    <Layout>
      <Head>
        <title>User</title>
      </Head>
      <div className={styles.UserWrapper}>
        <div className={styles.UserContener}>
          <FileUpload setFile={setImage} accept="image/*">
            <div className={styles.UserImage} style={Avatar.UserImage}></div>
          </FileUpload>
          <div>{user.username}</div>
        </div>
        <div>
          <div>
            <div>Your tracks</div>
            <TrackList tracks={tracks}></TrackList>
          </div>
          <div>
            <div>Your albums</div>
            <AlbumList albums={albums}></AlbumList>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default User
// User.getInitialProps = async (req: any, res: any) => {
//   if (!req) {
//     return { tracks: null, albums: null, user: null }
//   }
//   try {
//     const res = await fetch(
//       `http://localhost:5000/track/searchCreator?id=${localStorage.getItem(
//         'UserId'
//       )}`
//     )
//     const tracks = await res.json()

//     const res2 = await fetch(
//       `http://localhost:5000/album/searchCreator?id=${localStorage.getItem(
//         'UserId'
//       )}`
//     )
//     const albums = await res2.json()

//     const res3 = await fetch('http://localhost:5000/pofile', {
//       method: 'GET',
//       mode: 'cors',
//       headers,
//     })
//     const user = res3.json()
//     return { tracks, albums, user }
//   } catch (e) {}
// }
