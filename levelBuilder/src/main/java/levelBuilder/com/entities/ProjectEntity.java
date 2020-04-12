package com.example.entitiesTesting.entities;

import javax.persistence.*;

@Entity
@Table(name = "project")
public class ProjectEntity {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private int id;
    private String name;
    private int ownedByUserId;

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

    public int getOwnedByUserId() {
        return ownedByUserId;
    }

    public void setOwnedByUserId(int ownedByUserId) {
        this.ownedByUserId = ownedByUserId;
    }
}
