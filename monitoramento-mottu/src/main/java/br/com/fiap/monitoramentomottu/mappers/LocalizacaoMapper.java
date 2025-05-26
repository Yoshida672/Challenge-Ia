package br.com.fiap.monitoramentomottu.mappers;

import br.com.fiap.monitoramentomottu.dto.Localizacao.LocalizacaoRequest;
import br.com.fiap.monitoramentomottu.entity.Localizacao;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class LocalizacaoMapper {

    public Localizacao RequestToLocalizacao(LocalizacaoRequest dto) {
        Localizacao localizacao = new Localizacao();
        localizacao.setTimestamp(LocalDateTime.parse(dto.timestamp()));
        localizacao.setxCoord(dto.xCoord());
        localizacao.setyCoord(dto.yCoord());
        return localizacao;
    }

}
