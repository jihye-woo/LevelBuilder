package levelBuilder.com.repositories;

import levelBuilder.com.entities.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;


public interface UserRepository extends JpaRepository<UserEntity, Integer> {
    UserEntity findByUsername(String userName);
    UserEntity findByEmail(String email);
}
