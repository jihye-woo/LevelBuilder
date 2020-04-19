package levelBuilder.com.repositories;

import levelBuilder.com.entities.MapEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface MapRepository extends JpaRepository<MapEntity, Integer> {
    public ArrayList<MapEntity> findByProjectId(int projectId); //find all maps in a certain project
}
