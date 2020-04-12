package com.example.entitiesTesting.entities;

import javax.persistence.*;

@Entity
@Table(name = "tileset")
public class TilesetEntity {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private int id;
    private String name;
    private int tilesetPropertiesId;
    private int mapId;

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

    public int getTilesetPropertiesId() {
        return tilesetPropertiesId;
    }

    public void setTilesetPropertiesId(int tilesetPropertiesId) {
        this.tilesetPropertiesId = tilesetPropertiesId;
    }

    public int getMapId() {
        return mapId;
    }

    public void setMapId(int mapId) {
        this.mapId = mapId;
    }
}
