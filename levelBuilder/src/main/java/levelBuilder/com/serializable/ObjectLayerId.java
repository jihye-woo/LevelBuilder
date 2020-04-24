package levelBuilder.com.serializable;

import levelBuilder.com.entities.ObjectLayerEntity;

import java.io.Serializable;
import java.util.Objects;

public class ObjectLayerId implements Serializable {
    private int layerId;
    private String mapName;

    public ObjectLayerId() {
    }

    public ObjectLayerId(int layerId, String mapName) {
        this.layerId = layerId;
        this.mapName = mapName;
    }

    @Override
    public int hashCode() {
        return Objects.hash(layerId, mapName);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ObjectLayerId objectLayerId = (ObjectLayerId) o;
        return layerId==(objectLayerId.layerId) &&
                mapName.equals(objectLayerId.mapName);
    }

}