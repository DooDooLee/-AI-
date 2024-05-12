import styles from "../../styles/BestbookComponent.module.css";

function BestbookContainer(props) {
    const Bookcover_default_uri = "./public_assets/bookcover_example1.svg";
    const thumbsup_uri = "./public_assets/thumbsup.svg";
    return (
        <div className={styles.wrapper}>
            <img src={Bookcover_default_uri} alt="Default Bookcover"></img>
            <br />
            <span className={styles.ranking}>{props.no.toString()}</span>{" "}
            <div className={styles.bookinfo}>
                <span>책 제목</span>
                <span className={styles.author}>저자</span>
                <span className={styles.likes}>
                    <img src={thumbsup_uri} alt="좋아요"></img>총 추천수(댓글수)
                </span>
            </div>
        </div>
    );
}

export default BestbookContainer;
