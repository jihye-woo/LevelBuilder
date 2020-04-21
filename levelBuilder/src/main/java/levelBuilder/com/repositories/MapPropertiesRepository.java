package levelBuilder.com.repositories;

import levelBuilder.com.entities.MapPropertiesEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MapPropertiesRepository extends JpaRepository<MapPropertiesEntity, Integer> {
    MapPropertiesEntity findByMapId(int mapId); //find the properties associated with a map
}
