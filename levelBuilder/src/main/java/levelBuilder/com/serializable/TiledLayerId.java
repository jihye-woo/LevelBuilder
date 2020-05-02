/* References I used:
   - https://attacomsian.com/blog/spring-data-jpa-composite-primary-key#
*/

package levelBuilder.com.serializable;

import java.io.Serializable;
import java.util.Objects;

public class TiledLayerId implements Serializable {
    private int layerId;
    private String mapName;

    public TiledLayerId() {
    }

    public TiledLayerId(int layerId, String mapName) {
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
        TiledLayerId tiledLayerId = (TiledLayerId) o;
        return layerId==(tiledLayerId.layerId) &&
                mapName.equals(tiledLayerId.mapName);
    }

}