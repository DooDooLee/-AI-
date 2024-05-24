import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import styles from '../styles/Header.module.css';

function Header() {
  const logo_uri = './public_assets/logo.svg';
  const search_uri = './public_assets/search.svg';
  const menu_uri = './public_assets/menu.svg';
  const [userName, setUserName] = useState(null);
  const navigate = useNavigate();

  const handleLogin = () => {
    const redirectUri = encodeURIComponent(window.location.href);
    window.location.href = `http://localhost:8080/oauth2/authorization/kakao?redirect_uri=${redirectUri}`;
  };

  const handleLogout = () => {
    Cookies.remove('authToken');
    Cookies.remove('userName');

    setUserName(null);

    navigate('/');
  };

  useEffect(() => {
    // 현재 URL에서 토큰을 가져옴
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    if (token) {
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

  const handleLoginSuccess = (token) => {
    Cookies.set('authToken', token, { expires: 7 }); // 쿠키에 7일간 저장
    fetchUserInfo(token);
  };

  const fetchUserInfo = (token) => {
    fetch('http://localhost:8080/user/me', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        Cookies.set('userName', data.name, { expires: 7 });
        setUserName(data.name);
      })
      .catch((error) =>
        console.error('사용자 정보를 가져오는 동안 에러 발생:', error)
      );
  };

  return (
    <div className={styles.wrapper}>
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
            <li className={styles.listItem}>커뮤니티</li>
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
          <li>
            <img width="30px" height="30px" src={search_uri} alt="검색" />
          </li>
          <li>
            <img width="30px" height="30px" src={menu_uri} alt="메뉴" />
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
