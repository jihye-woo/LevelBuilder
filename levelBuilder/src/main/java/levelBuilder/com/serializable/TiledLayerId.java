package levelBuilder.com.serializable;

import java.io.Serializable;

public class TiledLayerId implements Serializable {
    private int layerId;
    private String mapName;

    // default constructor

    public TiledLayerId(int layerId, String mapName) {
        this.layerId = layerId;
        this.mapName = mapName;
    }

}