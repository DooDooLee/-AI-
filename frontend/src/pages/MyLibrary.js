import Header from '../component/Header.js';
import LeftPanel from '../component/LeftPanel.js';
import MyBookListContainer from '../component/MyLibrary/MyBookListContainer.js';
import MyBookInfoContainer from '../component/MyLibrary/MyBookInfoContainer.js';
import styles from '../styles/MyLibrary.module.css';

function MyLibrary() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.first}>
        <Header />
      </div>
      <div className={styles.innerWrapper}>
        <LeftPanel />
        <div className={styles.containerWrapper}>
          <MyBookListContainer />
          <MyBookInfoContainer />
        </div>
      </div>
    </div>
  );
}

export default MyLibrary;
