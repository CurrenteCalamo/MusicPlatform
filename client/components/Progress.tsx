import React from 'react'
import styles from '../styles/scss/components/Progress.module.scss'

interface TrackProgressProps {
  left: number
  right: number
  onChange: (e: any) => void
}

const Progress: React.FC<TrackProgressProps> = ({ left, right, onChange }) => {
  return (
    <div className={styles.ProgressTrack}>
      <div>{left}</div>
      <input
        className={styles.tmp}
        type="range"
        min={0}
        max={right}
        value={left}
        onChange={onChange}
      />
      <div>{right}</div>
    </div>
  )
}

export default Progress
