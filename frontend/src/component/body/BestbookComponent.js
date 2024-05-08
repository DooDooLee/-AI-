function BestbookContainer(props) {
    const Bookcover_default_uri = "./public_assets/bookcover_example1.svg";
    const thumbsup_uri = "./public_assets/thumbsup.svg";
    return (
        <div>
            <img src={Bookcover_default_uri} alt="Default Bookcover"></img>
            <br></br>
            <span>{props.no.toString()} 책 제목</span>
            <br></br>
            <span>저자</span>
            <br></br>
            <span>
                <img src={thumbsup_uri} alt="좋아요"></img>총 추천수(오늘
                추천수)
            </span>
        </div>
    );
}

export default BestbookContainer;
