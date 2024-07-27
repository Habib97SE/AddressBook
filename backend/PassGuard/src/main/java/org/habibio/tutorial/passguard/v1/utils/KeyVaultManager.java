package org.habibio.tutorial.passguard.v1.utils;

import com.azure.identity.DefaultAzureCredentialBuilder;
import com.azure.security.keyvault.keys.KeyClient;
import com.azure.security.keyvault.keys.KeyClientBuilder;
import com.azure.security.keyvault.keys.models.CreateRsaKeyOptions;
import com.azure.security.keyvault.keys.models.KeyVaultKey;
import com.azure.security.keyvault.keys.models.KeyType;
import io.github.cdimascio.dotenv.Dotenv;
import org.habibio.tutorial.passguard.v1.config.EnvironmentVariableReader;
import org.springframework.beans.factory.annotation.Autowired;

public class KeyVaultManager {

    private final KeyClient keyClient;


    public KeyVaultManager(String keyVaultUrl) {
        this.keyClient = new KeyClientBuilder()
                .vaultUrl(keyVaultUrl)
                .credential(new DefaultAzureCredentialBuilder().build())
                .buildClient();
    }

    public KeyVaultManager () {
        String keyVaultUrl = "https://pass-guard-private-key.vault.azure.net";
        this.keyClient = new KeyClientBuilder()
                .vaultUrl(keyVaultUrl)
                .credential(new DefaultAzureCredentialBuilder().build())
                .buildClient();
    }

    public KeyVaultKey createRsaKey(String keyName, int keySize) {
        CreateRsaKeyOptions options = new CreateRsaKeyOptions(keyName)
                .setKeySize(keySize);
        return keyClient.createRsaKey(options);
    }

    public void deleteKey(String keyName) {
        keyClient.beginDeleteKey(keyName).poll();
    }

    public KeyVaultKey getKey(String keyName) {
        return keyClient.getKey(keyName);
    }

    public void updateKey(KeyVaultKey key) {
        keyClient.updateKeyProperties(key.getProperties());
    }
}
