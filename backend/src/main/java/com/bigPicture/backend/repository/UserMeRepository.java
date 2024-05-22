package com.bigPicture.backend.repository;

import com.bigPicture.backend.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserMeRepository extends JpaRepository<User,Long> {
}
