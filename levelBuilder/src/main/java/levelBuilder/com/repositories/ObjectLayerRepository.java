package levelBuilder.com.repositories;

import levelBuilder.com.entities.ObjectLayerEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ObjectLayerRepository extends JpaRepository<ObjectLayerEntity, Integer> {
    ObjectLayerEntity findByLayerId(int layerId); //find the ObjectLayer given the parent Layer id
}
