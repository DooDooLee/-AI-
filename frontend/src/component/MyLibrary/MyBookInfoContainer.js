import styles from '../../styles/MyBookInfoContainer.module.css';

function MyBookInfoContainer() {
  return (
    <div className={styles.wrapper}>
      <h2>책 제목</h2>
      <div className={styles.innerWrapper}>
        <span>책 정보</span>
        <div>책 정보 예시</div>
      </div>
      <button>책 읽기</button>
    </div>
  );
}
export default MyBookInfoContainer;
