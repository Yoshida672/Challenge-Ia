package br.com.fiap.monitoramentomottu.dto.Uwb;

import br.com.fiap.monitoramentomottu.dto.Localizacao.LocalizacaoResponse;
import org.springframework.hateoas.Link;

public record UwbResponse(
        Long id,
        String codigo,
        String status,
        String moto,
        LocalizacaoResponse localizacao,
        Link link

) {}
