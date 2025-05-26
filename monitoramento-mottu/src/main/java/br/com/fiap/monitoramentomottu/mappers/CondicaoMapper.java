package br.com.fiap.monitoramentomottu.mappers;

import br.com.fiap.monitoramentomottu.controller.CondicaoController;

import br.com.fiap.monitoramentomottu.dto.Condicao.CondicaoRequest;
import br.com.fiap.monitoramentomottu.dto.Condicao.CondicaoResponse;

import br.com.fiap.monitoramentomottu.entity.Condicao;

import org.springframework.hateoas.Link;
import org.springframework.stereotype.Component;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;
@Component
public class CondicaoMapper {
    public Condicao RequestToCondicao(CondicaoRequest dto) {
       Condicao condicao = new Condicao();
        condicao.setNome(dto.nome());
        condicao.setCor(dto.cor());
        return condicao;
    }

    public CondicaoResponse CondicaoToResponse(Condicao condicao, boolean self) throws Exception {
        Link link;
        if (self) {
            link = linkTo(
                    methodOn(
                            CondicaoController.class
                    ).getById(condicao.getId())
            ).withSelfRel();
        } else {
            link = linkTo(
                    methodOn(
                            CondicaoController.class
                    ).getById(0L)
            ).withRel("Lista de Condições");
        }
        return new CondicaoResponse(
                condicao.getId(),
                condicao.getNome(),
                condicao.getCor(),
                link

        );
    }
}
