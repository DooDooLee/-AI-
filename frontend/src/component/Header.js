import styles from "../styles/Header.module.css";

function Header() {
    //TODO 검색, 메뉴 주소 추가하기
    const logo_uri = "./public_assets/logo.svg";
    const search_uri = "./public_assets/search.svg";
    const menu_uri = "./public_assets/menu.svg";
    return (
        <div className={styles.container}>
            <div>
                <a href="/" id="logo">
                    <img src={logo_uri} alt="logo" />
                </a>
                <div>
                    <ul>
                        <li>책 만들기</li>
                        <li>P-Book 도서관</li>
                        <li>커뮤니티</li>
                    </ul>
                </div>
            </div>
            <div>
                <ul>
                    <li>로그인</li>
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
