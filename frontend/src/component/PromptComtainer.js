import { useState } from "react";
import styles from "../styles/PromptContainer.module.css";

function PromptContainer() {
    const [referenceDegree, setReferenceDegree] = useState(0);
    const onChange = (event) => {
        setReferenceDegree(event.target.value);
    };

    return (
        <div id="wrapper" className={styles.wrapper}>
            <div id="left" className={styles.left}>
                <img alt="생성된 이미지" />
            </div>
            <div id="right" className={styles.right}>
                <form>
                    <div id="prompt" className={styles.prompt}>
                        <input
                            type="text"
                            name="prompt"
                            placeholder="이미지 생성을 위한 프롬프트를 입력해 주세요"
                        />
                    </div>
                    <div id="option" className={styles.option}>
                        <span>프롬프트 참조 정도</span>
                        <br />
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
                        <button type="submit">이미지 생성</button>
                    </div>
                    <textarea placeholder="글 내용을 입력해주세요" />
                </form>
            </div>
            <button>임시 저장</button>
            <button>다음 페이지</button>
            <button>제작 완성</button>
        </div>
    );
}

export default PromptContainer;
