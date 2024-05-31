import MyBookListComponent from './MyBookListComponent';
import styles from '../../styles/MyBookListContainer.module.css';
function MyBookListContainer() {
  /*
    Array를 책 배열로 바꾸기
  */
  return (
    <div className={styles.wrapper}>
      <div className={styles.innerWrapper}>
        {[...Array(4)].map(() => {
          return <MyBookListComponent />;
        })}
      </div>
      <div className={styles.innerWrapper}>
        {[...Array(4)].map(() => {
          return <MyBookListComponent />;
        })}
      </div>
      <div className={styles.innerWrapper}>
        {[...Array(4)].map(() => {
          return <MyBookListComponent />;
        })}
      </div>
      <div className={styles.innerWrapper}>
        {[...Array(4)].map(() => {
          return <MyBookListComponent />;
        })}
      </div>
      <div>
        <button style={{ left: '-250px' }}>◀ 이전</button>
        <button style={{ right: '-250px' }}>다음 ▶</button>
      </div>
    </div>
  );
}

export default MyBookListContainer;
