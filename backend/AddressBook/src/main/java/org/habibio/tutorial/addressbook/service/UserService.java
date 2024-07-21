package org.habibio.tutorial.addressbook.service;

import org.habibio.tutorial.addressbook.DTO.UserRequest;
import org.habibio.tutorial.addressbook.entity.User;
import org.habibio.tutorial.addressbook.repository.UserRepository;
import org.habibio.tutorial.addressbook.utils.Validation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    private Validation validation = new Validation();

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> findAll() {
        return userRepository.findAll();
    }

    public User findById(Long userId) {
        if (userId < 0) return null;
        return userRepository.findById(userId).orElse(null);
    }

    public User createUser(UserRequest userRequest) {
        User user = new User();
        if (!validation.isUserRequestValid(userRequest)) return null;
        user.setFirstName(userRequest.getFirstName());
        user.setLastName(userRequest.getLastName());
        user.setEmail(userRequest.getEmail());
        user.setMobilePhone(userRequest.getMobilePhone());
        return userRepository.save(user);
    }

    public User updateUser(Long userId, UserRequest userRequest) {
        if (userId < 0) return null;
        User user = userRepository.findById(userId).orElse(null);
        if (user == null) return null;
        if (!validation.isUserRequestValid(userRequest)) return null;
        user.setFirstName(userRequest.getFirstName());
        user.setLastName(userRequest.getLastName());
        user.setEmail(userRequest.getEmail());
        user.setMobilePhone(userRequest.getMobilePhone());
        return userRepository.save(user);
    }

    public Boolean deleteUser(Long userId) {
        try {
            if (userId < 0) return null;
            User user = userRepository.findById(userId).orElse(null);
            if (user == null) return null;
            userRepository.delete(user);
            return true;
        } catch (Exception ex) {
            System.out.println(ex.getMessage());
            return false;
        }
    }


}
