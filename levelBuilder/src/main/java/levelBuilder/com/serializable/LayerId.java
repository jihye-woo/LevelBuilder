package levelBuilder.com.serializable;

import java.io.Serializable;
import java.util.Objects;

public class LayerId implements Serializable {
    private int id;
    private String mapName;

    public LayerId(){
    }

    public LayerId(int id, String mapName) {
        this.id = id;
        this.mapName = mapName;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, mapName);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        LayerId layerId = (LayerId) o;
        return id==(layerId.id) &&
                mapName.equals(layerId.mapName);
    }
}