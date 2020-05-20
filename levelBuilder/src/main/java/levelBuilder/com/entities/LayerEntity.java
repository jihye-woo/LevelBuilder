package levelBuilder.com.entities;

import levelBuilder.com.serializable.LayerId;

import javax.persistence.*;

@Entity
@Table(name = "layer")
@IdClass(LayerId.class)
public class LayerEntity {
    @Id
    private int id;
    private String name;
    @Id
    private String mapName;
    private int orderInMap;
    private String type;
    @Lob //Stored as LONGTEXT in MySQL
    private String csv; //This is an array of tiles (stored as ints)
    private int offsetX;
    private int offsetY;

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

    public String getMapName() {
        return mapName;
    }

    public void setMapName(String mapName) {
        this.mapName = mapName;
    }

    public int getOrderInMap() {
        return orderInMap;
    }

    public void setOrderInMap(int orderInMap) {
        this.orderInMap = orderInMap;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getCsv() {
        return csv;
    }

    public void setCsv(String csv) {
        this.csv = csv;
    }

    public int getOffsetX() {
        return offsetX;
    }

    public void setOffsetX(int offsetX) {
        this.offsetX = offsetX;
    }

    public int getOffsetY() {
        return offsetY;
    }

    public void setOffsetY(int offsetY) {
        this.offsetY = offsetY;
    }
}
