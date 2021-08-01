import React from 'react'
import { useEffect } from 'react'
import { useSearch } from '../../contexts/SearchContext'

interface Props {

}
export const TrackList: React.FC<Props> = () => {
  const { search } = useSearch();
  // useEffect(() => {
  //   const fetchTracks = async () => {
  //     await 
  //   }
  // },[search])
  return (
    <div>
      
    </div>
  )
}
