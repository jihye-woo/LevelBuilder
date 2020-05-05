package levelBuilder.com.repositories;

import levelBuilder.com.entities.TilesetEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TilesetRepository extends JpaRepository<TilesetEntity, Integer> {
    List<TilesetEntity> findByMapName(String mapName); //find all tilesets associated with a certain map
    List<TilesetEntity> findByOwnedBy(String ownedBy); //find all tilesets owned by a given username
    TilesetEntity findById(int id);
}
