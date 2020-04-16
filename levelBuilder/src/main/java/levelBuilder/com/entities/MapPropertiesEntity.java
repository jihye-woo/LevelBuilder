package levelBuilder.com.entities;

import javax.persistence.*;

@Entity
@Table(name = "mapProperties")
public class MapPropertiesEntity {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private int id;
    private Integer width;
    private Integer height;
    private Integer offsetX;
    private Integer offsetY;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Integer getWidth() {
        return width;
    }

    public void setWidth(Integer width) {
        this.width = width;
    }

    public Integer getHeight() {
        return height;
    }

    public void setHeight(Integer height) {
        this.height = height;
    }

    public Integer getOffsetX() {
        return offsetX;
    }

    public void setOffsetX(Integer offsetX) {
        this.offsetX = offsetX;
    }

    public Integer getOffsetY() {
        return offsetY;
    }

    public void setOffsetY(Integer offsetY) {
        this.offsetY = offsetY;
    }
}
