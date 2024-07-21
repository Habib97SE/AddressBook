package org.habibio.tutorial.addressbook.controller;

import org.habibio.tutorial.addressbook.DTO.UserRequest;
import org.habibio.tutorial.addressbook.entity.User;
import org.habibio.tutorial.addressbook.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/users")
public class UserController {

    @Autowired
    private UserService userService;

    public UserController(UserService userService) {
        super();
        this.userService = userService;
    }

    @GetMapping({"", "/"})
    public List<User> getUsers() {
        return userService.findAll();
    }

    @GetMapping({"/{id}", "/{id}/"})
    public User getUserById(@PathVariable Long id) {
        return userService.findById(id);
    }

    @PostMapping({"", "/"})
    public User createUser(@RequestBody UserRequest userRequest) {
        return userService.createUser(userRequest);
    }

    @PutMapping({"/{id}", "/{id}/"})
    public User updateUser(@PathVariable Long id, @RequestBody User user) {
        return userService.updateUser(id, user);
    }

    @DeleteMapping({"/{id}", "/{id}/"})
    public Boolean deleteUser(@PathVariable Long id) {
        return userService.deleteUser(id);
    }

}
