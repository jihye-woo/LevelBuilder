package com.example.entitiesTesting.entities;

import javax.persistence.*;

@Entity
@Table(name = "TiledLayer")
public class TiledLayerEntity {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private int layerId;
    private int tilewidth;
    private int tileheight;

    public int getLayerId() {
        return layerId;
    }

    public void setLayerId(int layerId) {
        this.layerId = layerId;
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
}
