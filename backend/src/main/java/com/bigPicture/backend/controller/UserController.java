package com.bigPicture.backend.controller;

import com.bigPicture.backend.domain.User;
import com.bigPicture.backend.exception.ResourceNotFoundException;
import com.bigPicture.backend.payload.response.UserBookInfoResponse;
import com.bigPicture.backend.payload.response.UserBooksResponse;
import com.bigPicture.backend.payload.response.UserNameResponse;
import com.bigPicture.backend.repository.UserRepository;
import com.bigPicture.backend.security.CurrentUser;
import com.bigPicture.backend.security.UserPrincipal;
import com.bigPicture.backend.service.UserBookService;
import com.bigPicture.backend.service.UserService;
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

    private final UserService userService;
    private final UserBookService userBookService;
    private final UserRepository userRepository;

    //마이페이지 책 목록 조회
    @GetMapping("/myPage/{userId}/list")
    public ResponseEntity<?> findAllUserBooks(@PathVariable Long userId) {
        List<UserBookInfoResponse> userBooks = userBookService.getAllUserBooks(userId);
        UserBooksResponse response = new UserBooksResponse(userBooks);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    //자신의 회원 정보를 리턴
    @GetMapping("/user/me") //@CurrentUser : 프론트에서 주는 토큰을 가지고 객체를 만들어줌
    public User getCurrentUser(@CurrentUser UserPrincipal userPrincipal) {

        return userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userPrincipal.getId()));
    }

    //userName 조회
    @GetMapping("/user/{userId}")
    public ResponseEntity<?> findUserName(@PathVariable Long userId) {
        UserNameResponse response = userService.getUserName(userId);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

}