import BookPageComponent from "./bookviewer/BookPageComponent";

function BookViewer() {
    const prevPage = () => {};
    const nextPage = () => {};
    return (
        <div>
            <BookPageComponent />
            <BookPageComponent />
            <button onClick={prevPage}>이전 페이지</button>
            <button onClick={nextPage}>다음 페이지</button>
        </div>
    );
}

export default BookViewer;
