import React, { useState } from 'react';
import styles from '../styles/ListPage.module.css';

const booksData = [
    {
        id: 1,
        title: "Book One",
        description: "Description for Book One",
        cover: "https://via.placeholder.com/100",
        date: "2024-01-01",
        popularity: 5,
    },
    {
        id: 2,
        title: "Book Two",
        description: "Description for Book Two",
        cover: "https://via.placeholder.com/100",
        date: "2024-05-15",
        popularity: 8,
    },
    {
        id: 3,
        title: "Book Three",
        description: "Description for Book Three",
        cover: "https://via.placeholder.com/100",
        date: "2024-08-20",
        popularity: 8,
    },
    // 책 데이터 추가
];

function ListBody() {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortType, setSortType] = useState('latest');

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSort = (type) => {
        setSortType(type);
    };

    const filteredBooks = booksData
        .filter(book =>
            book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.description.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            if (sortType === 'latest') {
                return new Date(b.date) - new Date(a.date);
            } else if (sortType === 'oldest') {
                return new Date(a.date) - new Date(b.date);
            } else if (sortType === 'popular') {
                return b.popularity - a.popularity;
            } else {
                return 0;
            }
        });

    return (
        <div className={styles.listBody}>
            <div className={styles.searchBar}>
                <input
                    type="text"
                    placeholder="도서명, 저자명으로 검색 가능"
                    value={searchTerm}
                    onChange={handleSearch}
                    className={styles.searchInput}
                />
            </div>
            <div className={styles.sortButtons}>
                <button
                    className={`${styles.sortButton} ${sortType === 'latest' ? styles.activeButton : ''}`}
                    onClick={() => handleSort('latest')}
                >
                    최신순
                </button>
                <button
                    className={`${styles.sortButton} ${sortType === 'oldest' ? styles.activeButton : ''}`}
                    onClick={() => handleSort('oldest')}
                >
                    오래된순
                </button>
                <button
                    className={`${styles.sortButton} ${sortType === 'popular' ? styles.activeButton : ''}`}
                    onClick={() => handleSort('popular')}
                >
                    인기순
                </button>
            </div>
            <div className={styles.bookList}>
                {filteredBooks.map((book, index) => (
                    <React.Fragment key={book.id}>
                        {index > 0 && <hr className={styles.separator} />}
                        <div className={styles.bookItem}>
                            <img src={book.cover} alt={book.title} className={styles.bookCover} />
                            <div className={styles.bookDetails}>
                                <h3>{book.title}</h3>
                                <p>{book.description}</p>
                            </div>
                        </div>
                        {index === filteredBooks.length - 1 && <hr className={styles.separator} />}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
}

export default ListBody;