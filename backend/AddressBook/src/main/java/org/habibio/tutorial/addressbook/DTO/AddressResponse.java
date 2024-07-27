package org.habibio.tutorial.addressbook.DTO;

import java.util.Objects;

public class AddressResponse {

    private Long id;
    private String address;
    private String email;
    private String phoneNumber;
    private String fullName;

    public AddressResponse() {
    }

    public AddressResponse(Long id, String address, String email, String phoneNumber, String fullName) {
        this.id = id;
        this.address = address;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.fullName = fullName;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        AddressResponse that = (AddressResponse) o;
        return Objects.equals(id, that.id) && Objects.equals(address, that.address) && Objects.equals(email, that.email) && Objects.equals(phoneNumber, that.phoneNumber) && Objects.equals(fullName, that.fullName);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, address, email, phoneNumber, fullName);
    }

    @Override
    public String toString() {
        return "AddressResponse{" +
                "id=" + id +
                ", address='" + address + '\'' +
                ", email='" + email + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", fullName='" + fullName + '\'' +
                '}';
    }
}
