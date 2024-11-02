import styles from '../styles/BookReviewComponent.module.css';

function BookReviewComponent({ userName, time, text }) {
  const writtenTime =
    time.getFullYear() + '/' + (time.getMonth() + 1) + '/' + time.getDate();
  return (
    <div className={styles.wrapper}>
      <div>
        <strong>{userName}</strong>{' '}
        <span className={styles.time}>{writtenTime}</span>
      </div>
      <div className={styles.text}>{text}</div>
      <button className={styles.deleteBtn}>삭제</button>
    </div>
  );
}

export default BookReviewComponent;
