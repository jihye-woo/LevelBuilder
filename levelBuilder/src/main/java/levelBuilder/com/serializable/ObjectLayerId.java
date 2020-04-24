package levelBuilder.com.serializable;

import java.io.Serializable;

public class ObjectLayerId implements Serializable {
    private int layerId;
    private String mapName;

    // default constructor

    public ObjectLayerId(int layerId, String mapName) {
        this.layerId = layerId;
        this.mapName = mapName;
    }

}