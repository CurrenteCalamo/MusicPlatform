import React from 'react'
import AlbumItem from './AlbumItem'
import styles from '../styles/scss/components/AlbumList.module.scss'
import { IAlbum } from '../types/track'

interface AlbumListProps {
  albums: IAlbum[]
}

const AlbumList: React.FC<AlbumListProps> = ({ albums }) => {
  return (
    <div className={styles.AlbumListWrapper}>
      {albums.map((album) => (
        <AlbumItem key={album._id} album={album} />
      ))}
    </div>
  )
}

export default AlbumList
