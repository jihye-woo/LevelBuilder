package levelBuilder.com.repositories;

import levelBuilder.com.entities.TiledLayerEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TiledLayerRepository extends JpaRepository<TiledLayerEntity, Integer> {
    public TiledLayerEntity findByLayerId(int layerId); //find the TiledLayer given the (matching) parent Layer id
}
