import styles from "../styles/LeftPanel.module.css";

function LeftPanel() {
    const image_url = "./public_assets";
    const temporary_library_url = image_url + "/temporary_library.svg";
    const bookmaker_url = image_url + "/bookmaker.svg";
    const my_library_url = image_url + "/my_library.svg";
    const review_management_url = image_url + "/review_management.svg";
    console.log(temporary_library_url);
    return (
        <div id="wrapper" className={styles.wrapper}>
            <ul>
                <li>
                    <div>
                        <img src={temporary_library_url} alt="임시서재" />
                        <span>임시서재</span>
                    </div>
                </li>
                <li>
                    <div>
                        <img src={bookmaker_url} alt="새P-Book 만들기" />
                        <span>
                            새P-Book
                            <br />
                            만들기
                        </span>
                    </div>
                </li>
                <li>
                    <div>
                        <img src={my_library_url} alt="나의서재" />
                        <span>나의서재</span>
                    </div>
                </li>
                <li>
                    <div>
                        <img src={review_management_url} alt="서평관리" />
                        <span>서평관리</span>
                    </div>
                </li>
            </ul>
        </div>
    );
}

export default LeftPanel;
