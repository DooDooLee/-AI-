const poster_default_uri = "./public_assets/poster_default.svg";

function Poster() {
    return (
        <div>
            <img src={poster_default_uri} alt="default_poster"></img>
        </div>
    );
}

export default Poster;
