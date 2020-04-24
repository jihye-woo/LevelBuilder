package levelBuilder.com.entities;

import levelBuilder.com.serializable.ObjectLayerId;

import javax.persistence.*;

@Entity
@Table(name = "ObjectLayer")
@IdClass(ObjectLayerId.class)
public class ObjectLayerEntity {
    @Id
    private int layerId;
    @Id
    private String mapName;

    public int getLayerId() {
        return layerId;
    }

    public void setLayerId(int layerId) {
        this.layerId = layerId;
    }

    public String getMapName() {
        return mapName;
    }

    public void setMapName(String mapName) {
        this.mapName = mapName;
    }
}
