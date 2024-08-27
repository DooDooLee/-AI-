import { useRef } from 'react';
import MyBookListComponent from './MyBookListComponent';
import styles from '../../styles/MyBookListContainer.module.css';

function MyBookListContainer() {
  const bookTypeMenuRef = useRef(null);

  const onBookTypeClick = (e) => {
    //CSS 변환 코드
    const menus = bookTypeMenuRef.current.childNodes;
    for (let i = 0; i < 3; i++) {
      menus[i].style.backgroundColor = 'transparent';
    }
    e.target.style.backgroundColor = '#f3e7ca';
  };

  /*
    Array를 책 배열로 바꾸기
  */
  return (
    <div className={styles.wrapper}>
      <div className={styles.bookTypeMenu} ref={bookTypeMenuRef}>
        <button onClick={onBookTypeClick}>전체보기</button>
        <button onClick={onBookTypeClick}>즐겨찾기한 책</button>
        <button onClick={onBookTypeClick}>내가 쓴 책</button>
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
      <div className={styles.innerWrapper}>
        {[...Array(4)].map(() => {
          return <MyBookListComponent />;
        })}
      </div>
      <div className={styles.prevNextBtn}>
        <button style={{ left: '-250px' }}>◀ 이전</button>
        <button style={{ right: '-250px' }}>다음 ▶</button>
      </div>
    </div>
  );
}

export default MyBookListContainer;
