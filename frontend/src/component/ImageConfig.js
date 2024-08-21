import styles from '../styles/ImageConfig.module.css';

function ImageConfig() {
  return (
    <div className={styles.container}>
      <h3>이미지 설정</h3>
      <h4>이미지 생성 시드</h4>
      <input type="text"></input>
      <h4>이미지 비율</h4>
      <div className={styles.ratioBox}>
        <span>
          <input
            type="radio"
            name="ratio"
            id="1:1"
            value="1:1"
            defaultChecked
          />
          <label htmlFor="1:1">1:1</label>
        </span>
        <span>
          <input type="radio" name="ratio" id="4:3" value="4:3" />
          <label htmlFor="4:3">4:3</label>
        </span>
        <span>
          <input type="radio" name="ratio" id="16:9" value="16:9" />
          <label htmlFor="16:9">16:9</label>
        </span>
      </div>
      <h4>키워드 선택</h4>
      <div className={styles.keywordBox}>
        <input type="checkbox" name="keyword" id="keyword1" value="keyword1" />
        <label htmlFor="keyword1">keyword1</label>
      </div>
      <button>완료</button>
    </div>
  );
}
export default ImageConfig;
