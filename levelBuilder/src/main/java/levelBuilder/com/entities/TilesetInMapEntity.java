package levelBuilder.com.entities;

import levelBuilder.com.serializable.TilesetInMapId;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;

@Entity
@Table(name = "TilesetInMap")
@IdClass(TilesetInMapId.class)
public class TilesetInMapEntity {
    @Id
    private String mapName;
    @Id
    private String tilesetName;
    @Id
    private String username; //owner of the tileset
    private int gid;

    public String getMapName() {
        return mapName;
    }

    public void setMapName(String mapName) {
        this.mapName = mapName;
    }

    public String getTilesetName() {
        return tilesetName;
    }

    public void setTilesetName(String tilesetName) {
        this.tilesetName = tilesetName;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public int getGid() {
        return gid;
    }

    public void setGid(int gid) {
        this.gid = gid;
    }
}
