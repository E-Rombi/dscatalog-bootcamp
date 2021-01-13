package com.eduardo.dscatalog.resources;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.eduardo.dscatalog.dto.CategoryDTO;
import com.eduardo.dscatalog.services.CategoryService;

@RestController
@RequestMapping("/categories")
public class CategoryResource {
	
	@Autowired
	private CategoryService service;
	
	@GetMapping
	public ResponseEntity<List<CategoryDTO>> findAll() {
		List<CategoryDTO> categories = service.findAll();
		return ResponseEntity.ok(categories);
	}

}
