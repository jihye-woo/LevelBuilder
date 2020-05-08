package levelBuilder.com.entities;

import javax.persistence.*;
import java.util.Arrays;

@Entity
@Table(name = "ImagesAddedToTileset")
public class ImagesAddedToTilesetEntity {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private int id;
    private byte[] image; //image is stored as LONGBLOB in MySQL -> need to convert to image
    private String tilesetName;
    private String tilesetOwnedBy;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
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
