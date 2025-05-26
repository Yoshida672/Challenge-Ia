package br.com.fiap.monitoramentomottu.dto.Localizacao;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Locale;

public record LocalizacaoResponse(
        Long id,
        String timestampFormatado,
        Double xCoord,
        Double yCoord
) {
    public static LocalizacaoResponse from(Long id, LocalDateTime timestamp, Double xCoord, Double yCoord) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("d 'de' MMMM 'de' yyyy 'às' HH:mm", new Locale("pt", "BR"));
        String formatado = timestamp.format(formatter);
        return new LocalizacaoResponse(id, formatado, xCoord, yCoord);
    }

}
