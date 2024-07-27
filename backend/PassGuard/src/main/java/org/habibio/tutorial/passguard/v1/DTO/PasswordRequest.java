package org.habibio.tutorial.passguard.v1.DTO;

import java.util.Objects;

public class PasswordRequest {
    private String website;
    private String username;
    private String password;

    public PasswordRequest() {
        super();
    }

    public PasswordRequest(String website, String username, String password) {
        super();
        this.website = website;
        this.username = username;
        this.password = password;
    }

    public String getWebsite() {
        return website;
    }

    public void setWebsite(String website) {
        this.website = website;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PasswordRequest that = (PasswordRequest) o;
        return Objects.equals(website, that.website) && Objects.equals(username, that.username) && Objects.equals(password, that.password);
    }

    @Override
    public int hashCode() {
        return Objects.hash(website, username, password);
    }

    @Override
    public String toString() {
        return "PasswordRequest{" +
                "website='" + website + '\'' +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}
