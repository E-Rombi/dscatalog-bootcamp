package com.eduardo.dscatalog.dto;

import java.io.Serializable;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.PastOrPresent;
import javax.validation.constraints.Positive;

import com.eduardo.dscatalog.entities.Category;
import com.eduardo.dscatalog.entities.Product;
import com.eduardo.dscatalog.repositories.CategoryRepository;

public class ProductDTO implements Serializable {

	private static final long serialVersionUID = 1L;

	private Long id;
	
	@NotBlank(message = "Campo obrigatório")
	private String name;
	
	@NotBlank(message = "Campo obrigatório")
	private String description;
	
	@Positive(message = "Preço deve ser um valor positivo")
	private Double price;
	private String imgUrl;
	
	@PastOrPresent(message = "Data do produto não pode ser futura")
	private Instant date;
	
	@NotNull(message = "Necessário indicar no mínimo uma Categoria")
	private List<CategoryDTO> categories = new ArrayList<>();
	
	public ProductDTO() { }

	public ProductDTO(Long id, String name, String description, Double price, String imgUrl, Instant date) {
		this.id = id;
		this.name = name;
		this.description = description;
		this.price = price;
		this.imgUrl = imgUrl;
		this.date = date;
	}

	public ProductDTO(Product product) {
		this.id = product.getId();
		this.name = product.getName();
		this.description = product.getDescription();
		this.price = product.getPrice();
		this.imgUrl = product.getImgUrl();
		this.date = product.getDate();
	}
	
	public ProductDTO(Product product, Set<Category> categories) {
		this(product);
		
		categories.forEach(c -> this.categories.add(new CategoryDTO(c)));
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Double getPrice() {
		return price;
	}

	public void setPrice(Double price) {
		this.price = price;
	}

	public String getImgUrl() {
		return imgUrl;
	}

	public void setImgUrl(String imgUrl) {
		this.imgUrl = imgUrl;
	}

	public Instant getDate() {
		return date;
	}

	public void setDate(Instant date) {
		this.date = date;
	}

	public List<CategoryDTO> getCategories() {
		return categories;
	}

	public void setCategories(List<CategoryDTO> categories) {
		this.categories = categories;
	}

	public static Product convert(ProductDTO dto, CategoryRepository categoryRepository) {
		Product product = new Product();
		product.setName(dto.getName()); 
		product.setDescription(dto.getDescription()); 
		product.setDate(dto.getDate()); 
		product.setImgUrl(dto.getImgUrl()); 
		product.setPrice(dto.getPrice()); 
		
		product.getCategories().clear();
		for (CategoryDTO catDto: dto.getCategories()) {
			Category category = categoryRepository.getOne(catDto.getId());
			product.getCategories().add(category);
		}
		
		return product;
	}
	
	public static Product convert(ProductDTO dto, CategoryRepository categoryRepository, Long id) {
		Product product = convert(dto, categoryRepository);
		product.setId(id);
		return product;
	}
}
