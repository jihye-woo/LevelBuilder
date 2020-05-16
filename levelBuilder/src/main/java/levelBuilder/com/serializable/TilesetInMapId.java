/* References I used:
   - https://attacomsian.com/blog/spring-data-jpa-composite-primary-key#
*/

package levelBuilder.com.serializable;

import java.io.Serializable;
import java.util.Objects;

public class TilesetInMapId implements Serializable {
    private String mapName;
    private String tilesetName;
    private String username;

    public TilesetInMapId(){
    }

    public TilesetInMapId(String mapName, String tilesetName, String username) {
        this.mapName = mapName;
        this.tilesetName = tilesetName;
        this.username = username;
    }

    @Override
    public int hashCode() {
        return Objects.hash(mapName, tilesetName, username);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TilesetInMapId tilesetInMapId = (TilesetInMapId) o;
        return mapName.equals(tilesetInMapId.mapName) &&
                tilesetName.equals(tilesetInMapId.tilesetName) &&
                username.equals(tilesetInMapId.username);
    }
}