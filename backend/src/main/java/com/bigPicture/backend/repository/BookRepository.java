package com.bigPicture.backend.repository;

import com.bigPicture.backend.domain.Book;
import com.bigPicture.backend.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BookRepository extends JpaRepository<Book, Long> {

    @Query("SELECT b FROM Book b WHERE b.user.id = :userId")
    List<Book> findBooksByUserId(@Param("userId") Long userId);


    List<Book> findAllByOrderByIdDesc();

    List<Book> findAllByOrderByIdAsc();
}
