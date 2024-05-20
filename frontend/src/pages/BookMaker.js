import Header from "../component/Header";
import LeftPanel from "../component/LeftPanel";
import PromptContainer from "../component/PromptComtainer";
import styles from "../styles/BookMaker.module.css";

function BookMaker() {
    return (
        <div id="wrapper" className={styles.wrapper}>
            <div>
                <Header id="Header" className={styles.Header} />
            </div>
            <div>
                <LeftPanel id="LeftPanel" className={styles.LeftPanel} />
            </div>
            <div>
                <PromptContainer
                    id="PromptContainer"
                    className={styles.PromptContainer}
                />
            </div>
        </div>
    );
}

export default BookMaker;
