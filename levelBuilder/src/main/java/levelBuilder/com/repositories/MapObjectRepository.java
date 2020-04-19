package levelBuilder.com.repositories;

import levelBuilder.com.entities.MapobjectEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface MapObjectRepository extends JpaRepository<MapobjectEntity, Integer> {
    public ArrayList<MapobjectEntity> findByObjectLayerId(int objectLayerId); //find all objects in a certain ObjectLayer
}
