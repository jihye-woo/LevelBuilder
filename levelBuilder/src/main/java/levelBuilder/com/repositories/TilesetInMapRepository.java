package levelBuilder.com.repositories;

import levelBuilder.com.entities.TilesetInMapEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TilesetInMapRepository extends JpaRepository<TilesetInMapEntity, Integer> {
    List<TilesetInMapEntity> findByMapName(String mapName); //find all the tilesets in a given map name
}
