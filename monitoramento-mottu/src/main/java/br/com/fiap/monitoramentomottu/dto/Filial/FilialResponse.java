package br.com.fiap.monitoramentomottu.dto.Filial;

import br.com.fiap.monitoramentomottu.dto.Endereco.EnderecoResponse;
import br.com.fiap.monitoramentomottu.dto.Patio.PatioResponse;
import org.springframework.hateoas.Link;

import java.util.List;

public record FilialResponse(
         Long id,
         String nome,
         String cnpj,
         int ano,
         EnderecoResponse endereco,
         List<PatioResponse> patios,
         Link link) {
}
