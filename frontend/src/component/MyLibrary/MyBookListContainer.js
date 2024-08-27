import { useRef } from 'react';
import MyBookListComponent from './MyBookListComponent';
import styles from '../../styles/MyBookListContainer.module.css';

function MyBookListContainer() {
  //책 분류 메뉴의 버튼 css를 조작하기 위한 Ref
  const bookTypeMenuRef = useRef(null);
  //현재 보고있는 메뉴정보를 저장하는 Ref
  //전체는 0, 즐겨찾기는 1, 내가 쓴 책은 2(number 타입)
  const currentMenuNum = useRef(0);

  const onBookTypeClick = (e) => {
    //현재 보고있는 메뉴를 또 클릭하면 return
    let selectedMenuNum = parseInt(e.target.value);
    if (selectedMenuNum !== currentMenuNum.current) {
      currentMenuNum.current = selectedMenuNum;
    } else return;
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
        <button
          onClick={onBookTypeClick}
          value="0"
          style={{ backgroundColor: '#f3e7ca' }}
        >
          전체보기
        </button>
        <button onClick={onBookTypeClick} value="1">
          즐겨찾기한 책
        </button>
        <button onClick={onBookTypeClick} value="2">
          내가 쓴 책
        </button>
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
