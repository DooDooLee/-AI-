package com.bigPicture.backend.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Page {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "page_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "book_id")
    private Book book;

    private String image;

    @Column(length = 2000)
    private String contents;

    private Long pageNumber;

    public void updateBook(Book book) {
        this.book = book;
    }

    @Builder
    public Page(String image, String contents, Long pageNumber) {
        this.image = image;
        this.contents = contents;
        this.pageNumber = pageNumber;
    }
}
