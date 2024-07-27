package org.habibio.tutorial.passguard.v1.entity;

import jakarta.persistence.*;

import java.util.Date;
import java.util.Objects;

@Entity
public class Password {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String website;

    @Column(nullable = false)
    private String username;

    @Column(nullable = false, length = 4096)
    private String password;

    @Column(nullable = false)
    private Date createdAt;

    @Column(nullable = true)
    private Date updatedAt;

    public Password() {
    }

    public Password(String website, String username, String password) {
        this.website = website;
        this.username = username;
        this.password = password;
        this.createdAt = new Date();
    }

    @PrePersist
    protected void onCreate() {
        createdAt = new Date();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = new Date();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getWebsite() {
        return website;
    }

    public void setWebsite(String website) {
        this.website = website;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Date getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Password password1 = (Password) o;
        return Objects.equals(id, password1.id) && Objects.equals(website, password1.website) && Objects.equals(username, password1.username) && Objects.equals(password, password1.password) && Objects.equals(createdAt, password1.createdAt) && Objects.equals(updatedAt, password1.updatedAt);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, website, username, password, createdAt, updatedAt);
    }

    @Override
    public String toString() {
        return "Password{" +
                "id=" + id +
                ", website='" + website + '\'' +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                '}';
    }
}
