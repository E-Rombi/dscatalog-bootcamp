package com.eduardo.dscatalog.tests.factory;

import java.time.Instant;

import com.eduardo.dscatalog.dto.ProductDTO;
import com.eduardo.dscatalog.entities.Category;
import com.eduardo.dscatalog.entities.Product;

public class ProductFactory {

	public static Product createProduct() {
		Product product = new Product(1L, "Phone", "Good Phone", 2500.0, "https://img.com.br/img.jpg", Instant.parse("2021-03-13T18:00:00Z"));
		product.getCategories().add(new Category(1L, null));
		return product;
	
	}
	
	public static ProductDTO createProductDTO() {
		Product product = createProduct();
		return new ProductDTO(product, product.getCategories());
	}
	
	public static ProductDTO createProductDTO(Long id) {
		ProductDTO dto = createProductDTO();
		dto.setId(id);
		return dto;
	}
}
