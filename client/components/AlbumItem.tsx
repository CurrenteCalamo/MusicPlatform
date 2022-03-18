import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import styles from '../styles/scss/components/AlbumItem.module.scss'
import { IAlbum } from '../types/track'

interface AlbumItemProps {
  album: IAlbum
}

const AlbumItem: React.FC<AlbumItemProps> = ({ album }) => {
  const image = {
    background: ` center/100% no-repeat url(http://localhost:5000/${album.image})`,
  }

  const [UserId, setUserId] = useState('')
  useEffect(() => {
    const tmp: any = localStorage.getItem('UserId')
    setUserId(tmp)
  }, [UserId])
  const router = useRouter()

  const Delete = async () => {
    await fetch(`http://localhost:5000/album/delete/?id=${album._id}`).then(
      () => {
        router.push('/home')
      }
    )
  }

  return (
    <div className={styles.AlbumItemWrapper}>
      <div
        onClick={() => {
          router.push('/album/' + album._id)
        }}
        className={styles.AlbumItemImage}
        style={image}
      ></div>
      <div className={styles.AlbumItemTitle}>
        <div>{album.name}</div>

        <div>{album.artist}</div>
        {album.creator == UserId ? (
          <div className="deletepng" onClick={Delete}>
            delete
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  )
}

export default AlbumItem
