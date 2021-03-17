package com.eduardo.dscatalog.tests.services;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentMatchers;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.PageImpl;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.eduardo.dscatalog.dto.ProductDTO;
import com.eduardo.dscatalog.entities.Product;
import com.eduardo.dscatalog.repositories.ProductRepository;
import com.eduardo.dscatalog.services.ProductService;
import com.eduardo.dscatalog.services.exceptions.DatabaseException;
import com.eduardo.dscatalog.services.exceptions.ResourceNotFoundException;
import com.eduardo.dscatalog.tests.factory.ProductFactory;

@ExtendWith(SpringExtension.class)
public class ProductServiceTests {

	@InjectMocks
	private ProductService service;
	
	@Mock
	private ProductRepository repository;
	
	private Long existsId;
	private Long nonExistsId;
	private Long dependentId;
	private Product product;
	private ProductDTO dtoInsert;
	private ProductDTO dtoUpdate;
	private PageImpl<Product> page;
	
	@BeforeEach
	void setUp() throws Exception {
		existsId = 1L;
		nonExistsId = 1000L;
		dependentId = 4L;
		product = ProductFactory.createProduct();
		page = new PageImpl<>(List.of(product));
		dtoUpdate = new ProductDTO(product);
		
		dtoInsert = new ProductDTO(product);
		dtoInsert.setId(null);
				
		when(repository.findById(existsId))
			.thenReturn(Optional.of(product));
				
		when(repository.find(ArgumentMatchers.any(), ArgumentMatchers.anyString(), ArgumentMatchers.any()))
			.thenReturn(page);
		
		when(repository.save(ArgumentMatchers.any()))
			.thenReturn(product);
		
		doNothing()
			.when(repository).deleteById(existsId);
		
		doThrow(EmptyResultDataAccessException.class)
			.when(repository).deleteById(nonExistsId);
		
		doThrow(DataIntegrityViolationException.class)
			.when(repository).deleteById(dependentId);
		
		doThrow(ResourceNotFoundException.class)
			.when(repository).findById(nonExistsId);
		
		doThrow(ResourceNotFoundException.class)
			.when(repository).getOne(nonExistsId);
	}
	
	@Test
	public void updateShouldThrowResourceNotFoundExceptionWhenIdNotExists() {
		
		assertThrows(ResourceNotFoundException.class, () -> {
			service.update(nonExistsId, dtoUpdate);
		});
		
		verify(repository).getOne(nonExistsId);
	}
	
	@Test
	public void updateShouldReturnProductDTOWhenIdExists() {
		
		ProductDTO update = service.update(existsId, dtoUpdate);
		
		assertEquals(update.getId(), product.getId());
	}
	
	
	@Test
	public void findByIdShouldReturnProductDTOWhenIdExists() {
		ProductDTO productDTO = service.findById(existsId);
		
		assertTrue(productDTO instanceof ProductDTO);	
	}
	
	@Test
	public void findByIdShouldThrowResourceNotFoundExceptionWhenIdNotExists() {
				
		assertThrows(ResourceNotFoundException.class, () -> {
			service.findById(nonExistsId);
		});
	}
	
	@Test
	public void saveShouldReturnProductWhenIdIsNull() {
		ProductDTO dtoInserted = service.insert(dtoInsert);
		
		Assertions.assertNull(dtoInsert.getId());
		Assertions.assertNotNull(dtoInserted.getId());
	}
	
	
	@Test
	public void deleteShouldThrowDatabaseExceptionWhenId() {
		Assertions.assertThrows(DatabaseException.class, () -> {
			service.delete(dependentId);
		});
		
		verify(repository).deleteById(dependentId);
	}
	
	@Test
	public void deleteShouldThrowResourceNotFoundExceptionWhenIdNotExists() {
		Assertions.assertThrows(ResourceNotFoundException.class, () -> {
			service.delete(nonExistsId);
		});
		
		verify(repository).deleteById(nonExistsId);
	}
	
	@Test
	public void deleteShouldDoNothingWhenIdExists() {
				
		Assertions.assertDoesNotThrow(() -> {
			service.delete(existsId);
		});
		
		verify(repository).deleteById(existsId);
	}
	
	
}
