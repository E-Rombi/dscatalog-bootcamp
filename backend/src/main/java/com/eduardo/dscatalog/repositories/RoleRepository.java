package com.eduardo.dscatalog.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.eduardo.dscatalog.entities.Role;
import com.eduardo.dscatalog.entities.User;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {

}
