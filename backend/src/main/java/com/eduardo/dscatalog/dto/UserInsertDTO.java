package com.eduardo.dscatalog.dto;

import javax.validation.constraints.NotBlank;

public class UserInsertDTO extends UserDTO {

	private static final long serialVersionUID = 1L; 

	@NotBlank(message = "Campo obrigatório")
	private String password;

	public UserInsertDTO() {
		super();
	}

	public String getPassword() {
		return password;
	}


	public void setPassword(String password) {
		this.password = password;
	}
	
}
