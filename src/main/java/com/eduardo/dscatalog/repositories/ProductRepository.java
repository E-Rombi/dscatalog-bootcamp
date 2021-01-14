package com.eduardo.dscatalog.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.eduardo.dscatalog.entities.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {

}
