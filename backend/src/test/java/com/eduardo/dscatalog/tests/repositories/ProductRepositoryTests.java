package com.eduardo.dscatalog.tests.repositories;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.dao.InvalidDataAccessResourceUsageException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import com.eduardo.dscatalog.entities.Category;
import com.eduardo.dscatalog.entities.Product;
import com.eduardo.dscatalog.repositories.ProductRepository;
import com.eduardo.dscatalog.tests.factory.ProductFactory;

@DataJpaTest
public class ProductRepositoryTests {

	@Autowired
	private ProductRepository repository;
	
	private Long existingId;
	private Long nonExistingId;
	private Long countTotalProducts;
	private Long countPCGamerProducts;
	private Long countTotalProductsInCategory;
	private PageRequest pageRequest;
	
	@BeforeEach
	void setUp() throws Exception {
		existingId = 1L;
		nonExistingId = 1000L;
		countTotalProducts = 25L;
		countPCGamerProducts = 21L;
		countTotalProductsInCategory = 1L;
		pageRequest = PageRequest.of(0, 10);
	}
	
	@Test
	public void findShouldThrowSQLGrammarExceptionWhenCategoriesIsEmpty() {
		String name = "";
		List<Category> categories = new ArrayList<>();
		
		Assertions.assertThrows(InvalidDataAccessResourceUsageException.class, () -> {
			repository.find(categories, name, pageRequest);
		});		
	}
	
	@Test
	public void findShouldReturnAllProductsWhenCategoriesIsNotEmpty() {
		String name = "";
		List<Category> categories = Arrays.asList(new Category(1L, "Livros"));
		
		Page<Product> result = repository.find(categories, name, pageRequest);
		
		Assertions.assertFalse(result.isEmpty());
		Assertions.assertEquals(countTotalProductsInCategory, result.getTotalElements());
	}

	@Test
	public void findShouldAReturnAllProductsWhenNameIsEmpty() {
		String name = "";
		
		Page<Product> result = repository.find(null, name, pageRequest);
		
		Assertions.assertFalse(result.isEmpty());
		Assertions.assertEquals(countTotalProducts, result.getTotalElements());
	}
	
	@Test
	public void findShouldAReturnProductsWhenNameExistsIgnoringCase() {
		String name = "pC gAMer";
		
		Page<Product> result = repository.find(null, name, pageRequest);
		
		Assertions.assertFalse(result.isEmpty());
		Assertions.assertEquals(countPCGamerProducts, result.getTotalElements());
	}
	
	@Test
	public void findShouldAReturnProductsWhenNameExists() {
		String name = "PC Gamer";
		
		Page<Product> result = repository.find(null, name, pageRequest);
		
		Assertions.assertFalse(result.isEmpty());
		Assertions.assertEquals(countPCGamerProducts, result.getTotalElements());
	}
	
	@Test
	public void saveShouldPersistWithAutoIncrementWhenIdIsNull() {
		Product product = ProductFactory.createProduct();
		product.setId(null);
		
		product = repository.save(product);
		Optional<Product> result = repository.findById(product.getId());
		
		Assertions.assertNotNull(product.getId());
		Assertions.assertTrue(result.isPresent());
		Assertions.assertEquals(countTotalProducts + 1L, result.get().getId());
		Assertions.assertSame(result.get(), product);
		
	}
	
	@Test
	public void deleteShouldDeleteObjectWhenIdExists() {
		
		repository.deleteById(existingId);
		Optional<Product> result = repository.findById(existingId);
		
		Assertions.assertFalse(result.isPresent());
	}
	
	@Test
	public void deleteShouldThrowEmptyResultDataAccessExceptionWhenIdNotExists() {		
		Assertions.assertThrows(EmptyResultDataAccessException.class, () -> {
			repository.deleteById(nonExistingId);		
		});		
	}
	
	
}
