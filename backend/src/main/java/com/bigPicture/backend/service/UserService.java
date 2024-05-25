package com.bigPicture.backend.service;

import com.bigPicture.backend.domain.User;
import com.bigPicture.backend.exception.ResourceNotFoundException;
import com.bigPicture.backend.payload.response.UserResponse;
import com.bigPicture.backend.repository.UserRepository;
import com.bigPicture.backend.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    //유저 정보 조회
    public UserResponse getUserDetail(UserPrincipal userPrincipal) {
        User user = userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userPrincipal.getId()));

        return UserResponse.of(user);
    }


}
