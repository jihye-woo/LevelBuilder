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
    private int tilesetId;

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

    public int getTilesetId() {
        return tilesetId;
    }

    public void setTilesetId(int tilesetId) {
        this.tilesetId = tilesetId;
    }
}
