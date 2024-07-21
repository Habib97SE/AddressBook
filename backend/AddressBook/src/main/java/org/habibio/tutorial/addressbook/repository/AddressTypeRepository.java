package org.habibio.tutorial.addressbook.repository;

import org.habibio.tutorial.addressbook.entity.AddressType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AddressTypeRepository extends JpaRepository<AddressType, Long> {
}
