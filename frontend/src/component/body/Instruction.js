import React from 'react';
import styles from "../../styles/InstructionFrame.module.css";
import bigPictureImage from "../../images/InstructionImage.png"; // 빅픽쳐 소개 이미지 불러오기
import { Link } from 'react-router-dom';

function Instruction() {
    return (
        <div className={styles.container}>
            <img src={bigPictureImage} alt="Big Picture" />
            <h2 className={styles.customHeading}>"그림책 만들기 플랫폼" <br />BIG PICTURE 알아보기</h2>
            <p>스테이블 디퓨전을 활용한 이미지 생성 AI로 보다 간단하게 나만의 그림책을 만들 수 있습니다.</p>
            <Link to="/more-details/instruction" className={styles.readMore}>더 자세히 알아보기</Link>
        </div>
    );
}

export default Instruction;