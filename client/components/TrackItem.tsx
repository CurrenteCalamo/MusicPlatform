import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useActions } from '../hooks/useActions'
import styles from '../styles/scss/components/TrackItem.module.scss'
import { ITrack } from '../types/track'

interface TrackItemProps {
  track: ITrack
}
const TrackItem: React.FC<TrackItemProps> = ({ track }) => {
  const router = useRouter()
  const [UserId, setUserId] = useState('')
  const { playTrack, setActiveTrack } = useActions()
  useEffect(() => {
    const tmp: any = localStorage.getItem('UserId')
    setUserId(tmp)
  }, [UserId])

  const play = (e: any) => {
    e.stopPropagation()
    setActiveTrack(track)

    playTrack()
  }

  const Delete = async () => {
    await fetch(`http://localhost:5000/track/delete/?id=${track._id}`).then(
      () => {
        router.push('/home')
      }
    )
  }

  const image = {
    background: ` center/100% no-repeat url(http://localhost:5000/${track.image})`,
  }
  return (
    <>
      <div className={styles.TrackItemWrapper}>
        <div onClick={play} className={styles.TrackContener}>
          <div className={styles.TrackItemImage} style={image}></div>
          <div className={styles.TrackItemTitle}>
            <div>{track.name}</div>
            <div>{track.artist}</div>
          </div>
        </div>
        <div className={styles.TrackItemSecond}>
          {track.creator == UserId ? (
            <div onClick={Delete} className="deletepng"></div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </>
  )
}

export default TrackItem
