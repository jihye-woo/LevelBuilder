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
}
