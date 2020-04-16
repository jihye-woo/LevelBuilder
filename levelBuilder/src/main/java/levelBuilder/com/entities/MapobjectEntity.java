package levelBuilder.com.entities;

import javax.persistence.*;
import java.util.Arrays;

@Entity
@Table(name = "mapobject")
public class MapobjectEntity {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private int id;
    private int xcoordinate;
    private int ycoordinate;
    private byte visible;
    private int height;
    private int width;
    private byte[] image; //image is stored as LONGBLOB in MySQL -> need to convert to image
    private int objectLayerId;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getXcoordinate() {
        return xcoordinate;
    }

    public void setXcoordinate(int xcoordinate) {
        this.xcoordinate = xcoordinate;
    }

    public int getYcoordinate() {
        return ycoordinate;
    }

    public void setYcoordinate(int ycoordinate) {
        this.ycoordinate = ycoordinate;
    }

    public byte getVisible() {
        return visible;
    }

    public void setVisible(byte visible) {
        this.visible = visible;
    }

    public int getHeight() {
        return height;
    }

    public void setHeight(int height) {
        this.height = height;
    }

    public int getWidth() {
        return width;
    }

    public void setWidth(int width) {
        this.width = width;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public int getObjectLayerId() {
        return objectLayerId;
    }

    public void setObjectLayerId(int objectLayerId) {
        this.objectLayerId = objectLayerId;
    }
}
