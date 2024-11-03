import styles from '../styles/BookReviewContainer.module.css';
import { useEffect, useRef, useState } from 'react';
import Cookies from 'js-cookie';
import BookReviewComponent from './BookReviewComponent';

function BookReviewContainer({ bookId }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [reviews, setReviews] = useState(null);
  const [reviewText, setReviewText] = useState('');
  const wrapperRef = useRef(null);

  const fetchReviews = async () => {
    const response = await fetch(`http://15.164.245.179:8080/book/${bookId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch book data');
    }
    const data = await response.json();
    setReviews(data.reviews);
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const onExpandBtnClick = () => {
    //서평 확장/축소
    if (isExpanded) {
      setIsExpanded(false);
      wrapperRef.current.style.translate = '400px';
    } else {
      setIsExpanded(true);
      wrapperRef.current.style.translate = '0px';
    }
  };

  let tempTime = new Date(); //temp data

  const onReviewTextChange = (e) => {
    setReviewText(e.target.value);
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setReviewText(reviewText.trim());
    if (reviewText.length == 0) {
      alert('서평을 입력해 주세요');
      return;
    }
    if (reviewText.length > 800) {
      alert('서평은 800자까지 입력가능합니다.');
      return;
    }

    try {
      const token = Cookies.get('authToken');
      const response = await fetch(
        `http://15.164.245.179:8080/book/${bookId}/review`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            contents: reviewText,
          }),
        }
      );

      if (!response.ok) {
        console.error('ERROR!: response not ok');
        alert('서평을 다시 등록해 주세요.');
      }

      //서평작성란 지우고 1초 뒤 갱신
      setReviewText('');
      setTimeout(fetchReviews, 3000);
    } catch (error) {
      console.error('ERROR!: ' + error);
      alert('서평을 다시 등록해 주세요.');
    }
  };

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <div className={styles.reviewWrapper}>
        {reviews.map((item, idx) => (
          <BookReviewComponent
            key={idx}
            {...{ userName: '임시유저명', time: tempTime, text: item.contents }}
          />
        ))}
      </div>
      <hr />
      <form className={styles.reviewWritingArea} onSubmit={handleReviewSubmit}>
        <textarea
          placeholder="악의적 서평은 삭제될 수 있습니다."
          maxLength="800"
          onChange={onReviewTextChange}
          value={reviewText}
        />
        <button>등록</button>
      </form>
      <button className={styles.expandButton} onClick={onExpandBtnClick}>
        {isExpanded ? '>닫기' : '<서평'}
      </button>
    </div>
  );
}

export default BookReviewContainer;
