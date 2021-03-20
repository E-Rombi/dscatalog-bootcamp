package com.eduardo.dscatalog.tests.integration;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.transaction.annotation.Transactional;

import com.eduardo.dscatalog.dto.ProductDTO;
import com.eduardo.dscatalog.services.ProductService;
import com.eduardo.dscatalog.services.exceptions.ResourceNotFoundException;

@SpringBootTest
@Transactional
public class ProductServiceIT {

	@Autowired
	private ProductService service;
	
	private Long existsId;
	private Long nonExistsId;
	private Long countTotalProducts;
	private Long countPCGamerProducts;
	private PageRequest pageRequest;
	
	@BeforeEach
	void setUp() throws Exception {
		existsId = 1L;
		nonExistsId = 1000L;
		countTotalProducts = 25L;
		countPCGamerProducts = 21L;
		pageRequest = PageRequest.of(0, 10);
	}

	@Test
	public void findAllPagedShouldReturnAllProductsWhenNameIsEmpty() {
		String name = "";
		
		Page<ProductDTO> result = service.findAllPaged(pageRequest, 0L, name);
		
		Assertions.assertFalse(result.isEmpty());
		Assertions.assertEquals(countTotalProducts, result.getTotalElements());
	}
	
	@Test
	public void findAllPagedShouldAReturnProductsWhenNameExistsIgnoringCase() {
		String name = "pC gAMer";
		
		Page<ProductDTO> result = service.findAllPaged(pageRequest, 0L, name);
		
		Assertions.assertFalse(result.isEmpty());
		Assertions.assertEquals(countPCGamerProducts, result.getTotalElements());
	}
	
	@Test
	public void findAllPagedShouldDoNothingWhenNameDoesNotExists() {
		String name = "Santos FC";
		
		Page<ProductDTO> result = service.findAllPaged(pageRequest, 0L, name);
		
		Assertions.assertTrue(result.isEmpty());
	}
	
	@Test
	public void deleteShouldThrowResourceNotFoundExceptionWhenIdNotExists() {
		Assertions.assertThrows(ResourceNotFoundException.class, () -> {
			service.delete(nonExistsId);
		});
	}
	
	@Test
	public void deleteShouldDoNothingWhenIdExists() {
				
		Assertions.assertDoesNotThrow(() -> {
			service.delete(existsId);
		});
	}
	
	
}
