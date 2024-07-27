package org.habibio.tutorial.passguard.v1.controller;

import org.habibio.tutorial.passguard.v1.DTO.PasswordRequest;
import org.habibio.tutorial.passguard.v1.config.EnvironmentVariableReader;
import org.habibio.tutorial.passguard.v1.entity.Password;
import org.habibio.tutorial.passguard.v1.service.PasswordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/passwords")
public class PasswordController {

    @Autowired
    private PasswordService passwordService;

    public PasswordController(PasswordService passwordService) {
        super();
        this.passwordService = passwordService;
    }

    @GetMapping({"/", ""})
    public List<Password> getPassword() throws Exception {
        return passwordService.getAllPasswords();
    }

    @GetMapping("/{id}")
    public Password getPasswordById(@PathVariable Long id) throws Exception {
        if (id == null) throw new Exception("Id is required");
        if (id < 0) throw new Exception("Id must be greater than 0");
        return passwordService.getPassword(id);
    }

    @PostMapping({"/", ""})
    public Password createPassword(@RequestBody PasswordRequest passwordRequest) throws Exception {
        System.out.println("Hello, world!");
        if (passwordRequest == null) throw new Exception("Password request is required");
        if (passwordRequest.getWebsite() == null) throw new Exception("Website is required");
        if (passwordRequest.getUsername() == null) throw new Exception("Username is required");
        if (passwordRequest.getPassword() == null) throw new Exception("Password is required");
        return passwordService.savePassword(passwordRequest);
    }

    @PutMapping("/{id}")
    public Password updatePassword(@PathVariable Long id, @RequestBody PasswordRequest passwordRequest) throws Exception {
        if (id == null) throw new Exception("Id is required");
        if (id < 0) throw new Exception("Id must be greater than 0");
        if (passwordRequest == null) throw new Exception("Password request is required");
        if (passwordRequest.getWebsite() == null) throw new Exception("Website is required");
        if (passwordRequest.getUsername() == null) throw new Exception("Username is required");
        if (passwordRequest.getPassword() == null) throw new Exception("Password is required");
        return passwordService.updatePassword(id, passwordRequest);
    }

    @DeleteMapping("/{id}")
    public void deletePassword(@PathVariable Long id) throws Exception {
        if (id == null) throw new Exception("Id is required");
        if (id < 0) throw new Exception("Id must be greater than 0");
        passwordService.deletePassword(id);
    }

}
