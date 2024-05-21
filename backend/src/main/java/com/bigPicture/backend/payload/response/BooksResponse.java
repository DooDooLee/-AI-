package com.bigPicture.backend.payload.response;

import com.bigPicture.backend.domain.Book;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class BooksResponse {

    private List<BookInfoResponse> bookInfoResponses;

    public static List<BookInfoResponse> of(List<Book> books) {
        return books.stream()
                .map(BookInfoResponse::of)
                .collect(Collectors.toList());
    }

}