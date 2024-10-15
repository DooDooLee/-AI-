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
      <div>text</div>
      <div>
        <button>삭제</button>
      </div>
    </div>
  );
}

export default BookReviewComponent;
