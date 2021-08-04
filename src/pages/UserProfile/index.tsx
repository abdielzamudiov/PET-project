import React from 'react';
import { useParams } from 'react-router-dom';
import { ReviewList } from '../../components/ReviewList.tsx';
import style from './UserProfile.module.css';

interface Params {
  user: string;
}

export const UserProfile: React.FC = () => {

  const { user } = useParams<Params>();


  return (
    <div className={style.profileContainer}>
      <h1>{user}</h1>
      <ReviewList userId={user}/>
    </div>
  )
}
