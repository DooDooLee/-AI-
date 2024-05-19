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
public class UserBookResponse {

    private List<UserBookInfoResponse> userBookResponse;

    public static List<UserBookInfoResponse> of(List<Book> books) {
        return books.stream()
                .map(UserBookInfoResponse::of)
                .collect(Collectors.toList());
    }

}