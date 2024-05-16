import styles from "../styles/Footer.module.css";
const logo_grayscale_uri = "./public_assets/logo_grayscale.svg";

function Footer() {
    return (
        <div className={styles.wrapper}>
            <img src={logo_grayscale_uri} alt="grayscale logo" />
            <span>서비스소개</span>
        </div>
    );
}

export default Footer;
