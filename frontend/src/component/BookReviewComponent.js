import { useNavigate } from 'react-router-dom';
import styles from '../styles/BookReviewComponent.module.css';
import Cookies from 'js-cookie';

function BookReviewComponent({
  reviewId,
  userName,
  userEmail,
  createdAt,
  contents,
  authorEmail,
}) {
  const navigate = useNavigate();
  //리뷰 삭제 함수
  const handleReviewDelete = async () => {
    const token = Cookies.get('authToken');
    if (!token) {
      alert('서평을 삭제하려면 로그인하세요.');
      return;
    }
    try {
      const response = await fetch(
        `http://15.164.245.179:8080/review/${reviewId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (await response.ok) {
        alert('서평 삭제에 성공했습니다.');
        navigate(0);
      }
    } catch (error) {
      alert('서평 삭제에 실패했습니다.');
      console.error('Error deleting review: ', error);
    }
  };

  //UTC -> KST 변환해 출력
  const KST = new Date(createdAt + '+00:00');
  const writtenTime =
    KST.getFullYear() +
    '/' +
    (KST.getMonth() + 1) +
    '/' +
    KST.getDate() +
    ' ' +
    KST.toTimeString().substring(0, 5);

  return (
    <div className={styles.wrapper}>
      <div>
        <strong>{userName}</strong>{' '}
        <span className={styles.time}>
          {userEmail === authorEmail ? '저자' : '님'} {writtenTime}
        </span>
      </div>
      <div className={styles.text}>{contents}</div>
      <button
        className={styles.deleteBtn}
        onClick={() => {
          handleReviewDelete();
        }}
      >
        삭제
      </button>
    </div>
  );
}

export default BookReviewComponent;
