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
  return (
    <div className={style.reviewContainer}>
      <div className={style.reviewTextContainer}>
        <p>{review}</p>
      </div>
      <div className={style.infoContainer}>
        <div>{user}</div>
        <div>{date}</div>
      </div>
    </div>
  )
}
