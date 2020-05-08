package levelBuilder.com.entities;

import java.util.Base64;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

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

    public void setImage(String encodedWithBase64) {
        this.image = Base64.getMimeDecoder().decode(encodedWithBase64.split(",")[1]);
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
