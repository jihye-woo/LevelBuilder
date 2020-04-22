package levelBuilder.com.repositories;

import levelBuilder.com.entities.MapEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MapRepository extends JpaRepository<MapEntity, Integer> {
    MapEntity findByName(int name); //find map with given name
}
