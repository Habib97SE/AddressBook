package org.habibio.tutorial.passguard.v1.config;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class EnvironmentVariableReader {
    private final Dotenv dotenv;

    @Autowired
    public EnvironmentVariableReader(Dotenv dotenv) {
        this.dotenv = dotenv;
    }

    public String getPrivateKey() {
        return dotenv.get("PRIVATE_KEY");
    }

    public String getPublicKey() {
        return dotenv.get("PUBLIC_KEY");
    }

    public String getKeyVaultUrl() {
        return dotenv.get("KEY_VAULT_URL");
    }

}

