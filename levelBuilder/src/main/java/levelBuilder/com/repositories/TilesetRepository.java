package levelBuilder.com.repositories;

import levelBuilder.com.entities.TilesetEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TilesetRepository extends JpaRepository<TilesetEntity, Integer> {
    List<TilesetEntity> findByMapId(int mapId); //find all tilesets associated with a certain map

}
