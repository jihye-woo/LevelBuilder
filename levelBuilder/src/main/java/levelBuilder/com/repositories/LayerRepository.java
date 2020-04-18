package levelBuilder.com.repositories;

import levelBuilder.com.entities.LayerEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LayerRepository extends JpaRepository<LayerEntity, Integer> {
    public LayerEntity findByMapId(int mapId); //find all the layers in a given map
}
