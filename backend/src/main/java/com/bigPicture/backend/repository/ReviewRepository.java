package com.bigPicture.backend.repository;

import com.bigPicture.backend.domain.Book;
import com.bigPicture.backend.domain.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    @Query("SELECT b FROM Review b WHERE b.user.id = :userId AND b.id = :reviewId")
    Review findByUserIdAndReviewId(@Param("userId") Long userId, @Param("reviewId") Long reviewId);
}
