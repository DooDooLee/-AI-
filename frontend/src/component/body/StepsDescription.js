import React from 'react';
import styles from "../../styles/StepsFrame.module.css";
import bigPictureImage from "../../images/StepsImage.png"; // 제작단계 설명 이미지 불러오기
import { Link } from 'react-router-dom';

function StepsDescription() {
    return (
        <div className={styles.container}>
            <img src={bigPictureImage} alt="Big Picture" />
            <h2 className={styles.customHeading}>나만의 P-Book,<br />손쉽게 만드는 방법</h2>
            <p>정보 입력, 글 작성, 그림 생성, 제작 완성, 공유까지 5가지만 기억하면 10분만에 그림책 제작 완성!</p>
            <Link to="/more-details/steps-description" className={styles.readMore}>더 자세히 알아보기</Link>
        </div>
    );
}

export default StepsDescription;