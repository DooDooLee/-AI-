package com.bigPicture.backend.service;

import com.bigPicture.backend.domain.Book;
import com.bigPicture.backend.payload.response.UserBookInfoResponse;
import com.bigPicture.backend.payload.response.UserBooksResponse;
import com.bigPicture.backend.repository.BookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserBookService {

    private final BookRepository bookRepository;

    public List<UserBookInfoResponse> getAllUserBooks(Long userId) {

        List<Book> books = bookRepository.findBooksByUserId(userId);
        return UserBooksResponse.of(books); //응답 데이터를 던져야 함으로 DTO 로 변환
    }
}