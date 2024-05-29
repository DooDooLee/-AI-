import styles from "../../styles/Poster.module.css";
import PosterImage from "../../images/PosterImage.png";

function Poster() {
    return (
        <div className={styles.wrapper}>
            <img src={PosterImage} alt="=poster"></img>
        </div>
    );
}

export default Poster;
