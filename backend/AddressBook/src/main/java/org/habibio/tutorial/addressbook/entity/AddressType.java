package org.habibio.tutorial.addressbook.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

import java.util.Date;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "addresstypes")
public class AddressType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    @NotBlank(message = "The name cannot be left empty.")
    private String name;

    @Column(nullable = false)
    @NotBlank(message = "The description cannot be left empty.")
    private String description;

    @Column(nullable = false)
    @NotBlank(message = "The icon cannot be left empty.")
    private String icon;

    @OneToMany(mappedBy = "addressType", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Address> addresses;

    @Column(nullable = false)
    @NotBlank(message = "The createdAt cannot be left empty.")
    private Date createdAt;

    @Column(nullable = true)
    private Date updatedAt;

    public AddressType() {
    }

    public AddressType(String name, String description, String icon) {
        this.name = name.toLowerCase().trim();
        this.description = description.toLowerCase().trim();
        this.icon = icon;
    }

    @PrePersist
    public void onCreate() {
        this.createdAt = new Date();
    }

    @PreUpdate
    public void onUpdate() {
        this.updatedAt = new Date();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public @NotBlank(message = "The name cannot be left empty.") String getName() {
        return name;
    }

    public void setName(@NotBlank(message = "The name cannot be left empty.") String name) {
        this.name = name.toLowerCase().trim();
    }

    public @NotBlank(message = "The description cannot be left empty.") String getDescription() {
        return description;
    }

    public void setDescription(@NotBlank(message = "The description cannot be left empty.") String description) {
        this.description = description.toLowerCase().trim();
    }

    public @NotBlank(message = "The icon cannot be left empty.") String getIcon() {
        return icon;
    }

    public void setIcon(@NotBlank(message = "The icon cannot be left empty.") String icon) {
        this.icon = icon;
    }

    public @NotBlank(message = "The createdAt cannot be left empty.") Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(@NotBlank(message = "The createdAt cannot be left empty.") Date createdAt) {
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
        AddressType that = (AddressType) o;
        return Objects.equals(id, that.id) && Objects.equals(name, that.name) && Objects.equals(description, that.description) && Objects.equals(icon, that.icon) && Objects.equals(createdAt, that.createdAt) && Objects.equals(updatedAt, that.updatedAt);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, description, icon, createdAt, updatedAt);
    }

    @Override
    public String toString() {
        return "AddressType{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", icon='" + icon + '\'' +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                '}';
    }
}
