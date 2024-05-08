import Header from "./component/Header.js";
import Body from "./component/Body.js";
import Footer from "./component/Footer.js";
import styles from "./styles/App.module.css";

function App() {
    return (
        <div id="wrapper" className={styles.wrapper}>
            <Header />
            <Body />
            <Footer />
        </div>
    );
}

export default App;
