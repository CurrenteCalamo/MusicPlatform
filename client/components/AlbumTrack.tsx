import React, { useEffect, useState } from 'react'
import { ITrack } from '../types/track'
import TrackItem from './TrackItem'
interface AlbumTrackProps {
  _id: string
  track?: ITrack
}

const AlbumTrack: React.FC<AlbumTrackProps> = ({ _id, track: serverTrack }) => {
  const [track, setTrack] = useState(serverTrack)

  useEffect(() => {
    async function Load() {
      fetch(`http://localhost:5000/track/id?id=${_id}`)
        .then((response) => response.json())
        .then((json) => setTrack(json))
    }

    if (!serverTrack) {
      Load()
    }
  }, [track])

  if (!track) {
    return <div>loading</div>
  }

  return <TrackItem track={track}></TrackItem>
}
export default AlbumTrack
