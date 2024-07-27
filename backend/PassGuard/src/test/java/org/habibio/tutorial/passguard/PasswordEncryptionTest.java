package org.habibio.tutorial.passguard;

import org.junit.jupiter.api.Test;
import org.habibio.tutorial.passguard.v1.utils.RSAEncryptionUtil;
import org.habibio.tutorial.passguard.v1.utils.KeyGenerator;
import org.habibio.tutorial.passguard.v1.config.EnvironmentVariableReader;
import org.springframework.beans.factory.annotation.Autowired;
import org.habibio.tutorial.passguard.v1.utils.KeyVaultManager;

public class PasswordEncryptionTest {



    @Test
    public void testEncryptDecrypt() {
        try {
            KeyGenerator keyGenerator = new KeyGenerator();
            String publicKey = keyGenerator.getPublicKey();
            String privateKey = keyGenerator.getPrivateKey();

            System.out.println("Public Key: " + publicKey);
            System.out.println("====================================");
            System.out.println("Private Key: " + privateKey);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Test
    public void testAzureKeyVault () {
        KeyVaultManager keyVaultManager = new KeyVaultManager();
        keyVaultManager.createRsaKey("test-key", 2048);
        keyVaultManager.getKey("test-key");

    }

}
