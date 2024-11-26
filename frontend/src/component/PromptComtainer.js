import React, { useState, useEffect, useRef } from 'react';
import styles from '../styles/PromptContainer.module.css';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import ImageConfig from './ImageConfig';

const PromptContainer = () => {
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
  const [autoPrompt, setAutoprompt] = useState(false);

  useEffect(() => {
    setCurrentIndex(-1);
    const token = Cookies.get('authToken'); // 쿠키에서 토큰 불러오기
    if (!token) {
      alert('로그인이 필요한 서비스입니다.');
      navigate('/');
    }
  }, [navigate]);

  useEffect(() => {
    setCurrentIndex(-1); // 처음에는 제목 입력을 받기 위해 -1로 설정
  }, []);

  //이미지 생성 버튼 클릭 시 콜백 함수
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const token = Cookies.get('authToken');
      const apiUrl = autoPrompt
        ? 'http://15.164.245.179:8080/image/auto'
        : 'http://15.164.245.179:8080/image';

      const currentPage = pages[currentIndex] || {};
      const promptValue = autoPrompt
        ? currentIndex === -1
          ? title
          : pages[currentIndex]?.content || ''
        : prompt;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          prompt: promptValue,
          seed: seed || undefined,
          sizeNumber: sizeNumber,
        }),
      });

      if (!response.ok) {
        throw new Error('Error generating image. Please try again.');
      }

      const data = await response.json();
      const seedString = data.seed ? data.seed.toString() : '';

      setTimeout(() => {
        setGeneratedImage(data.imageUrl);
        setLoading(false);
        setSeed(seedString);

        if (currentIndex === -1) {
          setCoverImage(data.imageUrl);
        } else {
          setPages((prevPages) => {
            const newPages = [...prevPages];
            newPages[currentIndex] = {
              ...newPages[currentIndex],
              image: data.imageUrl,
              seed: seedString,
            };
            return newPages;
          });
        }
      }, 3000);
    } catch (error) {
      console.error('Error:', error);
      alert('이미지를 다시 생성해주세요.'); // Alert on error without retry
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

      setGeneratedImage(''); // 현재 표시된 이미지 초기화
      setCurrentIndex(0); // 첫 번째 페이지로 이동
      setPrompt('');

      // 첫 번째 페이지 이미지를 설정
      setGeneratedImage(pages[0]?.image || ''); // 첫 번째 페이지 이미지 불러오기
    } else {
      const currentPage = pages[currentIndex] || {};
      if (!currentPage.content && !currentPage.image) {
        alert('글 내용이나 이미지를 입력해주세요.');
        return;
      }

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

        // 다음 페이지 이미지를 설정
        setGeneratedImage(newPages[currentIndex + 1]?.image || ''); // 다음 페이지 이미지 불러오기

        return newPages;
      });
    }
  };

  const handlePreviousPage = () => {
    if (currentIndex > 0) {
      setPages((prevPages) => {
        const newPages = [...prevPages];
        setCurrentIndex(currentIndex - 1);
        setGeneratedImage(newPages[currentIndex - 1]?.image || ''); // 이전 페이지 이미지 불러오기

        return newPages;
      });
    } else if (currentIndex === 0) {
      // 제목(표지)로 돌아갈 때
      setCurrentIndex(-1);
      setGeneratedImage(coverImage);
      setPrompt('');
    } else {
      alert('첫 번째 페이지입니다.');
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
      const response = await fetch('http://15.164.245.179:8080/book/create', {
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

  const promptRef = useRef(null);
  const onTextareaFocus = () => {
    promptRef.current.parentNode.style.border = '3px solid black';
  };
  const onTextareaBlur = () => {
    promptRef.current.parentNode.style.border = 'none';
  };

  const configRef = useRef(null);
  const onConfigBtnClick = () => {
    configRef.current.style.display = 'flex';
  };
  return (
    <div id="wrapper" className={styles.wrapper}>
      <div id="left" className={styles.left}>
        {loading ? (
          <div className={styles.loadingSpinner}></div>
        ) : (
          generatedImage && (
            <img
              src={generatedImage}
              alt="생성된 이미지"
              className={styles.generatedImage}
            />
          )
        )}
        <span className={styles.pageNumber}>
          {currentIndex + 2} {/* 페이지 번호를 1에서 시작하도록 조정 */}
        </span>
      </div>

      <form id="right" className={styles.right}>
        <div id="upperForm" className={styles.upperForm}>
          <div
            id="prompt"
            className={styles.prompt}
            onClick={() => {
              promptRef.current.focus();
            }}
          >
            <textarea
              type="text"
              name="prompt"
              rows={1}
              value={prompt}
              onChange={(e) => {
                setPrompt(e.target.value);
                promptRef.current.style.height = 'auto';
                promptRef.current.style.height =
                  promptRef.current.scrollHeight + 'px';
              }}
              onFocus={onTextareaFocus}
              onBlur={onTextareaBlur}
              placeholder={
                currentIndex === -1
                  ? '표지 생성을 위한 프롬프트를 입력해 주세요'
                  : '이미지 생성을 위한 프롬프트를 입력해 주세요'
              }
              ref={promptRef}
            />
          </div>
          <div
            id="option"
            className={styles.option}
            style={{ padding: '0px', lineHeight: '1.5' }}
          >
            <ImageConfig
              seed={seed}
              setSeed={setSeed}
              sizeNumber={sizeNumber}
              setSizeNumber={setSizeNumber}
              ref={configRef}
            />
            <button type="button" onClick={onConfigBtnClick}>
              이미지 설정
            </button>
            <button type="button" onClick={handleSubmit} disabled={loading}>
              이미지 생성
            </button>
            {generatedImage && (
              <button
                type="button"
                onClick={handleShowImage}
                disabled={loading}
                style={{ fontSize: '18px' }}
              >
                이미지 다시 표시
              </button>
            )}
            {generatedImage && (
              <button
                type="button"
                onClick={handleDeleteImage}
                disabled={loading}
              >
                이미지 삭제
              </button>
            )}
          </div>
        </div>
        <textarea
          className={styles.bookText}
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
        <span className={styles.autoPromptCheckbox}>
          <input
            type="checkbox"
            id="autoPromptCheckbox"
            checked={autoPrompt}
            onChange={() => {
              setAutoprompt(!autoPrompt);
            }}
          />
          <label htmlFor="autoPromptCheckbox">프롬프트 자동 생성</label>
        </span>
      </form>
      <div id="buttonArea" className={styles.buttonArea}>
        <div>
          <button
            id="tempSaveBtn"
            className={styles.tempSaveBtn}
            onClick={handlePreviousPage}
          >
            이전 페이지
          </button>
        </div>
        <div>
          <button
            id="nextPageBtn"
            className={styles.rightBtn}
            onClick={handleNextPage}
            style={currentIndex === -1 ? {} : { fontSize: '18px' }}
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
