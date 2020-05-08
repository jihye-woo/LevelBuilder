/* References I used:
   - https://attacomsian.com/blog/spring-data-jpa-composite-primary-key#
*/

package levelBuilder.com.serializable;

import java.io.Serializable;
import java.util.Objects;

public class TilesetId implements Serializable {
    private String name;
    private String ownedBy;

    public TilesetId(){
    }

    public TilesetId(String name, String ownedBy) {
        this.name = name;
        this.ownedBy = ownedBy;
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, ownedBy);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TilesetId tilesetId = (TilesetId) o;
        return name.equals(tilesetId.name) &&
                ownedBy.equals(tilesetId.ownedBy);
    }
}