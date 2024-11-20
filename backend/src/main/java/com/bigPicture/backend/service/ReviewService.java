package com.bigPicture.backend.service;

import com.bigPicture.backend.domain.Book;
import com.bigPicture.backend.domain.Review;
import com.bigPicture.backend.domain.User;
import com.bigPicture.backend.exception.ResourceNotFoundException;
import com.bigPicture.backend.payload.request.BookCreateRequest;
import com.bigPicture.backend.payload.request.ReviewCreateRequest;
import com.bigPicture.backend.repository.BookRepository;
import com.bigPicture.backend.repository.ReviewRepository;
import com.bigPicture.backend.repository.UserRepository;
import com.bigPicture.backend.security.UserPrincipal;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final BookRepository bookRepository;
    private final UserRepository userRepository;
    private final ReviewRepository reviewRepository;

    @Transactional
    public void save(UserPrincipal userPrincipal, ReviewCreateRequest request, Long bookId) {

        //요청토큰에 해당하는 user 를 꺼내옴
        User user = userRepository.findById(userPrincipal.getId()).get();

        // review 에는 bookId도 필요함
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new ResourceNotFoundException("Book not found"));

        // ReviewCreateRequest 의 toEntity 메서드를 이용, user 엔티티와 book 엔티티를 넘겨줘서 user.id 와 book.id 도 요청dto에 초기화되게함
        Review review = request.toEntity(user, book);

        reviewRepository.save(review);
    }

    @Transactional
    public boolean deleteReview(UserPrincipal userPrincipal, Long reviewId) {

        User user = userRepository.findById(userPrincipal.getId()).get();

        Review review = reviewRepository.findByUserIdAndReviewId(user.getId(), reviewId);


        if (review.getUser().getId().equals(user.getId())) {
            reviewRepository.delete(review);
            return true;
        }

        return false;
    }

}
