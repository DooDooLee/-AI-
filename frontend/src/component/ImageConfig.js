/*
TODO: 키워드 => 백엔드에서 요구하는 형태로 상위 컴포넌트에서 state나 reducer중
하나를 선택해 배열로 초기화 한 후 이 컴포넌트에서 관리해야 함

PromptContainer에서 props로 시드, 이미지 비율과 관련된 state인
seed, sizeNumber과 그 상태 변화 함수를 가져옴

forwardRef를 활용해 상위 컴포넌트에서 ref로 ImageConfig 노드 조작 가능
=> 이 설정 창을 킬 수 있게 style의 display값을 flex로 바꿈
이 창을 끌때는 display값을 none으로 바꿈
*/
import { forwardRef } from 'react';
import Draggable from 'react-draggable';
import styles from '../styles/ImageConfig.module.css';

const ImageConfig = forwardRef(function ImageConfig(props, ref) {
  const { seed, setSeed, sizeNumber, setSizeNumber } = props;

  const onSeedBtnChange = (e) => {
    setSeed(e.target.value);
  };
  const onFinishBtnClick = () => {
    ref.current.style.display = 'none';
  };

  return (
    <Draggable>
      <div className={styles.container} ref={ref}>
        <h3>이미지 설정</h3>
        <h4>이미지 생성 시드</h4>
        <input
          type="text"
          value={seed}
          onChange={onSeedBtnChange}
          placeholder="입력하지 않으면 랜덤생성"
        />
        <h4>이미지 비율</h4>
        <div className={styles.ratioBox}>
          <span>
            <input
              type="radio"
              name="sizeNumber"
              id="size1"
              checked={sizeNumber === 1}
              value={1}
              onChange={() => setSizeNumber(1)}
            />
            <label htmlFor="size1">1:1</label>
          </span>
          <span>
            <input
              type="radio"
              name="sizeNumber"
              id="size2"
              value={2}
              checked={sizeNumber === 2}
              onChange={() => setSizeNumber(2)}
            />
            <label htmlFor="size2">16:9</label>
          </span>
          <span>
            <input
              type="radio"
              name="sizeNumber"
              id="size3"
              value={3}
              checked={sizeNumber === 3}
              onChange={() => setSizeNumber(3)}
            />
            <label htmlFor="size3">4:3</label>
          </span>
        </div>
        <button type="button" onClick={onFinishBtnClick}>
          완료
        </button>
      </div>
    </Draggable>
  );
});

export default ImageConfig;
