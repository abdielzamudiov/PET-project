import React from 'react'

interface Props {
  id?: string;
  album?: { name?: string };
  artists?: Array<{name?: string}>;
  name?: string;
}
export const Track: React.FC<Props> = ({
  id,
  album,
  artists,
  name
}) => {
  return (
    <div>
      {id}
      {name}
      {artists?.map((artist) => artist.name)}
      {album?.name}
    </div>
  )
}
