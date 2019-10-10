package showcase.bluebook.domain;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

/**
 * A Project.
 */
@Document(collection = "project")
public class Project implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("title")
    private String title;

    @Field("start")
    private Instant start;

    @Field("end")
    private Instant end;

    @Field("description")
    private String description;

    @Field("funds")
    private Double funds;

    @Field("image")
    private String image;

    @Field("city")
    private String city;

    @Field("country")
    private String country;

    @Field("score")
    private Long score;

    @DBRef
    @Field("expertId")
    private Expert expertId;

    @DBRef
    @Field("initiatorId")
    private User initiatorId;

    @DBRef
    @Field("user")
    private Set<User> users = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public Project title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Instant getStart() {
        return start;
    }

    public Project start(Instant start) {
        this.start = start;
        return this;
    }

    public void setStart(Instant start) {
        this.start = start;
    }

    public Instant getEnd() {
        return end;
    }

    public Project end(Instant end) {
        this.end = end;
        return this;
    }

    public void setEnd(Instant end) {
        this.end = end;
    }

    public String getDescription() {
        return description;
    }

    public Project description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getFunds() {
        return funds;
    }

    public Project funds(Double funds) {
        this.funds = funds;
        return this;
    }

    public void setFunds(Double funds) {
        this.funds = funds;
    }

    public String getImage() {
        return image;
    }

    public Project image(String image) {
        this.image = image;
        return this;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getCity() {
        return city;
    }

    public Project city(String city) {
        this.city = city;
        return this;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getCountry() {
        return country;
    }

    public Project country(String country) {
        this.country = country;
        return this;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public Long getScore() {
        return score;
    }

    public Project score(Long score) {
        this.score = score;
        return this;
    }

    public void setScore(Long score) {
        this.score = score;
    }

    public Expert getExpertId() {
        return expertId;
    }

    public Project expertId(Expert expert) {
        this.expertId = expert;
        return this;
    }

    public void setExpertId(Expert expert) {
        this.expertId = expert;
    }

    public User getInitiatorId() {
        return initiatorId;
    }

    public Project initiatorId(User user) {
        this.initiatorId = user;
        return this;
    }

    public void setInitiatorId(User user) {
        this.initiatorId = user;
    }

    public Set<User> getUsers() {
        return users;
    }

    public Project users(Set<User> users) {
        this.users = users;
        return this;
    }

    public Project addUser(User user) {
        this.users.add(user);
        return this;
    }

    public Project removeUser(User user) {
        this.users.remove(user);
        return this;
    }

    public void setUsers(Set<User> users) {
        this.users = users;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Project)) {
            return false;
        }
        return id != null && id.equals(((Project) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Project{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", start='" + getStart() + "'" +
            ", end='" + getEnd() + "'" +
            ", description='" + getDescription() + "'" +
            ", funds=" + getFunds() +
            ", image='" + getImage() + "'" +
            ", city='" + getCity() + "'" +
            ", country='" + getCountry() + "'" +
            ", score=" + getScore() +
            "}";
    }
}
