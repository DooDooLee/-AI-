function NewbookComponent(props) {
    const Bookcover_default_uri = "./public_assets/bookcover_example4.svg";
    const thumbsup_uri = "./public_assets/thumbsup.svg";
    return (
        <div>
            <img src={Bookcover_default_uri} alt="책 표지"></img>
            <span>{props.no.toString()}</span>
            <div>
                <strong>책 제목</strong>
                <br></br>
                저자<br></br>
                <img src={thumbsup_uri} alt="Thumbsup"></img>추천수(총 추천수)
            </div>
        </div>
    );
}

export default NewbookComponent;
