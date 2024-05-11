import NewbookComponent from "./NewbookComponent";
import styles from "../../styles/NewbookContainer.module.css";

function NewbookContainer() {
    return (
        <div className={styles.wrapper}>
            <h3>이달의 P-Book 신작</h3>
            <div className={styles.gridContainer}>
                {[...Array(9)].map((value, index) => {
                    return <NewbookComponent no={index + 1}></NewbookComponent>;
                })}
            </div>
        </div>
    );
}

export default NewbookContainer;
