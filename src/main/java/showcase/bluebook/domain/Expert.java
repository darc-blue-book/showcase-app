package showcase.bluebook.domain;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.io.Serializable;

/**
 * A Expert.
 */
@Document(collection = "expert")
public class Expert implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("picture")
    private byte[] picture;

    @Field("picture_content_type")
    private String pictureContentType;

    @Field("expertise")
    private String expertise;

    @DBRef
    @Field("userId")
    private User userId;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public byte[] getPicture() {
        return picture;
    }

    public Expert picture(byte[] picture) {
        this.picture = picture;
        return this;
    }

    public void setPicture(byte[] picture) {
        this.picture = picture;
    }

    public String getPictureContentType() {
        return pictureContentType;
    }

    public Expert pictureContentType(String pictureContentType) {
        this.pictureContentType = pictureContentType;
        return this;
    }

    public void setPictureContentType(String pictureContentType) {
        this.pictureContentType = pictureContentType;
    }

    public String getExpertise() {
        return expertise;
    }

    public Expert expertise(String expertise) {
        this.expertise = expertise;
        return this;
    }

    public void setExpertise(String expertise) {
        this.expertise = expertise;
    }

    public User getUserId() {
        return userId;
    }

    public Expert userId(User user) {
        this.userId = user;
        return this;
    }

    public void setUserId(User user) {
        this.userId = user;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Expert)) {
            return false;
        }
        return id != null && id.equals(((Expert) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Expert{" +
            "id=" + getId() +
            ", picture='" + getPicture() + "'" +
            ", pictureContentType='" + getPictureContentType() + "'" +
            ", expertise='" + getExpertise() + "'" +
            "}";
    }
}
