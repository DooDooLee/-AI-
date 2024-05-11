import styles from "../../styles/BestbookContainer.module.css";
import BestbookComponent from "./BestbookComponent";

function BestbookContainer() {
    return (
        <div className={styles.wrapper}>
            <h3>P-Book 베스트</h3>
            <div className={styles.scrollbar}>
                {[...Array(10)].map((value, index) => {
                    return (
                        <BestbookComponent no={index + 1}></BestbookComponent>
                    );
                })}
            </div>
        </div>
    );
}

export default BestbookContainer;
