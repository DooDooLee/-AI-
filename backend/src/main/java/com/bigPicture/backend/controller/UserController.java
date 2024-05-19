package com.bigPicture.backend.controller;

import com.bigPicture.backend.domain.User;
import com.bigPicture.backend.exception.ResourceNotFoundException;
import com.bigPicture.backend.payload.response.UserBookInfoResponse;
import com.bigPicture.backend.payload.response.UserBookResponse;
import com.bigPicture.backend.repository.UserRepository;
import com.bigPicture.backend.security.CurrentUser;
import com.bigPicture.backend.security.UserPrincipal;
import com.bigPicture.backend.service.UserBookService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class UserController {

    private final UserRepository userRepository;
    private final UserBookService userBookService;

    //마이페이지 책 목록 조회
    @GetMapping("/myPage/{userId}/list")
    public ResponseEntity<?> findAllUserBooks(@PathVariable Long userId) {
        List<UserBookInfoResponse> userBooks = userBookService.getAllUserBooks(userId);
        UserBookResponse response = new UserBookResponse(userBooks);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    //자신의 회원 정보를 리턴 (테스트용)
    @GetMapping("/user/me") //@CurrentUser : 프론트에서 주는 토큰을 가지고 객체를 만들어줌
    public User getCurrentUser(@CurrentUser UserPrincipal userPrincipal) {

        return userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userPrincipal.getId()));
    }
}
