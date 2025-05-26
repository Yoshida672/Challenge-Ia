package br.com.fiap.monitoramentomottu.dto.Condicao;

import org.springframework.hateoas.Link;

public record CondicaoResponse(Long id,String nome, String cor, Link link) {
}
