package org.habibio.tutorial.addressbook.repository;

import org.habibio.tutorial.addressbook.entity.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AddressRepository extends JpaRepository<Address, Long> {
    @Query("SELECT a FROM Address a JOIN a.user u WHERE " +
            "LOWER(a.addressOne) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
            "LOWER(a.addressTwo) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
            "LOWER(a.postalCode) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
            "LOWER(a.city) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
            "LOWER(a.state) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
            "LOWER(a.country) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
            "LOWER(a.phoneNumber) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
            "LOWER(u.firstName) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
            "LOWER(u.lastName) LIKE LOWER(CONCAT('%', :searchTerm, '%'))")
    List<Address> searchAddresses(@Param("searchTerm") String searchTerm);
}
