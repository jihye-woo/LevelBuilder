package levelBuilder.com.serializable;

import java.io.Serializable;

public class LayerId implements Serializable {
    private int id;
    private String mapName;

    // default constructor

    public LayerId(int id, String mapName) {
        this.id = id;
        this.mapName = mapName;
    }

}