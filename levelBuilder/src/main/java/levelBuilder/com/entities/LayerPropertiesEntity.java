package levelBuilder.com.entities;

import javax.persistence.*;

@Entity
@Table(name = "LayerProperties")
public class LayerPropertiesEntity {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private int id;
    private Byte visible;
    private Byte locked;
    private Integer opacity;
    private Integer verticalOffset;
    private Integer horizontalOffset;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Byte getVisible() {
        return visible;
    }

    public void setVisible(Byte visible) {
        this.visible = visible;
    }

    public Byte getLocked() {
        return locked;
    }

    public void setLocked(Byte locked) {
        this.locked = locked;
    }

    public Integer getOpacity() {
        return opacity;
    }

    public void setOpacity(Integer opacity) {
        this.opacity = opacity;
    }

    public Integer getVerticalOffset() {
        return verticalOffset;
    }

    public void setVerticalOffset(Integer verticalOffset) {
        this.verticalOffset = verticalOffset;
    }

    public Integer getHorizontalOffset() {
        return horizontalOffset;
    }

    public void setHorizontalOffset(Integer horizontalOffset) {
        this.horizontalOffset = horizontalOffset;
    }
}
