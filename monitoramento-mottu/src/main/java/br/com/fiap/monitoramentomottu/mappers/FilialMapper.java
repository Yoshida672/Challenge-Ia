package br.com.fiap.monitoramentomottu.mappers;

import br.com.fiap.monitoramentomottu.controller.FilialController;
import br.com.fiap.monitoramentomottu.dto.Filial.FilialRequest;
import br.com.fiap.monitoramentomottu.dto.Filial.FilialResponse;
import br.com.fiap.monitoramentomottu.dto.Patio.PatioResponse;
import br.com.fiap.monitoramentomottu.entity.Filial;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.Link;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@Component
public class FilialMapper {

    @Autowired
    private EnderecoMapper enderecoMapper;

    @Autowired
    private PatioMapper patioMapper;

    public Filial RequestToFilial(FilialRequest dto) {
        Filial filial = new Filial();
        filial.setNome(dto.nome());
        filial.setCnpj(dto.cnpj());
        filial.setAno(dto.ano());
        filial.setEndereco(
                enderecoMapper.RequestToEndereco(dto.endereco()));
        return filial;
    }

    public FilialResponse FilialToResponse(Filial filial, boolean self) {
        Link link = null;
        try {
            link = self
                    ? linkTo(methodOn(FilialController.class).getById(filial.getId())).withSelfRel()
                    : linkTo(methodOn(FilialController.class).getById(0L)).withRel("Lista de Filiais");
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        List<PatioResponse> patios = filial.getPatios() != null
                ? filial.getPatios().stream()
                .map(p -> {
                    try {
                        return patioMapper.PatioToResponse(p, false);
                    } catch (Exception e) {
                        throw new RuntimeException(e);
                    }
                })
                .collect(Collectors.toList())
                : List.of();

        return new FilialResponse(
                filial.getId(),
                filial.getNome(),
                filial.getCnpj(),
                filial.getAno(),
                enderecoMapper.EnderecoToResponse(filial.getEndereco(), false),
                patios,
                link
        );
    }
}
