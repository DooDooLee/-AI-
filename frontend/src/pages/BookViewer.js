import Header from "../component/Header";
import LeftPanel from "../component/LeftPanel";
import ViewerContainer from "../component/ViewerContainer";
import styles from "../styles/BookViewer.module.css";

function BookViewer() {
    return (
        <div id="wrapper" className={styles.wrapper}>
            <div>
                <Header />
            </div>
            <div>
                <LeftPanel />
            </div>
            <div>
                <ViewerContainer />
            </div>
        </div>
    );
}

export default BookViewer;
