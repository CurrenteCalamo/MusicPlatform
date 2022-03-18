import React, { useEffect } from 'react'
import { useTypeSelector } from '../hooks/useTypeSelector'
import { useActions } from '../hooks/useActions'
import styles from '../styles/scss/components/Player.module.scss'
import Progress from './Progress'

let audio: any

const Player = () => {
  const { pause, volume, active, duration, currentTime } = useTypeSelector(
    (state: any) => state.player
  )
  const { pauseTrack, playTrack, setVolume, setCurrentTime, setDuration } =
    useActions()
  useEffect(() => {
    if (!audio) {
      audio = new Audio()
    } else {
      setAudio()
      play()
    }
  }, [active])

  const setAudio = () => {
    if (active) {
      audio.src = 'http://localhost:5000/' + active.audio
      audio.volume = volume / 100

      audio.onloadedmetadata = () => {
        setDuration(Math.ceil(audio.duration))
      }

      audio.ontimeupdate = () => {
        setCurrentTime(Math.ceil(audio.currentTime))
      }
    }
  }

  const play = () => {
    if (pause) {
      playTrack()
      audio.play()
    } else {
      pauseTrack()
      audio.pause()
    }
  }

  const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    audio.volume = Number(e.target.value) / 100
    setVolume(Number(e.target.value))
  }

  const changeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    audio.currentTime = Number(e.target.value)
    setCurrentTime(Number(e.target.value))
  }

  if (!active) {
    return null
  }

  const image = {
    background: ` center/100% no-repeat url(http://localhost:5000/${active.image})`,
  }

  return (
    <div className={styles.PlayerWrapper}>
      <div className={styles.PlayerFirst}>
        <div className={styles.PlayerImage} style={image}></div>
        <div>
          <div>{active.name}</div>
          <div className={styles.PlayerArtist}>{active.artist}</div>
        </div>
      </div>
      <div className={styles.PlayerSecond}>
        <div onClick={play}>
          {pause ? (
            <div className="playpng"></div>
          ) : (
            <div className="pausepng"></div>
          )}
        </div>
        <div className={styles.Progress}>
          <Progress
            left={currentTime}
            right={duration}
            onChange={changeCurrentTime}
          ></Progress>
        </div>
      </div>
      <div className={styles.PlayerThird}>
        <div className="volumepng"></div>
        <div className={styles.Progress}>
          {' '}
          <Progress left={volume} right={100} onChange={changeVolume} />
        </div>
      </div>
    </div>
  )
}

export default Player
