package br.com.fiap.monitoramentomottu.mappers;

import br.com.fiap.monitoramentomottu.dto.Endereco.EnderecoRequest;
import br.com.fiap.monitoramentomottu.dto.Endereco.EnderecoResponse;
import br.com.fiap.monitoramentomottu.entity.Endereco;
import org.springframework.stereotype.Component;

@Component
public class EnderecoMapper {
    public Endereco RequestToEndereco(EnderecoRequest dto) {
        try{
        Endereco endereco = new Endereco();
        endereco.setLogradouro(dto.logradouro());
        endereco.setNumero(dto.numero());
        endereco.setCep(dto.cep());
        endereco.setBairro(dto.bairro());
        endereco.setCidade(dto.cidade());
        endereco.setEstado(dto.estado());
        return endereco;
        }
        catch (Exception e){
            System.out.println("Nao deu pra criar endereco: "+e);
        return null;
        }

    }
    public EnderecoResponse EnderecoToResponse(Endereco endereco, boolean self) {
        return new EnderecoResponse(
                endereco.getNumero(),
                endereco.getCep(),
                endereco.getEstado(),
                endereco.getCidade(),
                endereco.getBairro(),
                endereco.getLogradouro()
        );
    }
}
