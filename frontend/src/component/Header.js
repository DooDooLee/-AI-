import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import styles from '../styles/Header.module.css';

function Header() {
  const logo_uri = process.env.PUBLIC_URL + '/public_assets/logo.svg';
  const [userName, setUserName] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // 로그인 성공 처리 함수
  const handleLoginSuccess = (token) => {
    // 토큰 쿠키 저장
    Cookies.set('authToken', token, { expires: 7 });

    // 사용자 정보 가져오기
    fetchUserInfo(token);
  };

  // URL에서 토큰 추출
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokens = urlParams.getAll('token'); // 모든 'token' 파라미터를 배열로 가져옴

    if (tokens.length > 0) {
      const token = tokens[0]; // 첫 번째 토큰 사용
      console.log('Extracted token:', token);

      handleLoginSuccess(token);

      // URL에서 토큰 제거
      window.history.replaceState({}, document.title, window.location.pathname);
    } else {
      const storedToken = Cookies.get('authToken');
      const storedUserName = Cookies.get('userName');
      if (!storedUserName && storedToken) {
        fetchUserInfo(storedToken);
      } else {
        setUserName(storedUserName);
      }
    }
  }, []);

  const handleLogin = () => {
    const redirectUri = encodeURIComponent(window.location.href);
    window.location.href = `http://15.164.245.179:8080/oauth2/authorization/kakao?redirect_uri=${redirectUri}`;
  };

  const handleLogout = () => {
    const accessToken = Cookies.get('authToken');

    if (!accessToken) {
      alert('로그인이 되어 있지 않습니다.');
      return;
    }

    const redirectUri = encodeURIComponent(
      `${window.location.origin}?logout=true`
    );
    const clientId = '6bb885296e1ea5722e9042f02f4fbbbe';

    window.location.href = `https://kauth.kakao.com/oauth/logout?client_id=${clientId}&logout_redirect_uri=${redirectUri}`;
  };

  // 로그아웃 처리
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);

    if (urlParams.get('logout') === 'true') {
      // 쿠키 삭제 및 상태 초기화
      Cookies.remove('authToken');
      Cookies.remove('userName');
      setUserName(null);

      // URL에서 로그아웃 파라미터 제거
      window.history.replaceState({}, document.title, window.location.pathname);

      // 페이지 새로고침
      window.location.reload();
    }
  }, [location.search]);

  // 사용자 정보 가져오기
  const fetchUserInfo = (token) => {
    fetch('http://15.164.245.179:8080/user/me', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        Cookies.set('userName', data.userName, { expires: 7 });
        setUserName(data.userName);
      })
      .catch((error) =>
        console.error('사용자 정보를 가져오는 동안 에러 발생:', error)
      );
  };

  const pathname = useLocation().pathname;

  return (
    <div
      className={`${styles.wrapper} ${
        pathname === '/' || pathname === '/ListPage'
          ? styles.headerPadding
          : styles.normalPadding
      }`}
    >
      <div className={styles.left}>
        <Link to="/" id="logo">
          <img src={logo_uri} alt="logo" />
        </Link>
        <div>
          <ul>
            <li
              className={styles.listItem}
              onClick={() => navigate('/BookMaker')}
            >
              책 만들기
            </li>
            <li
              className={styles.listItem}
              onClick={() => navigate('/ListPage')}
            >
              P-Book 도서관
            </li>
            <li
              className={styles.listItem}
              onClick={() => navigate('/myLibrary')}
            >
              나의서재
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.right}>
        <ul>
          {userName ? (
            <>
              <li className={styles.userName}>{userName} 님</li>
              <li className={styles.loginButton} onClick={handleLogout}>
                로그아웃
              </li>
            </>
          ) : (
            <li className={styles.loginButton} onClick={handleLogin}>
              로그인
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Header;
