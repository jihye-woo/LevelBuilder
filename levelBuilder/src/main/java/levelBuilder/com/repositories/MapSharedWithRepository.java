package levelBuilder.com.repositories;

import levelBuilder.com.entities.MapSharedWithEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MapSharedWithRepository extends JpaRepository<MapSharedWithEntity, Integer> {
    /*Find all users that one map is shared with
    ProjectSharedWithEntity has userName and mapName fields
    Can then create a list of usernames that a map is shared with*/
    List<MapSharedWithEntity> findByMapName(String mapName);

    /*Find all maps that have been shared with a specific user
    ProjectSharedWithEntity has userName and mapName fields
    Can then create a list of maps that a user has acces to
    */
    List<MapSharedWithEntity> findByUserName(String username);

    /*Determine if a given user has access to a specific map*/
    MapSharedWithEntity findByMapNameAndUserName(String mapName, String sharedWithUsername);
}
