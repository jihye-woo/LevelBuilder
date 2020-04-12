package levelBuilder.com.entities;

import javax.persistence.*;

@Entity
@Table(name = "ProjectSharedWith")
public class ProjectSharedWithEntity {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private int id;
    private int userId;
    private int projectId;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getProjectId() {
        return projectId;
    }

    public void setProjectId(int projectId) {
        this.projectId = projectId;
    }
}
