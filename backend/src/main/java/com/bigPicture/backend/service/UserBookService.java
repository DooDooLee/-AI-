package com.bigPicture.backend.service;

import com.bigPicture.backend.domain.Book;
import com.bigPicture.backend.domain.User;
import com.bigPicture.backend.payload.response.UserBookInfoResponse;
import com.bigPicture.backend.payload.response.UserBookResponse;
import com.bigPicture.backend.repository.BookRepository;
import com.bigPicture.backend.repository.UserRepository;
import com.bigPicture.backend.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserBookService {

    private final BookRepository bookRepository;
    private final UserRepository userRepository;

    public List<UserBookInfoResponse> getAllUserBooks(Long userId) {

        //요청토큰에 해당하는 user 를 꺼내옴
        //User user = userRepository.findById(userPrincipal.getId()).get();

        List<Book> books = bookRepository.findBooksByUserId(userId);
        return UserBookResponse.of(books); //응답 데이터를 던져야 함으로 DTO 로 변환
    }
}
