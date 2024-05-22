import Header from "../component/Header";
import LeftPanel from "../component/LeftPanel";
import PromptContainer from "../component/PromptComtainer";
import styles from "../styles/BookMaker.module.css";
import { useHistory } from 'react-router-dom';


function BookMaker() {
    return (
        <div id="wrapper" className={styles.wrapper}>
            <div>
                <Header />
            </div>
            <div>
                <LeftPanel />
            </div>
            <div>
                <PromptContainer />
            </div>
        </div>
    );
}

export default BookMaker;
