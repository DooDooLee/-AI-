package com.bigPicture.backend.repository;

import com.bigPicture.backend.domain.Book;
import com.bigPicture.backend.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<Book, Long> {
}
