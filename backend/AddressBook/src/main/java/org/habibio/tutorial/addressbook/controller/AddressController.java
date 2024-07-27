package org.habibio.tutorial.addressbook.controller;

import org.habibio.tutorial.addressbook.DTO.AddressRequest;
import org.habibio.tutorial.addressbook.DTO.AddressResponse;
import org.habibio.tutorial.addressbook.entity.Address;
import org.habibio.tutorial.addressbook.service.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5500")
@RestController
@RequestMapping("api/v1/addresses")
public class AddressController {

    @Autowired
    private AddressService addressService;

    public AddressController(AddressService addressService) {
        super();
        this.addressService = addressService;
    }


    @GetMapping({"", "/"})
    public List<AddressResponse> getAddresses() {
        return addressService.findAll();
    }

    @GetMapping({"/{id}", "/{id}/"})
    public Address getAddressById(@PathVariable Long id) {
        return addressService.findById(id);
    }

    @GetMapping({"/search/{phrase}", "/search/{phrase}/"})
    public List<AddressResponse> searchAddresses(@PathVariable String phrase) {
        return addressService.searchAddresses(phrase);
    }

    @PostMapping({"", "/"})
    public Address createAddress(@RequestBody AddressRequest addressRequest) {
        return addressService.createAddress(addressRequest);
    }

    @PutMapping({"/{id}", "/{id}/"})
    public Address updateAddress(@PathVariable Long id, @RequestBody AddressRequest addressRequest) {
        return addressService.updateAddress(id, addressRequest);
    }

    @DeleteMapping({"/{id}", "/{id}/"})
    public Boolean deleteAddress(@PathVariable Long id) {
        return addressService.deleteAddress(id);
    }
}
