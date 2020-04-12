package com.example.entitiesTesting.entities;

import javax.persistence.*;

@Entity
@Table(name = "ObjectLayer", schema = "pubhattachar", catalog = "")
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
