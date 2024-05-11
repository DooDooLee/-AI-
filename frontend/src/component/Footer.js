const logo_grayscale_uri = "./public_assets/logo_grayscale.svg";

function Footer() {
    const footerStyle = {
        width: "100%",
        alignSelf: "flex-start",
        margin: "2em 0",
        borderTop: "1px solid gainsboro",
    };

    return (
        <div style={footerStyle}>
            <img
                src={logo_grayscale_uri}
                alt="grayscale logo"
                style={{ margin: "2em 200px" }}
            />
        </div>
    );
}

export default Footer;
