package levelBuilder.com.repositories;

import levelBuilder.com.entities.ImagesAddedToTilesetEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository //for these repositories, we don't need to implement the methods as long as we name them "findBy--" correctly
public interface ImagesAddedToTilesetRepository extends JpaRepository<ImagesAddedToTilesetEntity, Integer> {
    public ArrayList<ImagesAddedToTilesetEntity> findByTilesetId(int tilesetId); //find all the images associated with a certain tileset
}