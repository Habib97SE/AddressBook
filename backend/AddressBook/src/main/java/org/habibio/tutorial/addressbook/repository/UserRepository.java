package org.habibio.tutorial.addressbook.repository;

import org.habibio.tutorial.addressbook.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
}
