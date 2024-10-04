import styles from '../styles/LeftPanel.module.css';
import { Link, useNavigate } from 'react-router-dom';

function LeftPanel() {
  const navigate = useNavigate();

  const image_url = process.env.PUBLIC_URL + '/public_assets';
  const temporary_library_url = image_url + '/temporary_library.svg';
  const bookmaker_url = image_url + '/bookmaker.svg';
  const my_library_url = image_url + '/my_library.svg';
  const review_management_url = image_url + '/review_management.svg';

  return (
    <div id="wrapper" className={styles.wrapper}>
      <Link
        onClick={() => {
          alert('준비중입니다.');
        }}
      >
        <img src={temporary_library_url} alt="임시서재" />
        <span>임시서재</span>
      </Link>
      <Link to="/BookMaker">
        <img
          src={bookmaker_url}
          alt="새P-Book 만들기"
          onClick={() => navigate('/BookMaker')}
        />
        <span>
          새P-Book
          <br />
          만들기
        </span>
      </Link>
      <Link to="/myLibrary">
        <img src={my_library_url} alt="나의서재" />
        <span>나의서재</span>
      </Link>
      <Link>
        <img src={review_management_url} alt="서평관리" />
        <span>서평관리</span>
      </Link>
    </div>
  );
}

export default LeftPanel;
