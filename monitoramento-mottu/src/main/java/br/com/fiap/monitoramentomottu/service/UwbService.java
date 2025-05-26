package br.com.fiap.monitoramentomottu.service;

import br.com.fiap.monitoramentomottu.dto.Localizacao.LocalizacaoRequest;
import br.com.fiap.monitoramentomottu.dto.Uwb.UwbRequest;
import br.com.fiap.monitoramentomottu.dto.Uwb.UwbResponse;
import br.com.fiap.monitoramentomottu.entity.Moto;
import br.com.fiap.monitoramentomottu.entity.Uwb;
import br.com.fiap.monitoramentomottu.mappers.LocalizacaoMapper;
import br.com.fiap.monitoramentomottu.mappers.UwbMapper;
import br.com.fiap.monitoramentomottu.repository.MotoRepository;
import br.com.fiap.monitoramentomottu.repository.UwbRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UwbService {

    private final UwbRepository uwbRepository;
    private final MotoRepository motoRepository;
    private final UwbMapper mapper;
    private final LocalizacaoMapper mapperLoc;

    public UwbService(UwbRepository uwbRepository, MotoRepository motoRepository, UwbMapper mapper, LocalizacaoMapper mapperLoc) {
        this.uwbRepository = uwbRepository;
        this.motoRepository = motoRepository;
        this.mapper = mapper;
        this.mapperLoc = mapperLoc;
    }

    @Transactional
    public UwbResponse create(UwbRequest dto) throws Exception {
        Moto moto = motoRepository.findById(dto.idMoto())
                .orElseThrow(() -> new Exception("Moto não encontrada"));

        Uwb uwb = mapper.RequestToUwb(dto);
        uwb.setMoto(moto);

        uwb = uwbRepository.save(uwb);
        return mapper.UwbToResponse(uwb, true);
    }

    @Transactional(readOnly = true)
    public UwbResponse getById(Long id) throws Exception {
        Uwb uwb = uwbRepository.findById(id)
                .orElseThrow(() -> new Exception("UWB não encontrada"));
        return mapper.UwbToResponse(uwb, true);
    }

    @Transactional(readOnly = true)
    public Page<UwbResponse> getAll(Pageable pageable) {
        return uwbRepository.findAll(pageable)
                .map(uwb -> {
                    try {
                        return mapper.UwbToResponse(uwb, true);
                    } catch (Exception e) {
                        throw new RuntimeException(e);
                    }
                });
    }

    @Transactional
    public UwbResponse update(Long id, UwbRequest dto) throws Exception {
        Uwb uwb = uwbRepository.findById(id)
                .orElseThrow(() -> new Exception("UWB não encontrada"));

        if (dto.codigo() != null) uwb.setCodigo(dto.codigo());
        if (dto.status() != null) uwb.setStatus(dto.status());

        if (dto.idMoto() != null) {
            Moto moto = motoRepository.findById(dto.idMoto())
                    .orElseThrow(() -> new Exception("Moto não encontrada"));
            uwb.setMoto(moto);
        }

        uwb = uwbRepository.save(uwb);
        return mapper.UwbToResponse(uwb, true);
    }
    @Transactional
    public UwbResponse updateLocalizacao(Long id, LocalizacaoRequest dto) throws Exception {
        Uwb uwb = uwbRepository.findById(id)
                .orElseThrow(() -> new Exception("UWB não encontrada"));
        uwb.setLocalizacao(mapperLoc.RequestToLocalizacao(dto));
        uwb = uwbRepository.save(uwb);
        return mapper.UwbToResponse(uwb, true);
    }

    @Transactional
    public void delete(Long id) throws Exception {
        if (!uwbRepository.existsById(id)) {
            throw new Exception("UWB não encontrada");
        }
        uwbRepository.deleteById(id);
    }
}
