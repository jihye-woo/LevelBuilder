package levelBuilder.com.repositories;

import levelBuilder.com.entities.ConfirmationTokenEntity;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ConfirmationTokenRepository extends JpaRepository<ConfirmationTokenEntity, Integer> {
    ConfirmationTokenEntity findByConfirmationToken(String confirmationToken);
}
