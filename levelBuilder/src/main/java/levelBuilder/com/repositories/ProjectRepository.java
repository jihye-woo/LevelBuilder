package levelBuilder.com.repositories;

import levelBuilder.com.entities.ProjectEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<ProjectEntity, Integer> {
    ProjectEntity findById(int id); //find project based on a given project id
    List<ProjectEntity> findByOwnedByUserId(int userId); //find all projects owned by specific user id
}
