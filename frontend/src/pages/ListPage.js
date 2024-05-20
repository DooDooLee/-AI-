import Header from "../component/Header.js";
import ListBody from "../component/ListBody.js";
import styles from "../styles/ListPage.module.css";

function ListPage() {
    return (
        <div id="wrapper" className={styles.wrapper}>
            <Header />
            <ListBody />
        </div>
    );
}

export default ListPage;