package com.bigPicture.backend.repository;

import com.bigPicture.backend.domain.Favorite;
import com.bigPicture.backend.domain.User;
import com.bigPicture.backend.domain.Book;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FavoriteRepository extends JpaRepository<Favorite, Long> {

    Optional<Favorite> findByUserAndBook(User user, Book book);

    List<Favorite> findByUser(User user);  // 사용자별 즐겨찾기 목록 조회
}
