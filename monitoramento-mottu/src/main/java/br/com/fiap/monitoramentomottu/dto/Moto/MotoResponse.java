package br.com.fiap.monitoramentomottu.dto.Moto;

import org.springframework.hateoas.Link;

public record MotoResponse (
        Long id,
        String placa,
        String modelo,
        String condicao,
        String patio,
        Link link
) {

}
