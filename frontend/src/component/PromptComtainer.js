import React, { useState, useEffect } from 'react';
import styles from '../styles/PromptContainer.module.css';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const PromptContainer = () => {
  const [referenceDegree, setReferenceDegree] = useState(1);
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState('');
  const [pages, setPages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1); // -1로 초기화하여 첫 번째 입력을 제목으로 만듦
  const [seed, setSeed] = useState('');
  const [title, setTitle] = useState(''); // 책 제목 상태 추가
  const [coverImage, setCoverImage] = useState(''); // 책 표지 이미지 상태 추가
  const navigate = useNavigate();
  const [sizeNumber, setSizeNumber] = useState(1);

  /* useEffect(() => {
    setCurrentIndex(-1);
    const token = Cookies.get('authToken'); // 쿠키에서 토큰 불러오기
    if (!token) {
      alert('로그인이 필요한 서비스입니다.');
      navigate('/');
    }
  }, [navigate]); */

  useEffect(() => {
    setCurrentIndex(-1); // 처음에는 제목 입력을 받기 위해 -1로 설정
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const token = Cookies.get('authToken');
      const response = await fetch('http://localhost:8080/image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          prompt: prompt,
          seed: seed || undefined,
          sizeNumber: sizeNumber,
        }),
      });
      const data = await response.json();

      // 시드 값을 확인하여 문자열로 변환 가능 여부를 체크합니다.
      const seedString = data.seed ? data.seed.toString() : '';

      setTimeout(() => {
        setGeneratedImage(data.imageUrl);
        setLoading(false);

        // 시드 값을 입력 폼에 설정
        setSeed(seedString);

        if (currentIndex === -1) {
          // 첫 번째 입력이면 표지 이미지 설정
          setCoverImage(data.imageUrl);
        } else {
          // 현재 인덱스의 페이지 정보 업데이트
          setPages((prevPages) => {
            const newPages = [...prevPages];
            newPages[currentIndex] = {
              ...newPages[currentIndex],
              image: data.imageUrl,
              seed: seedString,
            };
            console.log('Updated Pages:', newPages); // 페이지 배열 로그 출력
            return newPages;
          });
        }
      }, 3000);
    } catch (error) {
      console.error('Error:', error);
      alert('이미지를 다시 생성해주세요.');
      setLoading(false);
    }
  };

  const handleDeleteImage = () => {
    if (currentIndex === -1) {
      setCoverImage(''); // 표지 이미지 삭제
    } else {
      setPages((prevPages) => {
        const newPages = [...prevPages];
        if (newPages[currentIndex]) {
          newPages[currentIndex].image = ''; // 현재 페이지의 이미지 삭제
        }
        return newPages;
      });
    }
    setGeneratedImage(''); // 표시된 이미지도 삭제
  };

  const handleShowImage = () => {
    setGeneratedImage(
      (prevUrl) => prevUrl + '?timestamp=' + new Date().getTime()
    );
  };

  const handleNextPage = () => {
    if (currentIndex === -1) {
      if (!title || !generatedImage) {
        // 표지 제작 시 제목과 이미지가 모두 필수
        alert('표지를 생성하기 위해서는 제목과 이미지가 모두 필요합니다.');
        return;
      }
      setCurrentIndex(0);

      setGeneratedImage('');
      setCurrentIndex(0);
    } else {
      const currentPage = pages[currentIndex] || {};
      if (!currentPage.content && !currentPage.image) {
        alert('글 내용이나 이미지를 입력해주세요.');
        return; // 다음 페이지로 이동하지 않고 함수 종료
      }

      // 현재 페이지가 마지막 페이지인지 확인하고, 마지막 페이지가 아니라면 다음 페이지로 이동
      setPages((prevPages) => {
        const newPages = [...prevPages];
        if (currentIndex < prevPages.length - 1) {
          setCurrentIndex(currentIndex + 1);
        } else {
          newPages.push({
            pageNumber: currentIndex + 1,
            image: '',
            content: '',
          });
          setCurrentIndex(currentIndex + 1);
        }
        console.log('Updated Pages:', newPages); // 페이지 배열 로그 출력
        setGeneratedImage(''); // 다음 페이지로 이동 시 이미지 초기화
        return newPages;
      });
    }
  };
  const handleContentChange = (e) => {
    const newContent = e.target.value;
    if (currentIndex === -1) {
      setTitle(newContent); // 제목으로 사용
    } else {
      setPages((prevPages) => {
        const newPages = [...prevPages];
        newPages[currentIndex] = {
          ...newPages[currentIndex],
          content: newContent,
        };
        return newPages;
      });
    }
  };

  const handleCreateBook = async () => {
    const token = Cookies.get('authToken');

    // 유효한 페이지만 필터링
    const validPages = pages.filter((page) => page.image || page.content);

    // 유효한 페이지가 하나도 없는 경우 알림
    if (validPages.length === 0) {
      alert('최소 한 페이지는 입력을 마쳐야 합니다.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/book/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: title || 'Your Book Title', // 책 제목 추가
          cover: coverImage || 'Cover Image URL', // 표지 이미지 추가
          pages: validPages.map((page, index) => ({
            ...page,
            pageNumber: index + 1,
          })), // 페이지 번호 추가,
        }),
      });
      if (response.ok) {
        alert('제작이 완료되었습니다.');
        navigate('/');
      } else {
        console.error('Error creating book');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div id="wrapper" className={styles.wrapper}>
      <div id="left" className={styles.left}>
        {loading && <p style={{ marginTop: '10px' }}>로딩 중...</p>}
        {!loading && generatedImage && (
          <img
            src={generatedImage}
            alt="생성된 이미지"
            style={{
              maxWidth: '550px',
              maxHeight: '550px',
              width: 'auto',
              height: 'auto',
              borderRadius: '20px',
            }}
          />
        )}
        <span
          style={{
            position: 'absolute',
            bottom: '20px',
            right: '1340px',
            color: 'black',
            padding: '5px 10px',
            borderRadius: '5px',
            fontSize: '35px',
            zIndex: 1,
          }}
        >
          {currentIndex + 2} {/* 페이지 번호를 1에서 시작하도록 조정 */}
        </span>
      </div>
      <form id="right" className={styles.right}>
        <div id="upperForm" className={styles.upperForm}>
          <div id="prompt" className={styles.prompt}>
            <input
              type="text"
              name="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={
                currentIndex === -1
                  ? '표지 생성을 위한 프롬프트를 입력해 주세요'
                  : '이미지 생성을 위한 프롬프트를 입력해 주세요'
              }
            />
          </div>
          <div
            id="option"
            className={styles.option}
            style={{ padding: '0px', lineHeight: '1.0' }}
          >
            <span style={{ fontSize: '15px' }}>프롬프트 참조 정도</span>
            {referenceDegree}
            <input
              type="range"
              min={1}
              max={20}
              value={referenceDegree}
              onChange={(e) => setReferenceDegree(e.target.value)}
              style={{ height: '20px', marginTop: '5px', marginBottom: '5px' }}
            />
            <br />
            <span>시드 값</span>

            <input
              type="text"
              value={seed}
              onChange={(e) => setSeed(e.target.value)}
              placeholder="입력하지 않으면 랜덤생성"
              style={{ height: '20px', marginTop: '5px', marginBottom: '5px' }}
            />

            <div style={{ marginTop: '5px', marginBottom: '5px' }}>
              <input
                type="radio"
                id="size1"
                name="sizeNumber"
                value={1}
                checked={sizeNumber === 1}
                onChange={() => setSizeNumber(1)}
              />
              <label htmlFor="size1">1:1</label>
              <input
                type="radio"
                id="size2"
                name="sizeNumber"
                value={2}
                checked={sizeNumber === 2}
                onChange={() => setSizeNumber(2)}
              />
              <label htmlFor="size2">16:9</label>
              <input
                type="radio"
                id="size3"
                name="sizeNumber"
                value={3}
                checked={sizeNumber === 3}
                onChange={() => setSizeNumber(3)}
              />
              <label htmlFor="size3">4:3</label>
            </div>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              style={{ marginTop: '5px', marginBottom: '5px' }}
            >
              이미지 생성
            </button>
            {generatedImage && (
              <button
                type="button"
                onClick={handleShowImage}
                disabled={loading}
                style={{ marginTop: '5px', marginBottom: '5px' }}
              >
                이미지 다시 표시
              </button>
            )}
            {generatedImage && (
              <button
                type="button"
                onClick={handleDeleteImage}
                disabled={loading}
                style={{ marginTop: '5px', marginBottom: '5px' }}
              >
                이미지 삭제
              </button>
            )}
          </div>
        </div>
        <textarea
          placeholder={
            currentIndex === -1
              ? '책 제목을 입력해 주세요'
              : '글 내용을 입력해 주세요'
          }
          value={
            currentIndex === -1 ? title : pages[currentIndex]?.content || ''
          }
          onChange={handleContentChange}
        />
      </form>
      <div id="buttonArea" className={styles.buttonArea}>
        <div>
          <button id="tempSaveBtn" className={styles.tempSaveBtn}>
            임시 저장
          </button>
        </div>
        <div>
          <button
            id="nextPageBtn"
            className={styles.rightBtn}
            onClick={handleNextPage}
          >
            {currentIndex === -1 ? '표지 완성' : '다음 페이지'}
          </button>
          <button
            id="completeBtn"
            className={styles.rightBtn}
            onClick={handleCreateBook}
          >
            제작 완성
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromptContainer;
