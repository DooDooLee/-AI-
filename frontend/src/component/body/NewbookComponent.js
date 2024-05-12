import styles from "../../styles/NewbookComponent.module.css";

function NewbookComponent(props) {
    const Bookcover_default_uri = "./public_assets/bookcover_example4.svg";
    const thumbsup_uri = "./public_assets/thumbsup.svg";
    return (
        <div className={styles.wrapper}>
            <img src={Bookcover_default_uri} alt="책 표지"></img>
            <span>{props.no.toString()}</span>
            <div className={styles.bookinfo}>
                <span className={styles.bookname}>책 제목</span>
                <span className={styles.author}>저자</span>
                <span className={styles.likes}>
                    <img src={thumbsup_uri} alt="Thumbsup"></img>추천수(댓글수)
                </span>
            </div>
        </div>
    );
}

export default NewbookComponent;
