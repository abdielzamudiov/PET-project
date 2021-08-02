import React from 'react'
import { useHistory } from 'react-router-dom';
import style from './Track.module.css'

interface Props {
  id?: string;
  album?: { name?: string, images?: Array<{url: string}> };
  artists?: Array<{name?: string}>;
  name?: string;
}
export const Track: React.FC<Props> = ({
  id,
  album,
  artists,
  name
}) => {
  const history = useHistory();

  const image = album?.images && album?.images[0].url;

  const handleTrackClick = () => {
    history.push(`/track/${id}`);
  }

  return (
    <div className={style.track} onClick={() => handleTrackClick()}>
      <div className={style.imgContainer}>
        <img src={image} alt={album?.name} className={style.img}/>
      </div>
      <div className={style.trackInfo}>
        {name}
        <br />
        {artists?.map((artist) => artist.name)}
        <br />
        {album?.name}
      </div>
    </div>
  )
}
