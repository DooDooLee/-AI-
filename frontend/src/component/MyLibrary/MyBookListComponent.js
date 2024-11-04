import styles from '../../styles/MyBookListComponent.module.css';

function MyBookListComponent({ title, cover }) {
  return (
    <div className={styles.wrapper}>
      <img
        src={cover}
        alt="책 표지"
        style={{ width: '90px', height: '120px' }}
      />{' '}
      <span>{title}</span>
    </div>
  );
}

export default MyBookListComponent;
