package levelBuilder.com.entities;

import javax.persistence.*;

@Entity
@Table(name = "ObjectLayer")
public class ObjectLayerEntity {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private int layerId;

    public int getLayerId() {
        return layerId;
    }

    public void setLayerId(int layerId) {
        this.layerId = layerId;
    }
}
