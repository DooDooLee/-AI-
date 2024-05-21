import { useState } from "react";
import styles from "../styles/PromptContainer.module.css";

function PromptContainer() {
    const [makingCover, setMakingCover] = useState(true); //true일 시 표지 제작창
    const [prompt, setPrompt] = useState(""); //프롬프트 내용
    const [referenceDegree, setReferenceDegree] = useState(10); //프롬프트 참조 정도
    const [generatedImage, setGeneratedImage] = useState(""); //생성된 이미지
    const [bookTitle, setBookTitle] = useState(""); //책 제목
    const [keepSeed, setKeepSeed] = useState(true); //시드 유지 여부
    const [passage, setPassage] = useState(""); //책 내용

    const onSubmitClick = (event) => {
        //이미지 생성버튼 콜백함수
        event.preventDefault();
        /*
        이미지 받아오기
        */
        setGeneratedImage("");
    };

    const onNextPageClick = (e) => {
        if (generatedImage === "") {
            //이미지가 생성되지 않았을 경우
            alert("아직 이미지가 생성되지 않았습니다.");
            return;
        }
        if (makingCover === true) {
            if (bookTitle === "") {
                alert("책 제목을 입력해 주세요.");
                return;
            }
            setMakingCover(false);
            setPrompt(""); //표지 생성 후 프롬프트 지우기
        }
        /*
        생성된 이미지 처리
        */
    };
    return (
        <div id="wrapper" className={styles.wrapper}>
            <div id="left" className={styles.left}>
                <img src={generatedImage} alt="생성된 이미지" />
            </div>
            <form id="right" className={styles.right}>
                <div id="upperForm" className={styles.upperForm}>
                    <div id="prompt" className={styles.prompt}>
                        <input
                            type="text"
                            value={prompt}
                            placeholder={`${
                                makingCover ? "표지" : ""
                            } 이미지 생성을 위한 프롬프트를 작성해주세요.`}
                            onChange={(e) => {
                                setPrompt(e.target.value);
                            }}
                        />
                    </div>
                    <div id="option" className={styles.option}>
                        <span>프롬프트 참조 정도</span>
                        {referenceDegree}
                        <br />
                        <input
                            type="range"
                            min={0}
                            max={20}
                            value={referenceDegree}
                            onChange={(e) => {
                                setReferenceDegree(parseInt(e.target.value));
                            }}
                        />
                        <br />
                        <span>
                            시드 유지
                            <input
                                type="checkbox"
                                checked={keepSeed}
                                onChange={(e) => {
                                    setKeepSeed(!keepSeed);
                                }}
                            />
                        </span>
                        <br />
                        <button type="submit" onClick={onSubmitClick}>
                            이미지 생성
                        </button>
                    </div>
                </div>
                {makingCover ? ( //최초 렌더링 시 책 제목 입력창 렌더링.
                    <input
                        type="text"
                        value={bookTitle}
                        onChange={(e) => {
                            setBookTitle(e.target.value);
                        }}
                        className={styles.bookTitle}
                        placeholder="책 제목을 입력해주세요."
                    />
                ) : (
                    <textarea
                        value={passage}
                        onChange={(e) => {
                            setPassage(e.target.value);
                        }}
                        placeholder="글 내용을 입력해주세요..."
                    />
                )}
            </form>
            <div id="buttonArea" className={styles.buttonArea}>
                <div>
                    <button>임시 저장</button>
                </div>
                <div>
                    <button onClick={onNextPageClick}>다음 페이지</button>
                    {
                        makingCover !== true && <button>제작 완성</button> //표지 완성 후에만 렌더링
                    }
                </div>
            </div>
        </div>
    );
}

export default PromptContainer;
