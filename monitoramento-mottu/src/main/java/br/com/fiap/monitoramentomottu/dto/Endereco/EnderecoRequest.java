package br.com.fiap.monitoramentomottu.dto.Endereco;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record EnderecoRequest(
    @NotNull(message = "O número não pode ser nulo")
    int numero,
    @NotBlank(message = "O CEP não pode estar em branco")
    @Size(min = 8, max = 9, message = "O CEP deve ter entre 8 e 9 caracteres")
    String cep,
    @NotBlank(message = "O estado não pode estar em branco")
    String estado,
    @NotBlank(message = "A cidade não pode estar em branco")
    String cidade,
    @NotBlank(message = "O bairro não pode estar em branco")
    String bairro,
    @NotBlank(message = "O logradouro não pode estar em branco")
    String logradouro) {
}