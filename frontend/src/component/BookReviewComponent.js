import styles from '../styles/BookReviewComponent.module.css';

function BookReviewComponent({
  userName,
  userEmail,
  createdAt,
  contents,
  authorEmail,
}) {
  const KST = new Date(createdAt + '+00:00'); //UST인 서버시간 KST로
  const writtenTime =
    KST.getFullYear() +
    '/' +
    (KST.getMonth() + 1) +
    '/' +
    KST.getDate() +
    ' ' +
    KST.toTimeString().substring(0, 5);

  return (
    <div className={styles.wrapper}>
      <div>
        <strong>{userName}</strong>{' '}
        <span className={styles.time}>
          {userEmail === authorEmail ? '저자' : '님'} {writtenTime}
        </span>
      </div>
      <div className={styles.text}>{contents}</div>
      <button className={styles.deleteBtn}>삭제</button>
    </div>
  );
}

export default BookReviewComponent;
