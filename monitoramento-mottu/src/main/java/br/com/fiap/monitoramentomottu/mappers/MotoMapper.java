package br.com.fiap.monitoramentomottu.mappers;

import br.com.fiap.monitoramentomottu.controller.MotoController;
import br.com.fiap.monitoramentomottu.dto.Moto.MotoRequest;
import br.com.fiap.monitoramentomottu.dto.Moto.MotoResponse;
import br.com.fiap.monitoramentomottu.entity.*;
import org.springframework.hateoas.Link;
import org.springframework.stereotype.Component;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@Component
public class MotoMapper {

    public Moto RequestToMoto(MotoRequest dto) {
        Moto moto = new Moto();
        moto.setPlaca(dto.placa());
        moto.setModelo(Modelo.valueOf(dto.modelo()));
        return moto;
    }

    public MotoResponse MotoToResponse(Moto moto,boolean self) throws Exception {
        Link link;
        if (self) {
            link = linkTo(
                    methodOn(
                            MotoController.class
                    ).getById(moto.getId())
            ).withSelfRel();
        } else {
            link = linkTo(
                    methodOn(
                            MotoController.class
                    ).getById(0L)
            ).withRel("Lista de Motos");
        }
        return new MotoResponse(
                moto.getId(),
                moto.getPlaca(),
                moto.getModelo().name(),
                moto.getCondicao().getNome(),
                moto.getPatio().getFilial().getNome(),
                link

        );
    }
}