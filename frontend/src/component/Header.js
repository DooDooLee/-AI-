import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "../styles/Header.module.css";

function Header() {
    const logo_uri = "./public_assets/logo.svg";
    const search_uri = "./public_assets/search.svg";
    const menu_uri = "./public_assets/menu.svg";
    const [userName, setUserName] = useState(null); // 유저 이름 상태 추가

    // 로그인 버튼을 눌렀을 때 처리하는 함수
    const handleLogin = () => {
        // 현재 페이지 URL을 가져옵니다.
        const redirectUri = encodeURIComponent(window.location.href);
        // 백엔드로 리다이렉트하며, 리다이렉트 후 다시 현재 페이지로 돌아올 수 있도록 현재 페이지 URL을 함께 전달합니다.
        window.location.href = `http://localhost:8080/oauth2/authorization/kakao?redirect_uri=${redirectUri}`;
    };

    // 사용자 정보를 가져오는 함수
    const fetchUserInfo = (token) => {
        fetch("http://localhost:8080/user/me", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`, // Bearer 토큰 형식으로 헤더에 토큰 추가
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setUserName(data.name); // 사용자 이름 설정
            })
            .catch((error) =>
                console.error("사용자 정보를 가져오는 동안 에러 발생:", error)
            );
    };

    // 페이지가 로드될 때 세션 스토리지에서 토큰을 확인하고 사용자 정보를 가져옵니다.
    useEffect(() => {
        const token = sessionStorage.getItem("authToken");
        if (token) {
            fetchUserInfo(token);
        }
    }, []);

    return (
        <div className={styles.wrapper}>
            <div className={styles.left}>
                <Link to="/" id="logo">
                    <img src={logo_uri} alt="logo" />
                </Link>
                <div>
                    <ul>
                        <Link to="/BookMaker">
                            <li className={styles.listItem}>책 만들기</li>
                        </Link>
                        <li className={styles.listItem}>P-Book 도서관</li>
                        <li className={styles.listItem}>커뮤니티</li>
                    </ul>
                </div>
            </div>
            <div className={styles.right}>
                <ul>
                    {userName ? (
                        <li className={styles.userName}>{userName} 님</li> // 사용자 이름 표시
                    ) : (
                        <li
                            className={styles.loginButton}
                            onClick={handleLogin}
                        >
                            로그인
                        </li> // 로그인 버튼
                    )}
                    <li>
                        <img
                            width="30px"
                            height="30px"
                            src={search_uri}
                            alt="검색"
                        />
                    </li>
                    <li>
                        <img
                            width="30px"
                            height="30px"
                            src={menu_uri}
                            alt="메뉴"
                        />
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Header;
