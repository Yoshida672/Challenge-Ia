package br.com.fiap.monitoramentomottu.dto.Uwb;

import br.com.fiap.monitoramentomottu.dto.Localizacao.LocalizacaoRequest;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record UwbRequest(

        @NotBlank(message = "O código UWB não pode estar em branco")
        String codigo,

        @NotBlank(message = "O status não pode estar em branco")
        String status,

        Long idMoto

) {}
