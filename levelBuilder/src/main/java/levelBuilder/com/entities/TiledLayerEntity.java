package levelBuilder.com.entities;

import javax.persistence.*;

@Entity
@Table(name = "TiledLayer")
public class TiledLayerEntity {
    @Id
    private int layerId;
    private int tilewidth;
    private int tileheight;
    @Id
    private String mapName;

    public int getLayerId() {
        return layerId;
    }

    public void setLayerId(int layerId) {
        this.layerId = layerId;
    }

    public int getTilewidth() {
        return tilewidth;
    }

    public void setTilewidth(int tilewidth) {
        this.tilewidth = tilewidth;
    }

    public int getTileheight() {
        return tileheight;
    }

    public void setTileheight(int tileheight) {
        this.tileheight = tileheight;
    }

    public String getMapName() {
        return mapName;
    }

    public void setMapName(String mapName) {
        this.mapName = mapName;
    }
}
