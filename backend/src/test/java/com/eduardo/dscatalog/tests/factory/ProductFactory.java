package com.eduardo.dscatalog.tests.factory;

import java.time.Instant;

import com.eduardo.dscatalog.dto.ProductDTO;
import com.eduardo.dscatalog.entities.Product;

public class ProductFactory {

	public static Product createProduct() {
		return new Product(1L, "Phone", "Good Phone", 2500.0, "https://img.com.br/img.jpg", Instant.parse("2021-03-13T18:00:00Z"));
	}
	
	public static ProductDTO createProductDTO() {
		return new ProductDTO(createProduct());
	}
}
