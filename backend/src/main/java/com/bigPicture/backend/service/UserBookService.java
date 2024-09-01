package com.bigPicture.backend.service;

import com.bigPicture.backend.domain.Book;
import com.bigPicture.backend.domain.User;
import com.bigPicture.backend.payload.response.BookInfoResponse;
import com.bigPicture.backend.payload.response.UserBookInfoResponse;
import com.bigPicture.backend.payload.response.UserBooksResponse;
import com.bigPicture.backend.repository.BookRepository;
import com.bigPicture.backend.repository.UserRepository;
import com.bigPicture.backend.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserBookService {

    private final BookRepository bookRepository;
    private final UserRepository userRepository;

    @Transactional
    public List<UserBookInfoResponse> getAllUserBooks(UserPrincipal userPrincipal, int page, int size) {
        int offset = (page - 1) * size;
        User user = userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Book> books = bookRepository.findByUser(user);
        return books.stream()
                .skip(offset)
                .limit(size)
                .map(UserBookInfoResponse::of)
                .collect(Collectors.toList()); //응답 데이터를 던져야 함으로 DTO 로 변환
    }
}