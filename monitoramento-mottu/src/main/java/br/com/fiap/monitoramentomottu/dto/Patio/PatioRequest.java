package br.com.fiap.monitoramentomottu.dto.Patio;

import br.com.fiap.monitoramentomottu.dto.Anotacao.ExistsId;
import br.com.fiap.monitoramentomottu.entity.Filial;
import br.com.fiap.monitoramentomottu.entity.Patio;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;

import java.util.List;

public record PatioRequest(
        @Positive(message = "A área do pátio deve ser um valor positivo")
        int area,

        @Positive(message = "A capacidade máxima deve ser um valor positivo")
        int capacidadeMax,

        @NotNull(message = "O ID da filial é obrigatório")
        @Positive(message = "O ID da filial deve ser um número positivo")
        @ExistsId(entity = Filial.class, message = "Filial não existe")
        Long filialId

        ) {
}
