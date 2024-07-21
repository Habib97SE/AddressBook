package org.habibio.tutorial.addressbook.service;

import org.habibio.tutorial.addressbook.DTO.AddressRequest;
import org.habibio.tutorial.addressbook.entity.Address;
import org.habibio.tutorial.addressbook.repository.AddressRepository;
import org.habibio.tutorial.addressbook.utils.Validation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AddressService {

    @Autowired
    private AddressRepository addressRepository;

    private final Validation validation = new Validation();

    public AddressService(AddressRepository addressRepository) {
        this.addressRepository = addressRepository;
    }

    public List<Address> findAll() {
        return addressRepository.findAll();
    }

    public Address findById(Long addressId) {
        if (addressId < 0) return null;
        return addressRepository.findById(addressId).orElse(null);
    }

    public Address createAddress(AddressRequest addressRequest) {
        Address address = new Address();
        // validating addressRequest object
        if (!validation.isAddressRequestValid(addressRequest)) return null;

        address.setAddressOne(addressRequest.getAddressOne());
        address.setAddressTwo(addressRequest.getAddressTwo());
        address.setPostalCode(addressRequest.getPostalCode());
        address.setCity(addressRequest.getCity());
        address.setState(addressRequest.getState());
        address.setCountry(addressRequest.getCountry());
        address.setPhoneNumber(addressRequest.getPhoneNumber());

        return addressRepository.save(address);
    }

    public Address updateAddress(Long addressId, AddressRequest addressRequest) {
        // if addressId is less than 0, return null
        if (addressId < 0) return null;

        // if addressRequest object is not valid, return null
        if (!validation.isAddressRequestValid(addressRequest)) return null;

        Address address = addressRepository.findById(addressId).orElse(null);
        if (address == null) return null;
        address.setAddressOne(addressRequest.getAddressOne());
        address.setAddressTwo(addressRequest.getAddressTwo());
        address.setPostalCode(addressRequest.getPostalCode());
        address.setCity(addressRequest.getCity());
        address.setState(addressRequest.getState());
        address.setCountry(addressRequest.getCountry());
        address.setPhoneNumber(addressRequest.getPhoneNumber());
        return addressRepository.save(address);
    }

    public Boolean deleteAddress(Long addressId) {
        try {
            if (addressId < 0) return null;
            Address address = addressRepository.findById(addressId).orElse(null);
            if (address == null) return null;
            addressRepository.delete(address);
            return true;
        } catch (Exception ex) {
            System.out.println(ex.getMessage());
            return false;
        }
    }
}

