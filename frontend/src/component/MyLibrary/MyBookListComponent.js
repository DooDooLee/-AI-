import styles from '../../styles/MyBookListComponent.module.css';

function MyBookListComponent() {
  return (
    <div className={styles.wrapper}>
      <img src="./public_assets/gray_bookcover.svg" alt="책 표지" />
      <span>책 제목</span>
    </div>
  );
}

export default MyBookListComponent;
