package levelBuilder.com.repositories;

import levelBuilder.com.entities.TilesetPropertiesEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TilesetPropertiesRepository extends JpaRepository<TilesetPropertiesEntity, Integer> {
    public TilesetPropertiesEntity findByTilesetId(int tilesetId); //find the properties associated with a tileset
}
