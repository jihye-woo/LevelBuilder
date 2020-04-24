package levelBuilder.com.repositories;

import levelBuilder.com.entities.LayerPropertiesEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LayerPropertiesRepository extends JpaRepository<LayerPropertiesEntity, Integer> {
    LayerPropertiesEntity findByLayerIdAndMapName(int layerId, String mapName); //find the properties associated with a layer
}
