package levelBuilder.com.entities;

import javax.persistence.*;

@Entity
@Table(name = "Tile")
public class TileEntity {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private int id;
    private int indexOfTileInTileset;
    private int tilesetId;
    private int indexOfTileInTiledLayer;
    private int layerId;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getIndexOfTileInTileset() {
        return indexOfTileInTileset;
    }

    public void setIndexOfTileInTileset(int indexOfTileInTileset) {
        this.indexOfTileInTileset = indexOfTileInTileset;
    }

    public int getTilesetId() {
        return tilesetId;
    }

    public void setTilesetId(int tilesetId) {
        this.tilesetId = tilesetId;
    }

    public int getIndexOfTileInTiledLayer() {
        return indexOfTileInTiledLayer;
    }

    public void setIndexOfTileInTiledLayer(int indexOfTileInTiledLayer) {
        this.indexOfTileInTiledLayer = indexOfTileInTiledLayer;
    }

    public int getLayerId() {
        return layerId;
    }

    public void setLayerId(int layerId) {
        this.layerId = layerId;
    }
}
