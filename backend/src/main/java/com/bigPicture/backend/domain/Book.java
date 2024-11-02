package com.bigPicture.backend.domain;

import com.bigPicture.backend.payload.PageDto;
import com.bigPicture.backend.payload.request.BookUpdateRequest;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Book {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "book_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @CreatedDate
    private LocalDateTime createdAt;

    private Long bookLike;

    private String cover;

    private String title;

    @OneToMany(mappedBy = "book", cascade = CascadeType.ALL, orphanRemoval = true)
    List<Page> pages = new ArrayList<>();

    @OneToMany(mappedBy = "book", cascade = CascadeType.ALL, orphanRemoval = true)
    List<Review> reviews = new ArrayList<>();

    @OneToMany(mappedBy = "book", cascade = CascadeType.ALL, orphanRemoval = true)
    List<Favorite> favorites = new ArrayList<>();

    @Builder
    public Book(User user, String title, String cover, Long bookLike, List<Page> pages) {
        this.user = user;
        this.bookLike = bookLike;
        this.cover = cover;
        this.title = title;
        this.pages = pages;
    }

    /* ------------- 좋아요 메서드 -------------- */
    public void increaseLiked() {
        if (this.bookLike == null) {
            this.bookLike = 0L;
        }
        this.bookLike += 1;
    }

    public void decreaseLiked() {
        if (this.bookLike == null) {
            this.bookLike = 0L;
        }
        this.bookLike -= 1;
    }

    public void update(BookUpdateRequest request) {
        this.bookLike = request.getBookLike();
        this.cover = request.getCover();
        this.title = request.getTitle();

        // 기존 페이지 리스트를 비우고 새로 추가된 페이지 리스트를 다시 설정
        this.pages.clear();

        if (request.getPages() != null) {
            List<Page> newPages = request.getPages().stream()
                    .map(pageDto -> Page.builder()
                            .book(this)  // 현재 Book 객체를 설정 (양방향 연관관계 유지)
                            .image(pageDto.getImage())
                            .contents(pageDto.getContent())
                            .pageNumber(pageDto.getPageNumber())
                            .build())
                    .collect(Collectors.toList());

            // 새로운 페이지들에 대해 연관관계 설정 후 추가
            newPages.forEach(page -> page.updateBook(this));
            this.pages.addAll(newPages);
        }
    }
}
