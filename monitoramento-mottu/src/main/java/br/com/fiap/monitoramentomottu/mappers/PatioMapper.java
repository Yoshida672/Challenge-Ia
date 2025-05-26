package br.com.fiap.monitoramentomottu.mappers;

import br.com.fiap.monitoramentomottu.controller.CondicaoController;
import br.com.fiap.monitoramentomottu.controller.PatioController;
import br.com.fiap.monitoramentomottu.dto.Condicao.CondicaoRequest;
import br.com.fiap.monitoramentomottu.dto.Condicao.CondicaoResponse;
import br.com.fiap.monitoramentomottu.dto.Patio.PatioRequest;
import br.com.fiap.monitoramentomottu.dto.Patio.PatioResponse;
import br.com.fiap.monitoramentomottu.entity.Condicao;
import br.com.fiap.monitoramentomottu.entity.Patio;
import org.springframework.hateoas.Link;
import org.springframework.stereotype.Component;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;
@Component
public class PatioMapper {
    public Patio RequestToPatio(PatioRequest dto) {
        Patio patio = new Patio();
        patio.setAreaPatio(dto.area());
        patio.setCapacidadeMoto(dto.capacidadeMax());
        return patio;
    }

    public PatioResponse PatioToResponse(Patio patio, boolean self) throws Exception {
        Link link;
        if (self) {
            link = linkTo(
                    methodOn(
                            PatioController.class
                    ).getById(patio.getId())
            ).withSelfRel();
        } else {
            link = linkTo(
                    methodOn(
                            PatioController.class
                    ).getById(Long.valueOf(0))
            ).withRel("Lista de Patios");
        }
        return new PatioResponse(
                patio.getId(),
                patio.getQtdMoto(),
                patio.getAreaPatio(),
                patio.getCapacidadeMoto(),
                patio.getFilial().getNome(),
                link

        );
    }
}
