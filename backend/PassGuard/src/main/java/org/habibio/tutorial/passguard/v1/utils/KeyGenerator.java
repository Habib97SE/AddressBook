package org.habibio.tutorial.passguard.v1.utils;

import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.util.Base64;

public class KeyGenerator {
    private PublicKey publicKey;
    private PrivateKey privateKey;

    public KeyGenerator() throws Exception {
        KeyPairGenerator keyGen = KeyPairGenerator.getInstance("RSA");
        keyGen.initialize(2048);
        KeyPair pair = keyGen.generateKeyPair();
        this.publicKey = pair.getPublic();
        this.privateKey = pair.getPrivate();
    }

    public String getPublicKey() {
        return Base64.getEncoder().encodeToString(publicKey.getEncoded());
    }

    public String getPrivateKey() {
        return Base64.getEncoder().encodeToString(privateKey.getEncoded());
    }

    public PublicKey getPublicKeyObject() {
        return publicKey;
    }

    public PrivateKey getPrivateKeyObject() {
        return privateKey;
    }

}
