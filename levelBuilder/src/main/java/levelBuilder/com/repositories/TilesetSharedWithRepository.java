package levelBuilder.com.repositories;

import levelBuilder.com.entities.TilesetSharedWithEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TilesetSharedWithRepository extends JpaRepository<TilesetSharedWithEntity, Integer> {
    /*Find all tilesets that have been shared with a specific user
    TilesetSharedWithEntity has userName and tilesetId fields
    Can iterate through these to get all tilesets a user has access to
    */
    List<TilesetSharedWithEntity> findBySharedWithUsername(String sharedWithUsername);

    /*Find all users that a specific tileset has been shared with*/
    List<TilesetSharedWithEntity> findByTilesetNameAndTilesetOwnedBy(String tilesetName, String ownedByUsername);

    /*Determine if a given user has access to a specific tileset*/
    TilesetSharedWithEntity findByTilesetNameAndTilesetOwnedByAndSharedWithUsername(String tilesetName, String ownedByUsername, String sharedWithUsername);
}
