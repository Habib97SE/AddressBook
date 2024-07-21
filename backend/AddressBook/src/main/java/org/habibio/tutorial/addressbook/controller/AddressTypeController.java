package org.habibio.tutorial.addressbook.controller;

import org.habibio.tutorial.addressbook.entity.AddressType;
import org.habibio.tutorial.addressbook.service.AddressTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/address-types")
public class AddressTypeController {

    @Autowired
    private AddressTypeService addressTypeService;

    public AddressTypeController(AddressTypeService addressTypeService) {
        super();
        this.addressTypeService = addressTypeService;
    }

    @GetMapping({"", "/"})
    public List<AddressType> getAddressTypes() {
        return addressTypeService.findAll();
    }

    @GetMapping({"/{id}", "/{id}/"})
    public AddressType getAddressTypeById(Long id) {
        return addressTypeService.findById(id);
    }

    @PostMapping({"", "/"})
    public AddressType createAddressType(@Validated @RequestBody AddressType addressType) {
        return addressTypeService.createAddressType(addressType);
    }

    @PutMapping({"/{id}", "/{id}/"})
    public AddressType updateAddressType(@PathVariable Long id, @Validated @RequestBody AddressType addressType) {
        return addressTypeService.updateAddressType(id, addressType);
    }

    @DeleteMapping({"/{id}", "/{id}/"})
    public Boolean deleteAddressType(@PathVariable Long id) {
        return addressTypeService.deleteAddressType(id);
    }
}
