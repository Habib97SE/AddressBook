package org.habibio.tutorial.addressbook.service;

import org.habibio.tutorial.addressbook.DTO.AddressRequest;
import org.habibio.tutorial.addressbook.DTO.AddressResponse;
import org.habibio.tutorial.addressbook.entity.Address;
import org.habibio.tutorial.addressbook.entity.AddressType;
import org.habibio.tutorial.addressbook.entity.User;
import org.habibio.tutorial.addressbook.repository.AddressRepository;
import org.habibio.tutorial.addressbook.repository.AddressTypeRepository;
import org.habibio.tutorial.addressbook.repository.UserRepository;
import org.habibio.tutorial.addressbook.utils.Validation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;

@Service
public class AddressService {

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AddressTypeRepository addressTypeRepository;


    private final Validation validation = new Validation();

    public AddressService(AddressRepository addressRepository) {
        this.addressRepository = addressRepository;
    }

    public List<AddressResponse> findAll() {
        List<Address> addresses = addressRepository.findAll();
        List<AddressResponse> addressResponses = new LinkedList<>();
        for (Address address : addresses) {
            AddressResponse addressResponse = new AddressResponse();
            addressResponse.setId(address.getId());
            addressResponse.setAddress(address.getAddressOne() + " " + address.getAddressTwo() + " " + address.getCity() + " " + address.getState() + " " + address.getCountry());
            addressResponse.setEmail(address.getUser().getEmail());
            addressResponse.setPhoneNumber(address.getPhoneNumber());
            addressResponse.setFullName(address.getUser().getFirstName() + " " + address.getUser().getLastName());
            addressResponses.add(addressResponse);
        }
        return addressResponses;
    }

    public List<AddressResponse> searchAddresses(String phrase) {
        List<Address> addresses = addressRepository.searchAddresses(phrase);
        List<AddressResponse> addressResponses = new LinkedList<>();
        for (Address address : addresses) {
            AddressResponse addressResponse = new AddressResponse();
            addressResponse.setId(address.getId());
            addressResponse.setAddress(address.getAddressOne() + " " + address.getAddressTwo() + " " + address.getCity() + " " + address.getState() + " " + address.getCountry());
            addressResponse.setEmail(address.getUser().getEmail());
            addressResponse.setPhoneNumber(address.getPhoneNumber());
            addressResponse.setFullName(address.getUser().getFirstName() + " " + address.getUser().getLastName());
            addressResponses.add(addressResponse);
        }
        return addressResponses;
    }

    public Address findById(Long addressId) {
        if (addressId < 0) return null;
        return addressRepository.findById(addressId).orElse(null);
    }

    public Address createAddress(AddressRequest addressRequest) {
        try {
            Address address = new Address();
            // validating addressRequest object
            if (!validation.isAddressRequestValid(addressRequest)) return null;
            System.err.println("Address Request: ");
            address.setAddressOne(addressRequest.getAddressOne());
            address.setAddressTwo(addressRequest.getAddressTwo());
            address.setPostalCode(addressRequest.getPostalCode());
            address.setCity(addressRequest.getCity());
            address.setState(addressRequest.getState());
            address.setCountry(addressRequest.getCountry());
            address.setPhoneNumber(addressRequest.getPhoneNumber());

            User user = userRepository.findById(addressRequest.getUserId()).orElse(null);

            if (user == null) {
                System.err.println("User not found");
                return null;
            }

            address.setUser(user);

            AddressType addressType = addressTypeRepository.findById(addressRequest.getAddressTypeId()).orElse(null);

            if (addressType == null) {
                System.err.println("Address Type not found");
                return null;
            }

            address.setAddressType(addressType);
            System.err.print("Address: ");
            System.err.println(address.toString());
            return addressRepository.save(address);
        } catch (Exception ex) {
            System.err.println(ex.getMessage());
            return null;
        }
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

