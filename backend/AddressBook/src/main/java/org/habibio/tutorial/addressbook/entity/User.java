package org.habibio.tutorial.addressbook.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;

import java.util.Date;
import java.util.List;
import java.util.Objects;


@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    @NotEmpty(message = "The first name cannot be left empty.")
    private String firstName;

    @Column(nullable = false)
    @NotEmpty(message = "The last name cannot be left empty.")
    private String lastName;

    @Column(nullable = false)
    @NotEmpty(message = "The email address cannot be left empty.")
    @Email(message = "Email should be a valid email address")
    private String email;

    @Column(nullable = false)
    @NotEmpty(message = "The mobile phone number cannot be left empty.")
    private String mobilePhone;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Address> addresses;

    @Column(nullable = false)
    @PastOrPresent(message = "Invalid createdAt date")
    private Date createdAt;

    @Column(nullable = true)
    private Date updatedAt;

    public User() {
    }

    public User(String firstName, String lastName, String email, String mobilePhone) {
        this.firstName = firstName.toLowerCase().trim();
        this.lastName = lastName.toLowerCase().trim();
        this.email = email.toLowerCase().trim();
        this.mobilePhone = mobilePhone.toLowerCase().trim();
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

    public @NotEmpty(message = "The first name cannot be left empty.") String getFirstName() {
        return firstName;
    }

    public void setFirstName(@NotEmpty(message = "The first name cannot be left empty.") String firstName) {
        this.firstName = firstName.toLowerCase().trim();
    }

    public @NotEmpty(message = "The last name cannot be left empty.") String getLastName() {
        return lastName;
    }

    public void setLastName(@NotEmpty(message = "The last name cannot be left empty.") String lastName) {
        this.lastName = lastName.toLowerCase().trim();
    }

    public @NotEmpty(message = "The email address cannot be left empty.") @Email(message = "Email should be a valid email address") String getEmail() {
        return email;
    }

    public void setEmail(@NotEmpty(message = "The email address cannot be left empty.") @Email(message = "Email should be a valid email address") String email) {
        this.email = email.toLowerCase().trim();
    }

    public @NotEmpty(message = "The mobile phone number cannot be left empty.") String getMobilePhone() {
        return mobilePhone;
    }

    public void setMobilePhone(@NotEmpty(message = "The mobile phone number cannot be left empty.") String mobilePhone) {
        this.mobilePhone = mobilePhone.toLowerCase().trim();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return Objects.equals(id, user.id) && Objects.equals(firstName, user.firstName) && Objects.equals(lastName, user.lastName) && Objects.equals(email, user.email) && Objects.equals(mobilePhone, user.mobilePhone) && Objects.equals(createdAt, user.createdAt) && Objects.equals(updatedAt, user.updatedAt);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, firstName, lastName, email, mobilePhone, createdAt, updatedAt);
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", email='" + email + '\'' +
                ", mobilePhone='" + mobilePhone + '\'' +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                '}';
    }
}
