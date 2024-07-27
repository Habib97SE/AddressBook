package org.habibio.tutorial.passguard.v1.repository;

import org.habibio.tutorial.passguard.v1.entity.Password;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PasswordRepository extends JpaRepository<Password, Long> {
    public List<Password> findPasswordsByWebsite(String website);
}
