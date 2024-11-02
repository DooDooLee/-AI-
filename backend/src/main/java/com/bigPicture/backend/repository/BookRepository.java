package com.bigPicture.backend.repository;

import com.bigPicture.backend.domain.Book;
import com.bigPicture.backend.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BookRepository extends JpaRepository<Book, Long> {

    List<Book> findByUser(User user);

    List<Book> findAllByOrderByIdDesc();

    List<Book> findAllByOrderByIdAsc();

    @Query("SELECT b FROM Book b WHERE b.id = :bookId AND b.user.id = :userId")
    Book findByBookIdAndUser(@Param("bookId") Long bookId, @Param("userId") Long userId);

    @Query("SELECT b FROM Book b WHERE lower(b.title) = lower(:name)")
    List<Book> findExactMatchBooksByName(@Param("name") String name);

    @Query("SELECT b FROM Book b WHERE lower(b.title) like lower(concat('%', :name, '%'))")
    List<Book> findBooksByNameContainingIgnoreCaseOrderByIdAsc(@Param("name") String name);
}
