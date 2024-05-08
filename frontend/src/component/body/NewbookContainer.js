import NewbookComponent from "./NewbookComponent";

function NewbookContainer() {
    return (
        <div>
            <h3>이달의 P-Book 신작</h3>
            <div>
                {[...Array(9)].map((value, index) => {
                    return <NewbookComponent no={index + 1}></NewbookComponent>;
                })}
            </div>
        </div>
    );
}

export default NewbookContainer;
