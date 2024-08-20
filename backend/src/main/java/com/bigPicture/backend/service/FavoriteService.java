package com.bigPicture.backend.service;

import com.bigPicture.backend.domain.Book;
import com.bigPicture.backend.domain.Favorite;
import com.bigPicture.backend.domain.User;
import com.bigPicture.backend.exception.ResourceNotFoundException;
import com.bigPicture.backend.payload.response.BookInfoResponse;
import com.bigPicture.backend.repository.BookRepository;
import com.bigPicture.backend.repository.FavoriteRepository;
import com.bigPicture.backend.repository.UserRepository;
import com.bigPicture.backend.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FavoriteService {

    private final FavoriteRepository favoriteRepository;
    private final UserRepository userRepository;
    private final BookRepository bookRepository;

    // 즐겨찾기 추가
    public void addFavorite(UserPrincipal userPrincipal, Long bookId) {
        User user = getUser(userPrincipal);
        Book book = getBook(bookId);

        if (!favoriteRepository.findByUserAndBook(user, book).isPresent()) {
            Favorite favorite = Favorite.builder()
                    .user(user)
                    .book(book)
                    .build();
            favoriteRepository.save(favorite);
        }
    }

    // 즐겨찾기 삭제
    public void removeFavorite(UserPrincipal userPrincipal, Long bookId) {
        User user = getUser(userPrincipal);
        Book book = getBook(bookId);

        Favorite favorite = favoriteRepository.findByUserAndBook(user, book)
                .orElseThrow(() -> new ResourceNotFoundException("Favorite", "bookId", bookId));

        favoriteRepository.delete(favorite);
    }

    // 즐겨찾기한 책 목록 조회
    public List<BookInfoResponse> getFavoriteBooks(UserPrincipal userPrincipal) {
        User user = getUser(userPrincipal);

        // 유저의 즐겨찾기 목록을 가져옴
        List<Favorite> favorites = favoriteRepository.findByUser(user);

        // 각 즐겨찾기 항목에서 책 정보를 추출해 BookInfoResponse로 변환
        return favorites.stream()
                .map(favorite -> {
                    Book book = favorite.getBook();
                    return BookInfoResponse.of(book);
                })
                .collect(Collectors.toList());
    }

    private User getUser(UserPrincipal userPrincipal) {
        return userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userPrincipal.getId()));
    }

    private Book getBook(Long bookId) {
        return bookRepository.findById(bookId)
                .orElseThrow(() -> new ResourceNotFoundException("Book", "id", bookId));
    }
}
