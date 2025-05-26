package br.com.fiap.monitoramentomottu.dto.Localizacao;

import java.time.LocalDateTime;

public record LocalizacaoRequest(
        String timestamp,
        Double xCoord,
        Double yCoord
) {
}
