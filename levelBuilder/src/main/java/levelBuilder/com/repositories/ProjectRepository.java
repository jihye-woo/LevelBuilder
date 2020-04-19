package levelBuilder.com.repositories;

import levelBuilder.com.entities.ProjectEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface ProjectRepository extends JpaRepository<ProjectEntity, Integer> {
    public ProjectEntity findById(int id); //find project based on a given project id
    public ArrayList<ProjectEntity> findByOwnedByUserId(int userId); //find all projects owned by specific user id
}
