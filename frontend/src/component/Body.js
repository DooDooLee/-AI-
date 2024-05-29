import Poster from "./body/Poster";
import BestbookContainer from "./body/BestbookContainer";
import NewbookContainer from "./body/NewbookContainer";
import Instruction from "./body/Instruction";
import StepsDescription from "./body/StepsDescription";
import styles from "../styles/MainPage.module.css";


function Body() {
    return (
        <>
            <Poster />
            <div className={styles.instructionWrapper}>
                <Instruction />
                <StepsDescription />
            </div>
            <BestbookContainer />
            <NewbookContainer />
        </>
    );
}

export default Body;
