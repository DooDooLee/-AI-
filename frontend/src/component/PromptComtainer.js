import React, { useState, useEffect } from 'react';
import styles from '../styles/PromptContainer.module.css';

const PromptContainer = () => {
  const [referenceDegree, setReferenceDegree] = useState(0);
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState('');
  const [pages, setPages] = useState([
    { pageNumber: 0, image: '', content: '' },
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [seed, setSeed] = useState('');

  useEffect(() => {
    // PromptContainer가 처음 렌더링될 때 초기 페이지 설정
    setPages([{ pageNumber: 0, image: '', content: '' }]);
    setCurrentIndex(0);
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const token = sessionStorage.getItem('authToken');
      const response = await fetch('http://localhost:8080/image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ prompt: prompt, seed: seed || undefined }),
      });
      const data = await response.json();
      setTimeout(() => {
        setGeneratedImage(data.imageUrl);
        setLoading(false);

        // 시드 값을 입력 폼에 설정
        setSeed(data.seed.toString());

        // 현재 인덱스의 페이지 정보 업데이트
        setPages((prevPages) => {
          const newPages = [...prevPages];
          newPages[currentIndex] = {
            ...newPages[currentIndex],
            image: data.imageUrl,
            seed: data.seed,
          };
          console.log('Updated Pages:', newPages); // 페이지 배열 로그 출력
          return newPages;
        });
      }, 3000);
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };

  const handleShowImage = () => {
    setGeneratedImage(
      (prevUrl) => prevUrl + '?timestamp=' + new Date().getTime()
    );
  };

  const handleNextPage = () => {
    setPages((prevPages) => {
      const newPages = [...prevPages];
      if (currentIndex < prevPages.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        newPages.push({ pageNumber: currentIndex + 1, image: '', content: '' });
        setCurrentIndex(currentIndex + 1);
      }
      console.log('Updated Pages:', newPages); // 페이지 배열 로그 출력
      setGeneratedImage(''); // 다음 페이지로 이동 시 이미지 초기화
      return newPages;
    });
  };

  const handleContentChange = (e) => {
    const newContent = e.target.value;
    setPages((prevPages) => {
      const newPages = [...prevPages];
      newPages[currentIndex] = {
        ...newPages[currentIndex],
        content: newContent,
      };
      return newPages;
    });
  };

  const handleCreateBook = async () => {
    const token = sessionStorage.getItem('authToken');
    try {
      const response = await fetch('http://localhost:8080/book/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: 'Your Book Title',
          cover: 'Cover Image URL',
          pages: pages,
        }),
      });
      if (response.ok) {
        console.log('Book created successfully');
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
              maxWidth: '700px',
              maxHeight: '550px',
              width: 'auto',
              height: 'auto',
              borderRadius: '20px',
            }}
          />
        )}
        <span className={styles.pageNumber}>{currentIndex + 1}</span>
      </div>
      <form id="right" className={styles.right}>
        <div id="upperForm" className={styles.upperForm}>
          <div id="prompt" className={styles.prompt}>
            <input
              type="text"
              name="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="이미지 생성을 위한 프롬프트를 입력해 주세요"
            />
          </div>
          <div id="option" className={styles.option}>
            <span>프롬프트 참조 정도</span>
            {referenceDegree}
            <br />
            <input
              type="range"
              min={0}
              max={20}
              value={referenceDegree}
              onChange={(e) => setReferenceDegree(e.target.value)}
            />
            <br />
            <span>시드 값</span>
            <input
              type="text"
              value={seed}
              onChange={(e) => setSeed(e.target.value)}
              placeholder="시드 값을 입력해 주세요"
            />
            <br />
            <button type="button" onClick={handleSubmit} disabled={loading}>
              이미지 생성
            </button>
            {generatedImage && (
              <button
                type="button"
                onClick={handleShowImage}
                disabled={loading}
              >
                이미지 다시 표시
              </button>
            )}
          </div>
        </div>
        <textarea
          placeholder="글 내용을 입력해주세요"
          value={pages[currentIndex]?.content || ''}
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
            다음 페이지
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
