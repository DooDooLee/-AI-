import { useState } from "react";
import styles from "../styles/PromptContainer.module.css";

function PromptContainer() {
    const [referenceDegree, setReferenceDegree] = useState(0);
    const onChange = (event) => {
        setReferenceDegree(event.target.value);
    };
    const [generatedImage, setGeneratedImage] = useState("");
    const onClick = (event) => {
        event.preventDefault();
        /*
        이미지 받아오기
        */
        setGeneratedImage();
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
                            name="prompt"
                            placeholder="이미지 생성을 위한 프롬프트를 입력해 주세요"
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
                            onChange={onChange}
                        />
                        <br />
                        <span>시드 유지</span>
                        <input type="checkbox" />
                        <br />
                        <button type="submit" onClick={onClick}>
                            이미지 생성
                        </button>
                    </div>
                </div>
                <textarea placeholder="글 내용을 입력해주세요" />
            </form>
            <div id="buttonArea" className={styles.buttonArea}>
                <div>
                    <button id="tempSaveBtn" className={styles.tempSaveBtn}>
                        임시 저장
                    </button>
                </div>
                <div>
                    <button id="righteBtn" className={styles.rightBtn}>
                        다음 페이지
                    </button>
                    <button id="righteBtn" className={styles.rightBtn}>
                        제작 완성
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PromptContainer;
