package levelBuilder.com.repositories;

import levelBuilder.com.entities.TileEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TileRepository extends JpaRepository<TileEntity, Integer> {
    List<TileEntity> findByLayerId(int layerId); //Find all the tiles in a certain layer. Each tile keeps track of where in the layer it is located
    List<TileEntity> findByTilesetId(int tilesetId); //Find all the tiles in a certain tileset. Each tile keeps track of where in the tileset it is located
}
