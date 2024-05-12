import styles from "../../styles/Poster.module.css";

function Poster() {
    const poster_default_uri = "./public_assets/poster_default.svg";
    return (
        <div className={styles.wrapper}>
            <img src={poster_default_uri} alt="default_poster"></img>
        </div>
    );
}

export default Poster;
