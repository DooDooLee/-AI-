package com.bigPicture.backend.payload.response;

import com.bigPicture.backend.domain.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor @AllArgsConstructor
public class UserNameResponse {
    private String userName;

    public static UserNameResponse of(User user) {
        return new UserNameResponse(
                user.getName()
        );
    }
}
