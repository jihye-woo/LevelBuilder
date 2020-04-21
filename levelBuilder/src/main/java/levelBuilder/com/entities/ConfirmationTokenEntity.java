package levelBuilder.com.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.UUID;

@Entity
public class ConfirmationTokenEntity {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private int tokenId;
    private String confirmationToken;
    private String userEmail;

    public ConfirmationTokenEntity() {
        confirmationToken = UUID.randomUUID().toString();
    }

    public int getTokenId() {
        return tokenId;
    }

    public void setTokenId(int tokenId) {
        this.tokenId = tokenId;
    }

    public String getConfirmationToken() {
        return confirmationToken;
    }

    public void setConfirmationToken(String confirmationToken) {
        this.confirmationToken = confirmationToken;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }
}