package com.example.entitiesTesting.entities;

import javax.persistence.*;

@Entity
@Table(name = "layer")
public class LayerEntity {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private int id;
    private String name;
    private int layerPropertiesId;
    private int offsetX;
    private int offsetY;
    private int mapId;
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

    public int getLayerPropertiesId() {
        return layerPropertiesId;
    }

    public void setLayerPropertiesId(int layerPropertiesId) {
        this.layerPropertiesId = layerPropertiesId;
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

    public int getMapId() {
        return mapId;
    }

    public void setMapId(int mapId) {
        this.mapId = mapId;
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
