package levelBuilder.com.entities;

import javax.persistence.*;

@Entity
@Table(name = "map")
public class MapEntity {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private int id;
    private String name;
    private int tilewidth;
    private int tileheight;
    private String tilelayerformat;
    private String orientation;
    private String tilerenderorder;
    private int projectId;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getTilewidth() {
        return tilewidth;
    }

    public void setTilewidth(int tilewidth) {
        this.tilewidth = tilewidth;
    }

    public int getTileheight() {
        return tileheight;
    }

    public void setTileheight(int tileheight) {
        this.tileheight = tileheight;
    }

    public String getTilelayerformat() {
        return tilelayerformat;
    }

    public void setTilelayerformat(String tilelayerformat) {
        this.tilelayerformat = tilelayerformat;
    }

    public String getOrientation() {
        return orientation;
    }

    public void setOrientation(String orientation) {
        this.orientation = orientation;
    }

    public String getTilerenderorder() {
        return tilerenderorder;
    }

    public void setTilerenderorder(String tilerenderorder) {
        this.tilerenderorder = tilerenderorder;
    }

    public int getProjectId() {
        return projectId;
    }

    public void setProjectId(int projectId) {
        this.projectId = projectId;
    }
}
