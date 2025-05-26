package br.com.fiap.monitoramentomottu.dto.Filial;

import br.com.fiap.monitoramentomottu.dto.Endereco.EnderecoRequest;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record FilialRequest(
        @NotBlank(message = "O nome não pode estar em branco")
        @Size(min = 2, max = 100, message = "O nome deve ter entre 2 e 100 caracteres")
        String nome,

        @NotBlank(message = "O CNPJ não pode estar em branco")
        @Size(min = 14, max = 18, message = "O CNPJ deve ter entre 14 e 18 caracteres")
        String cnpj,

        @NotNull(message = "O ano não pode ser nulo")
        Integer ano,

        @NotNull(message = "O endereço não pode ser nulo")
        EnderecoRequest endereco
) {

}
