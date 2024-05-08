//import styles from "./styles/BestBook.module.css"
import BestbookComponent from "./BestbookComponent";

function BestbookContainer() {
    return (
        <div>
            <h3>P-Book 베스트</h3>
            {[...Array(10)].map((value, index) => {
                return <BestbookComponent no={index + 1}></BestbookComponent>;
            })}
        </div>
    );
}

export default BestbookContainer;
