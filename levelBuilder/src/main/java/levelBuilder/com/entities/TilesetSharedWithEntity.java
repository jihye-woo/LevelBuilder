package levelBuilder.com.entities;

import javax.persistence.*;

@Entity
@Table(name = "TilesetSharedWith")
public class TilesetSharedWithEntity {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private int id;
    private String sharedByUsername;
    private String sharedWithUsername;
    private String tilesetName;
    private String tilesetOwnedBy;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getSharedByUsername() {
        return sharedByUsername;
    }

    public void setSharedByUsername(String sharedByUsername) {
        this.sharedByUsername = sharedByUsername;
    }

    public String getSharedWithUsername() {
        return sharedWithUsername;
    }

    public void setSharedWithUsername(String sharedWithUsername) {
        this.sharedWithUsername = sharedWithUsername;
    }

    public String getTilesetName() {
        return tilesetName;
    }

    public void setTilesetName(String tilesetName) {
        this.tilesetName = tilesetName;
    }

    public String getTilesetOwnedBy() {
        return tilesetOwnedBy;
    }

    public void setTilesetOwnedBy(String tilesetOwnedBy) {
        this.tilesetOwnedBy = tilesetOwnedBy;
    }
}
