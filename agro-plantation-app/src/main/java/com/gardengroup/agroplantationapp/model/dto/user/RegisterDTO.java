package com.gardengroup.agroplantationapp.model.dto.user;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class RegisterDTO {

    @NotBlank(message = "El email no puede estar vacío.")
    @Email(message = "El email debe tener un formato válido.")
    private String email;

    @NotBlank(message = "La contraseña no puede estar vacía.")
    @Size(min = 6, max = 20, message = "La contraseña debe tener entre 6 y 20 caracteres.")
    private String password;

    @NotBlank(message = "El nombre no puede estar vacío.")
    @Size(max = 30, message = "El nombre no puede superar los 30 caracteres.")
    private String name;

    @NotBlank(message = "El apellido no puede estar vacío.")
    @Size(max = 30, message = "El apellido no puede superar los 30 caracteres.")
    private String lastname;

    @NotBlank(message = "La dirección no puede estar vacía.")
    @Size(max = 100, message = "La dirección no puede superar los 100 caracteres.")
    private String address;

}
