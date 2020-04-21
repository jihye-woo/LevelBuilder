package levelBuilder.com.repositories;

import levelBuilder.com.entities.MapobjectEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MapObjectRepository extends JpaRepository<MapobjectEntity, Integer> {
    List<MapobjectEntity> findByObjectLayerId(int objectLayerId); //find all objects in a certain ObjectLayer
}
