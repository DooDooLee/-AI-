import styles from '../../styles/MyBookListComponent.module.css';

function MyBookListComponent({ book, onBookClick }) {
  return (
    <div className={styles.wrapper} onClick={() => onBookClick(book)}>
      <img
        src={book.cover}
        alt="책 표지"
        style={{ width: '90px', height: '120px' }}
      />{' '}
      <span>{book.title}</span>
    </div>
  );
}

export default MyBookListComponent;
