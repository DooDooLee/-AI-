import Header from '../component/Header.js';
import LeftPanel from '../component/LeftPanel.js';
import MyBookListContainer from '../component/MyLibrary/MyBookListContainer.js';
import MyBookInfoContainer from '../component/MyLibrary/MyBookInfoContainer.js';
import styles from '../styles/MyLibrary.module.css';
import { useState } from 'react';

//아무 책도 선택되지 않았을 때 사용될 더미 데이터
const dummyBook = {
  bookId: -1,
  bookLike: null,
  cover: '',
  createdAt: '',
  title: '',
  userEmail: '',
  userId: -1,
  userName: '',
};

function MyLibrary() {
  const [currentBookMenu, setCurrentBookMenu] = useState(0);
  //유저가 클릭한 책
  const [selectedBook, setSelectedBook] = useState(dummyBook);

  //MyBookListContainer 에서 클릭한 메뉴 정보를 바꾸는 콜백
  const onMenuChange = (num) => {
    setCurrentBookMenu(num);
  };

  //MyBookListContainer 에서 책을 클릭하면 선택된 책 state를 변경하는 콜백
  const onBookClick = (book) => {
    setSelectedBook(book);
  };

  return (
    <div className={styles.wrapper}>
      <div>
        <Header />
      </div>
      <div className={styles.innerWrapper}>
        <LeftPanel />
        <div className={styles.containerWrapper}>
          <MyBookListContainer
            onBookClick={onBookClick}
            currentBookMenu={currentBookMenu}
            onMenuChange={onMenuChange}
          />
          <MyBookInfoContainer
            selectedBook={selectedBook}
            currentBookMenu={currentBookMenu}
          />
        </div>
      </div>
    </div>
  );
}

export default MyLibrary;
