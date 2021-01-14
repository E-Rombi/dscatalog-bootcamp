package com.eduardo.dscatalog.services;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.eduardo.dscatalog.dto.ProductDTO;
import com.eduardo.dscatalog.entities.Product;
import com.eduardo.dscatalog.repositories.ProductRepository;
import com.eduardo.dscatalog.services.exceptions.DatabaseException;
import com.eduardo.dscatalog.services.exceptions.ResourceNotFoundException;

@Service
public class ProductService {

	@Autowired
	private ProductRepository repository;
	
	@Transactional(readOnly = true)
	public Page<ProductDTO> findAllPaged(PageRequest pageRequest) {
		Page<Product> list = repository.findAll(pageRequest);
		return list.map(c -> new ProductDTO(c));
	}
	
	@Transactional(readOnly = true)
	public ProductDTO findById(Long id) {
		Product category = repository.findById(id).orElseThrow(() -> new EntityNotFoundException("Entity not found !"));
		return new ProductDTO(category, category.getCategories());
	}

	@Transactional
	public ProductDTO insert(ProductDTO dto) {
		Product category = ProductDTO.convert(dto);
		category = repository.save(category);
		return new ProductDTO(category);
	}

	@Transactional
	public ProductDTO update(Long id, ProductDTO dto) {
		try {
			Product category = repository.getOne(id);
			//category.setName(dto.getName());
			category = repository.save(category);
			return new ProductDTO(category);
		} catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException("Id not found: " + id);
		}
	}

	public void delete(Long id) {
		try {
			repository.deleteById(id);
		} catch (EmptyResultDataAccessException e) {
			throw new ResourceNotFoundException("Id not found: " + id);
		} catch (DataIntegrityViolationException e) {
			throw new DatabaseException("Integrity violation");
		}
		
	}
}
