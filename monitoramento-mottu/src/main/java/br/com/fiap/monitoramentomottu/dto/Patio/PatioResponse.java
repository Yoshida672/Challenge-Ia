package br.com.fiap.monitoramentomottu.dto.Patio;

import org.springframework.hateoas.Link;

public record PatioResponse(Long id,int qtdMoto, int area, int capacidadeMax, String filial, Link link) {
}
