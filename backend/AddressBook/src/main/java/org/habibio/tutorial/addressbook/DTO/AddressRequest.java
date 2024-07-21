package org.habibio.tutorial.addressbook.DTO;

import java.util.Objects;

public class AddressRequest {
    private String addressOne;
    private String addressTwo;
    private String postalCode;
    private String city;
    private String state;
    private String country;
    private String phoneNumber;

    public AddressRequest() {
    }

    public AddressRequest(String addressOne, String addressTwo, String postalCode, String city, String state, String country, String phoneNumber) {
        this.addressOne = addressOne;
        this.addressTwo = addressTwo;
        this.postalCode = postalCode;
        this.city = city;
        this.state = state;
        this.country = country;
        this.phoneNumber = phoneNumber;
    }

    public String getAddressOne() {
        return addressOne;
    }

    public void setAddressOne(String addressOne) {
        this.addressOne = addressOne;
    }

    public String getAddressTwo() {
        return addressTwo;
    }

    public void setAddressTwo(String addressTwo) {
        this.addressTwo = addressTwo;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        AddressRequest that = (AddressRequest) o;
        return Objects.equals(addressOne, that.addressOne) && Objects.equals(addressTwo, that.addressTwo) && Objects.equals(postalCode, that.postalCode) && Objects.equals(city, that.city) && Objects.equals(state, that.state) && Objects.equals(country, that.country) && Objects.equals(phoneNumber, that.phoneNumber);
    }

    @Override
    public int hashCode() {
        return Objects.hash(addressOne, addressTwo, postalCode, city, state, country, phoneNumber);
    }

    @Override
    public String toString() {
        return "AddressRequest{" +
                "addressOne='" + addressOne + '\'' +
                ", addressTwo='" + addressTwo + '\'' +
                ", postalCode='" + postalCode + '\'' +
                ", city='" + city + '\'' +
                ", state='" + state + '\'' +
                ", country='" + country + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                '}';
    }
}
