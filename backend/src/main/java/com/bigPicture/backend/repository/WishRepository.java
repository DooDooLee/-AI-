package com.bigPicture.backend.repository;

import com.bigPicture.backend.domain.Book;
import com.bigPicture.backend.domain.User;
import com.bigPicture.backend.domain.Wish;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import java.util.List;
import java.util.Optional;

@Repository
public interface WishRepository extends JpaRepository<Wish, Long> {
    Optional<Wish> findByBookAndUser(Book book, User user);
}
