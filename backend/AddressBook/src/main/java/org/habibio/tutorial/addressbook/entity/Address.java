package org.habibio.tutorial.addressbook.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.PastOrPresent;

import java.util.Date;
import java.util.Objects;

@Entity
@Table(name = "addresses")
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    @NotBlank(message = "The address1 cannot be left empty")
    private String addressOne;

    @Column(nullable = true)
    @NotBlank(message = "The address2 cannot be left empty")
    private String addressTwo;

    @Column(nullable = false)
    @NotBlank(message = "The postal code cannot be left empty")
    private String postalCode;

    @Column(nullable = false)
    @NotBlank(message = "The city cannot be left empty")
    private String city;

    @Column(nullable = true)
    private String state;

    @Column(nullable = false)
    @NotBlank(message = "The country cannot be left empty")
    private String country;

    @Column(nullable = true)
    private String phoneNumber;


    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JsonBackReference
    private User user;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    private AddressType addressType;

    @Column(nullable = false)
    @PastOrPresent(message = "Invalid createdAt date")
    private Date createdAt;

    @Column(nullable = true)
    @PastOrPresent(message = "Invalid updatedAt date")
    private Date updatedAt;

    public Address() {

    }

    public Address(String addressOne, String addressTwo, String postalCode, String city, String state, String country, String phoneNumber) {
        this.addressOne = addressOne.toLowerCase().trim();
        this.addressTwo = addressTwo.toLowerCase().trim();
        this.postalCode = postalCode.toLowerCase().trim();
        this.city = city.toLowerCase().trim();
        this.state = state.toLowerCase().trim();
        this.country = country.toLowerCase().trim();
        this.phoneNumber = phoneNumber.toLowerCase().trim();
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

    public @NotBlank(message = "The address1 cannot be left empty") String getAddressOne() {
        return addressOne;
    }

    public void setAddressOne(@NotBlank(message = "The address1 cannot be left empty") String addressOne) {
        this.addressOne = addressOne.toLowerCase().trim();
    }

    public @NotBlank(message = "The address2 cannot be left empty") String getAddressTwo() {
        return addressTwo;
    }

    public void setAddressTwo(@NotBlank(message = "The address2 cannot be left empty") String addressTwo) {
        this.addressTwo = addressTwo.toLowerCase().trim();
    }

    public @NotBlank(message = "The postal code cannot be left empty") String getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(@NotBlank(message = "The postal code cannot be left empty") String postalCode) {
        this.postalCode = postalCode.toLowerCase().trim();
    }

    public @NotBlank(message = "The city cannot be left empty") String getCity() {
        return city;
    }

    public void setCity(@NotBlank(message = "The city cannot be left empty") String city) {
        this.city = city.toLowerCase().trim();
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state.toLowerCase().trim();
    }

    public @NotBlank(message = "The country cannot be left empty") String getCountry() {
        return country;
    }

    public void setCountry(@NotBlank(message = "The country cannot be left empty") String country) {
        this.country = country.toLowerCase().trim();
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber.toLowerCase().trim();
    }

    public @PastOrPresent(message = "Invalid createdAt date") Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(@PastOrPresent(message = "Invalid createdAt date") Date createdAt) {
        this.createdAt = createdAt;
    }

    public @PastOrPresent(message = "Invalid updatedAt date") Date getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(@PastOrPresent(message = "Invalid updatedAt date") Date updatedAt) {
        this.updatedAt = updatedAt;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Address address = (Address) o;
        return Objects.equals(id, address.id) && Objects.equals(addressOne, address.addressOne) && Objects.equals(addressTwo, address.addressTwo) && Objects.equals(postalCode, address.postalCode) && Objects.equals(city, address.city) && Objects.equals(state, address.state) && Objects.equals(country, address.country) && Objects.equals(phoneNumber, address.phoneNumber) && Objects.equals(createdAt, address.createdAt) && Objects.equals(updatedAt, address.updatedAt);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, addressOne, addressTwo, postalCode, city, state, country, phoneNumber, createdAt, updatedAt);
    }

    @Override
    public String toString() {
        return "Address{" +
                "id=" + id +
                ", addressOne='" + addressOne + '\'' +
                ", addressTwo='" + addressTwo + '\'' +
                ", postalCode='" + postalCode + '\'' +
                ", city='" + city + '\'' +
                ", state='" + state + '\'' +
                ", country='" + country + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                '}';
    }
}
