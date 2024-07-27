package org.habibio.tutorial.passguard.v1.service;

import org.habibio.tutorial.passguard.v1.DTO.PasswordRequest;
import org.habibio.tutorial.passguard.v1.config.EnvironmentVariableReader;
import org.habibio.tutorial.passguard.v1.entity.Password;
import org.habibio.tutorial.passguard.v1.repository.PasswordRepository;
import org.habibio.tutorial.passguard.v1.utils.RSAEncryptionUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.PrivateKey;
import java.security.PublicKey;
import java.util.List;

@Service
public class PasswordService {

    private static final Logger logger = LoggerFactory.getLogger(PasswordService.class);

    @Autowired
    private PasswordRepository passwordRepository;

    @Autowired
    private EnvironmentVariableReader environmentVariableReader;


    public PasswordService(
            PasswordRepository passwordRepository,
            EnvironmentVariableReader environmentVariableReader) {
        this.passwordRepository = passwordRepository;
        this.environmentVariableReader = environmentVariableReader;
    }

    private PublicKey getPublicKey() throws Exception {
        try {
            return RSAEncryptionUtil.getPublicKeyFromString(environmentVariableReader.getPublicKey());
        } catch (Exception e) {
            throw new Exception("Error getting public key");
        }
    }

    private PrivateKey getPrivateKey() throws Exception {
        try {
            return RSAEncryptionUtil.getPrivateKeyFromString(environmentVariableReader.getPrivateKey());
        } catch (Exception e) {
            throw new Exception("Error getting private key");
        }
    }

    private String encryptPassword(String password) throws Exception {
        try {
            return RSAEncryptionUtil.encrypt(password, getPublicKey());
        } catch (Exception e) {
            throw new Exception("Error encrypting password");
        }
    }

    private String decryptPassword(String password) throws Exception {
        try {
            return RSAEncryptionUtil.decrypt(password, getPrivateKey());
        } catch (Exception e) {
            throw new Exception("Error decrypting password");
        }
    }

    /**
     * Save password to database
     *
     * @param passwordRequest Password request object
     * @return Password object saved to database with encrypted password field, or throws exception
     * @throws Exception If any of the following conditions are met:
     *                    <ul>
     *                        <li>Password request is null</li>
     *                        <li>Website is null</li>
     *                        <li>Username is null</li>
     *                        <li>Password is null</li>
     *                   </ul>
     */
    public Password savePassword(PasswordRequest passwordRequest) throws Exception {
        try {
            if (passwordRequest == null) throw new Exception("Password request is required");
            if (passwordRequest.getWebsite() == null) throw new Exception("Website is required");
            if (passwordRequest.getUsername() == null) throw new Exception("Username is required");
            if (passwordRequest.getPassword() == null) throw new Exception("Password is required");

            Password password = new Password();
            password.setWebsite(passwordRequest.getWebsite());
            password.setUsername(passwordRequest.getUsername());
            password.setPassword(encryptPassword(passwordRequest.getPassword()));
            return passwordRepository.save(password);
        } catch (Exception e) {
            throw new Exception("Error saving password: " + e.getMessage(), e); // Include the original exception
        }
    }

    public Password getPassword(Long id) throws Exception {
        try {
            Password password = passwordRepository.findById(id).orElseThrow(() -> new Exception("Password not found"));
            password.setPassword(decryptPassword(password.getPassword()));
            return password;
        } catch (Exception e) {
            throw new Exception("Error getting password");
        }
    }

    public List<Password> getAllPasswords() throws Exception {
        try {
            List<Password> passwords = passwordRepository.findAll();
            for (Password password : passwords) {
                password.setPassword(decryptPassword(password.getPassword()));
            }
            return passwords;
        } catch (Exception e) {
            throw new Exception("Error getting passwords");
        }
    }

    public Password updatePassword(Long id, PasswordRequest passwordRequest) throws Exception {
        try {
            if (id == null) throw new Exception("Id is required");
            if (id < 0) throw new Exception("Id must be greater than 0");
            if (passwordRequest == null) throw new Exception("Password request is required");
            if (passwordRequest.getWebsite() == null) throw new Exception("Website is required");
            if (passwordRequest.getUsername() == null) throw new Exception("Username is required");
            if (passwordRequest.getPassword() == null) throw new Exception("Password is required");

            Password password = passwordRepository.findById(id).orElseThrow(() -> new Exception("Password not found"));
            password.setWebsite(passwordRequest.getWebsite());
            password.setUsername(passwordRequest.getUsername());
            password.setPassword(encryptPassword(passwordRequest.getPassword()));
            return passwordRepository.save(password);
        } catch (Exception e) {
            throw new Exception("Error updating password");
        }
    }

    public void deletePassword(Long id) throws Exception {
        try {
            passwordRepository.deleteById(id);
        } catch (Exception e) {
            throw new Exception("Error deleting password");
        }
    }
}
