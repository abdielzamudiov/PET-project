import { SyntheticEvent } from 'react';
import { useHistory } from 'react-router-dom';
import style from './Review.module.css';

interface Props {
  id?: string;
  user?: string,
  review?: string,
  track?: string,
  date?: Date,
}


export const Review: React.FC<Props> = ({
  id,
  user,
  review,
  track,
  date
}) => {
  const history = useHistory();

  const handleClickReview = (e: SyntheticEvent) => {
    if (!e.defaultPrevented)
      history.push(`/review/${id}`);
  };

  const handleClickUser = (e: SyntheticEvent) => {
    e.preventDefault();
    history.push(`/user/${user}`);
  }
  return (
    <div className={style.reviewContainer} onClick={(e) => handleClickReview(e)}>
      <div className={style.reviewTextContainer}>
        <p>{review}</p>
      </div>
      <div className={style.infoContainer}>
        <div onClick={(e) => handleClickUser(e)}>{user}</div>
        <div>{new Date(date || '').toLocaleTimeString()}</div>
      </div>
    </div>
  )
}
