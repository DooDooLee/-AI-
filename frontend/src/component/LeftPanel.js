import styles from '../styles/LeftPanel.module.css';
import { Link, useNavigate } from 'react-router-dom';

function LeftPanel() {
  const navigate = useNavigate();

  const image_url = process.env.PUBLIC_URL + '/public_assets';
  const bookmaker_url = image_url + '/bookmaker.svg';
  const my_library_url = image_url + '/my_library.svg';

  return (
    <div id="wrapper" className={styles.wrapper}>
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
    </div>
  );
}

export default LeftPanel;
