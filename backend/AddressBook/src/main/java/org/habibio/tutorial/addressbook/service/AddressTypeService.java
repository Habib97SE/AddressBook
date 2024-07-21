package org.habibio.tutorial.addressbook.service;

import org.habibio.tutorial.addressbook.entity.AddressType;
import org.habibio.tutorial.addressbook.repository.AddressTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AddressTypeService {

    @Autowired
    private AddressTypeRepository addressTypeRepository;

    public AddressTypeService(AddressTypeRepository addressTypeRepository) {
        this.addressTypeRepository = addressTypeRepository;
    }

    public List<AddressType> findAll() {
        return addressTypeRepository.findAll();
    }

    public AddressType findById(Long addressTypeId) {
        if (addressTypeId < 0) return null;
        return addressTypeRepository.findById(addressTypeId).orElse(null);
    }

    public AddressType createAddressType(AddressType addressType) {
        return addressTypeRepository.save(addressType);
    }

    public AddressType updateAddressType(Long addressTypeId, AddressType addressType) {
        if (addressTypeId < 0) return null;
        AddressType addressTypeToUpdate = addressTypeRepository.findById(addressTypeId).orElse(null);
        if (addressTypeToUpdate == null) return null;
        addressTypeToUpdate.setId(addressType.getId());
        addressTypeToUpdate.setName(addressType.getName());
        addressTypeToUpdate.setDescription(addressType.getDescription());
        addressTypeToUpdate.setIcon(addressType.getIcon());
        return addressTypeRepository.save(addressTypeToUpdate);
    }

    public Boolean deleteAddressType(Long addressTypeId) {
        try {
            if (addressTypeId < 0) return null;
            AddressType addressType = addressTypeRepository.findById(addressTypeId).orElse(null);
            if (addressType == null) return null;
            addressTypeRepository.delete(addressType);
            return true;
        } catch (Exception ex) {
            System.out.println(ex.getMessage());
            return false;
        }
    }



}
