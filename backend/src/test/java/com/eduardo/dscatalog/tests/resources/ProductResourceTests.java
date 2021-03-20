package com.eduardo.dscatalog.tests.resources;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.httpBasic;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.json.JacksonJsonParser;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import com.eduardo.dscatalog.dto.ProductDTO;
import com.eduardo.dscatalog.services.ProductService;
import com.eduardo.dscatalog.services.exceptions.DatabaseException;
import com.eduardo.dscatalog.services.exceptions.ResourceNotFoundException;
import com.eduardo.dscatalog.tests.factory.ProductFactory;
import com.fasterxml.jackson.databind.ObjectMapper;

@SpringBootTest
@AutoConfigureMockMvc
public class ProductResourceTests {

	@Autowired
	private MockMvc mockMvc;
	
	@MockBean
	private ProductService service;
	
	@Autowired
	private ObjectMapper mapper;

	@Value("${security.oauth2.client.client-id}")
	private String clientId;
	
	@Value("${security.oauth2.client.client-secret}")
	private String clientSecret;
	
	private Long existingId;
	private Long nonExistingId;
	private Long dependentId;
	private ProductDTO existingProductDTO;
	private ProductDTO newProductDTO;
	private ProductDTO unprocessableProductDTO;
	private PageImpl<ProductDTO> page;
	
	private String operatorUsername;
	private String operatorPassword;
	
	@BeforeEach
	void setUp() throws Exception {
		operatorUsername = "alex@gmail.com";
		operatorPassword = "123456";
		existingId = 1L;
		nonExistingId = 2L;
		
		newProductDTO = ProductFactory.createProductDTO(null);
		existingProductDTO = ProductFactory.createProductDTO(existingId);
		unprocessableProductDTO = ProductFactory.createProductDTO(null);
		unprocessableProductDTO.setPrice(-800.0);
		
		page = new PageImpl<>(List.of(existingProductDTO));
		
	
		when(service.findById(existingId)).thenReturn(existingProductDTO);
		when(service.findById(nonExistingId)).thenThrow(ResourceNotFoundException.class);
		
		when(service.findAllPaged(any(), any(), anyString())).thenReturn(page);
		
		when(service.insert(any())).thenReturn(existingProductDTO);
		
		when(service.update(eq(existingId), any())).thenReturn(existingProductDTO);
		when(service.update(eq(nonExistingId), any())).thenThrow(ResourceNotFoundException.class);
		
		doNothing().when(service).delete(existingId);
		doThrow(ResourceNotFoundException.class).when(service).delete(nonExistingId);		
		doThrow(DatabaseException.class).when(service).delete(dependentId);		
	}
	
	@Test
	public void deleteShouldReturnNotFoundWhenIdNotExists() throws Exception {
		String accessToken = obtainAccessToken(operatorUsername, operatorPassword);
		
		mockMvc.perform(
					delete("/products/{id}", nonExistingId)
					.header("Authorization", "Bearer  " + accessToken)
				)
				.andExpect(status().isNotFound());
	}
	
	@Test
	public void deleteShouldReturnNoContentWhenIdExists() throws Exception {
		String accessToken = obtainAccessToken(operatorUsername, operatorPassword);
		
		mockMvc.perform(
					delete("/products/{id}", existingId)
					.header("Authorization", "Bearer  " + accessToken)
				)
				.andExpect(status().isNoContent());
	}
	
	@Test
	public void insertShouldReturnUnprocessableEntityWhenPriceNegative() throws Exception {
		String accessToken = obtainAccessToken(operatorUsername, operatorPassword);
		
		String jsonBody = mapper.writeValueAsString(unprocessableProductDTO);
		
		mockMvc.perform(
					post("/products")
					.contentType(MediaType.APPLICATION_JSON)
					.header("Authorization", "Bearer  " + accessToken)
					.content(jsonBody)
				)
				.andExpect(status().isUnprocessableEntity());
	}
	
	@Test
	public void insertShouldReturnProductDTOWhenIdExists() throws Exception {
		String accessToken = obtainAccessToken(operatorUsername, operatorPassword);
		
		String jsonBody = mapper.writeValueAsString(newProductDTO);
		
		Double expectedPrice = newProductDTO.getPrice();
		String expectedName  = newProductDTO.getName();
		
		mockMvc.perform(
					post("/products")
					.contentType(MediaType.APPLICATION_JSON)
					.header("Authorization", "Bearer " + accessToken)
					.content(jsonBody)
				)
				.andExpect(status().isCreated())
				.andExpect(jsonPath("$.id").value(existingId))
				.andExpect(jsonPath("$.price").value(expectedPrice))
				.andExpect(jsonPath("$.name").value(expectedName));
	}
	
	@Test
	public void updateShouldReturnProductDTOWhenIdExists() throws Exception {
		String accessToken = obtainAccessToken(operatorUsername, operatorPassword);
		
		String jsonBody = mapper.writeValueAsString(newProductDTO);
		
		Double expectedPrice = newProductDTO.getPrice();
		String expectedName  = newProductDTO.getName();
		
		mockMvc.perform(
				put("/products/{id}", existingId)
				.content(jsonBody)
				.accept(MediaType.APPLICATION_JSON)
				.contentType(MediaType.APPLICATION_JSON)
				.header("Authorization", "Bearer " + accessToken)
			)
			.andExpect(status().isOk())
			.andExpect(jsonPath("$.id").value(existingId))
			.andExpect(jsonPath("$.price").value(expectedPrice))
			.andExpect(jsonPath("$.name").value(expectedName));
	}
	
	@Test
	public void updateShouldReturnNotFoundWhenIdNotExists() throws Exception {
		String jsonBody = mapper.writeValueAsString(newProductDTO);
		String accessToken = obtainAccessToken(operatorUsername, operatorPassword);
		
		mockMvc.perform(
				put("/products/{id}", nonExistingId)
				.content(jsonBody)
				.accept(MediaType.APPLICATION_JSON)
				.contentType(MediaType.APPLICATION_JSON)
				.header("Authorization", "Bearer " + accessToken)
			)
			.andExpect(status().isNotFound());
	}
	
	@Test
	public void findAllShouldReturnPage() throws Exception {
		mockMvc.perform(
				get("/products")
				.accept(MediaType.APPLICATION_JSON)
			)
			.andExpect(status().isOk())
			.andExpect(jsonPath("$.content").exists());
	}	
	
	@Test
	public void findByIdShouldReturnProductWhenIdExists() throws Exception {
		mockMvc.perform(
					get("/products/{id}", existingId)
					.accept(MediaType.APPLICATION_JSON)
				)
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.id").exists())
				.andExpect(jsonPath("$.id").value(existingId));
	}
	
	@Test
	public void findByIdShouldReturnNotFoundWhenIdNotExists() throws Exception {
		mockMvc.perform(
				get("/products/{id}", nonExistingId)
				.accept(MediaType.APPLICATION_JSON)
			)
			.andExpect(status().isNotFound());
	}	
	
	private String obtainAccessToken(String username, String password) throws Exception {
		 
	    MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
	    params.add("grant_type", "password");
	    params.add("client_id", clientId);
	    params.add("username", username);
	    params.add("password", password);
	 
	    ResultActions result 
	    	= mockMvc.perform(post("/oauth/token")
	    		.params(params)
	    		.with(httpBasic(clientId, clientSecret))
	    		.accept("application/json;charset=UTF-8"))
	        	.andExpect(status().isOk())
	        	.andExpect(content().contentType("application/json;charset=UTF-8"));
	 
	    String resultString = result.andReturn().getResponse().getContentAsString();
	 
	    JacksonJsonParser jsonParser = new JacksonJsonParser();
	    return jsonParser.parseMap(resultString).get("access_token").toString();
	}	
}