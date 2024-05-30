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
      <div className={styles.second}>
        <LeftPanel />
      </div>
      <div className={styles.third}>
        <MyBookListContainer />
        <MyBookInfoContainer />
      </div>
    </div>
  );
}

export default MyLibrary;
