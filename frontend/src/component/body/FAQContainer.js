import FAQComponent from "./FAQComponent.js";

function FAQContainer() {
    return (
        <div>
            <FAQComponent faqno={1}></FAQComponent>
            <FAQComponent faqno={2}></FAQComponent>
        </div>
    );
}

export default FAQContainer;
