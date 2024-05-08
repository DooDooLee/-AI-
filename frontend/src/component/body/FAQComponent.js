const FAQ_default_uri = "./publicassets/FAQ_default.svg";

function FAQComponent(props) {
    return (
        <div>
            <img src={FAQ_default_uri} alt="FAQ 이미지"></img>
            <br></br>
            <strong>{props.faqno.toString()}번째 FAQ.</strong>
            <br></br>
            FAQ 내용
        </div>
    );
}

export default FAQComponent;
