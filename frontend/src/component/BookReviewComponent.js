import styles from '../styles/BookReviewComponent.module.css';

function BookReviewComponent({ userName, createdAt, contents }) {
  const KST = new Date(createdAt + '+00:00'); //시간대 문제 해결
  const writtenTime =
    KST.getFullYear() + '/' + (KST.getMonth() + 1) + '/' + KST.getDate();

  return (
    <div className={styles.wrapper}>
      <div>
        <strong>{userName}</strong>{' '}
        <span className={styles.time}>님 {writtenTime}</span>
      </div>
      <div className={styles.text}>{contents}</div>
      <button className={styles.deleteBtn}>삭제</button>
    </div>
  );
}

export default BookReviewComponent;
