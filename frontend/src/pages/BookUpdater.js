import Header from '../component/Header';
import LeftPanel from '../component/LeftPanel';
import UpdaterContaioner from '../component/bookUpdater/UpdaterContainer';
import styles from '../styles/BookMaker.module.css';
import { useLocation } from 'react-router-dom';

function BookUpdater() {
  // URL 쿼리 파라미터에서 bookId 가져오기
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const bookId = queryParams.get('bookId'); // 전달된 bookId

  return (
    <div id="wrapper" className={styles.wrapper}>
      <div>
        <Header />
      </div>
      <div className={styles.innerWrapper}>
        <LeftPanel />
        {/* bookId를 UpdaterContaioner에 props로 전달 */}
        <UpdaterContaioner bookId={bookId} />
      </div>
    </div>
  );
}

export default BookUpdater;
