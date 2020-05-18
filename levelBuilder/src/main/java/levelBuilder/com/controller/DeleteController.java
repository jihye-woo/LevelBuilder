package levelBuilder.com.controller;

import levelBuilder.com.MyUserDetails;
import levelBuilder.com.entities.ImagesAddedToTilesetEntity;
import levelBuilder.com.entities.LayerEntity;
import levelBuilder.com.entities.LayerPropertiesEntity;
import levelBuilder.com.entities.MapEntity;
import levelBuilder.com.entities.MapSharedWithEntity;
import levelBuilder.com.entities.TilesetEntity;
import levelBuilder.com.entities.TilesetInMapEntity;
import levelBuilder.com.entities.TilesetSharedWithEntity;
import levelBuilder.com.repositories.ImagesAddedToTilesetRepository;
import levelBuilder.com.repositories.LayerPropertiesRepository;
import levelBuilder.com.repositories.LayerRepository;
import levelBuilder.com.repositories.MapRepository;
import levelBuilder.com.repositories.MapSharedWithRepository;
import levelBuilder.com.repositories.TilesetInMapRepository;
import levelBuilder.com.repositories.TilesetRepository;
import levelBuilder.com.repositories.TilesetSharedWithRepository;
import levelBuilder.com.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.ArrayList;


@Controller
public class DeleteController {
    @Autowired
    UserRepository userRepository;

    @Autowired
    MapRepository mapRepository;

    @Autowired
    MapSharedWithRepository mapSharedWithRepository;

    @Autowired
    TilesetRepository tilesetRepository;

    @Autowired
    TilesetSharedWithRepository tilesetSharedWithRepository;

    @Autowired
    LayerRepository layerRepository;

    @Autowired
    LayerPropertiesRepository layerPropertiesRepository;

    @Autowired
    TilesetInMapRepository tilesetInMapRepository;

    @Autowired
    ImagesAddedToTilesetRepository imagesAddedToTilesetRepository;


    @GetMapping("/delete-map")
    public String deleteOwnedMap(@RequestParam("mapName") String mapName) {
        MyUserDetails myUserDetails = (MyUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        MapEntity map = mapRepository.findByName(mapName);

        if (map==null){ //map doesnt exist
            return "redirect:/my-projects"; //redirect back to projects page
        }

        if (map.getOwnedBy().equals(myUserDetails.getUsername())) { //if the user owns this map, delete from database
            mapRepository.delete(map);
            //remove everyone's access to the old map
            ArrayList<MapSharedWithEntity> shares = (ArrayList<MapSharedWithEntity>) mapSharedWithRepository.findByMapName(mapName);
            for (MapSharedWithEntity share : shares) {
                mapSharedWithRepository.delete(share);
            }

            deleteMapHelper(mapName); //delete other things related to the map
        }

        else{//if user has been shared this map, just remove their shared access from database
            MapSharedWithEntity share = mapSharedWithRepository.findByMapNameAndUserName(mapName, myUserDetails.getUsername());
            if (share != null){ //make sure they actually do have share access
                mapSharedWithRepository.delete(share);
            }
        }

        return "redirect:/my-projects"; //redirect back to projects page
    }

    @GetMapping("/delete-tileset")
    public String shareTileset(@RequestParam("tilesetName") String tilesetName, @RequestParam("ownedBy") String ownedBy) {
        MyUserDetails myUserDetails = (MyUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        TilesetEntity tileset = tilesetRepository.findByNameAndOwnedBy(tilesetName, ownedBy);

        if(tileset==null){ //tileset doesnt exist
            return "redirect:/my-tilesets"; //redirect back to tilesets page
        }

        if (tileset.getOwnedBy().equals(myUserDetails.getUsername())) { //if the user owns this tileset, delete from database
            tilesetRepository.delete(tileset);
            //remove everyone's access to the old tileset
            ArrayList<TilesetSharedWithEntity> shares = (ArrayList<TilesetSharedWithEntity>) tilesetSharedWithRepository
                    .findByTilesetNameAndTilesetOwnedBy(tilesetName, myUserDetails.getUsername());
            for (TilesetSharedWithEntity share : shares) {
                tilesetSharedWithRepository.delete(share);
            }

            deleteTilesetHelper(tilesetName, ownedBy); //delete other things related to the tileset
        }

        else{//if user has been shared this tileset, just remove their shared access from database
            TilesetSharedWithEntity share = tilesetSharedWithRepository
                    .findByTilesetNameAndTilesetOwnedByAndSharedWithUsername(tilesetName, ownedBy, myUserDetails.getUsername());
            if (share != null){ //make sure they actually do have share access
                tilesetSharedWithRepository.delete(share);
            }
        }

        return "redirect:/my-tilesets"; //redirect back to tilesets page
    }

    private void deleteMapHelper(String mapName){
        //delete all layers associated with the map
        ArrayList<LayerEntity> layers = (ArrayList<LayerEntity>) layerRepository.findByMapName(mapName);
        for (LayerEntity layer : layers) {
            //delete properties associated with each layer if any
            LayerPropertiesEntity property = layerPropertiesRepository.findByLayerIdAndMapName(layer.getId(), mapName);
            if (property!=null) {
                layerPropertiesRepository.delete(property);
            }

            layerRepository.delete(layer);
        }

        //delete all TilesetInMap associated with the map - remove all tileset from specific map
        ArrayList<TilesetInMapEntity> tilesetInMaps = (ArrayList<TilesetInMapEntity>)
                tilesetInMapRepository.findByMapName(mapName);
        for (TilesetInMapEntity tilesetInMap : tilesetInMaps){
            tilesetInMapRepository.delete(tilesetInMap);
        }
    }

    private void deleteTilesetHelper(String tilesetName, String ownedBy){
        //delete all TilesetInMap associated with the tileset - remove specific tileset from all maps that have it
        ArrayList<TilesetInMapEntity> tilesetInMaps = (ArrayList<TilesetInMapEntity>)
                tilesetInMapRepository.findByTilesetNameAndUsername(tilesetName, ownedBy);
        for (TilesetInMapEntity tilesetInMap : tilesetInMaps){
            tilesetInMapRepository.delete(tilesetInMap);
        }

        //delete all ImagesAddedToTileset associated with the tileset
        ArrayList<ImagesAddedToTilesetEntity> imagesAddedToTilesets = (ArrayList<ImagesAddedToTilesetEntity>)
                imagesAddedToTilesetRepository.findByTilesetNameAndTilesetOwnedBy(tilesetName, ownedBy);
        for (ImagesAddedToTilesetEntity imagesAddedToTileset : imagesAddedToTilesets){
            imagesAddedToTilesetRepository.delete(imagesAddedToTileset);
        }
    }
}
