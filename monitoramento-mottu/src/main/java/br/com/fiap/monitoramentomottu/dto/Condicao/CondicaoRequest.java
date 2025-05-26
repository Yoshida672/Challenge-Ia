package br.com.fiap.monitoramentomottu.dto.Condicao;

import jakarta.validation.constraints.NotBlank;

public record CondicaoRequest(
        @NotBlank(message = "O nome da condição é obrigatório")
        String nome,

        @NotBlank(message = "A cor da condição é obrigatória")
        String cor
) {
}
