package levelBuilder.com.repositories;

import levelBuilder.com.entities.ProjectSharedWithEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface ProjectSharedWithRepository extends JpaRepository<ProjectSharedWithEntity, Integer> {
    /*Find all users that a project is shared with
    ProjectSharedWithEntity has userId and projectId fields
    Can then create a list of user ids that a project is shared with*/
    public ArrayList<ProjectSharedWithEntity> findByProjectId(int projectId);
}
