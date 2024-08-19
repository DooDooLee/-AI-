package com.bigPicture.backend.domain;

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

    @OneToMany(mappedBy = "book", cascade = CascadeType.ALL)
    List<Review> reviews = new ArrayList<>();

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
}
