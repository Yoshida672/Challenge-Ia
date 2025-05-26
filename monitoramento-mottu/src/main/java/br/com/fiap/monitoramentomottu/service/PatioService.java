package br.com.fiap.monitoramentomottu.service;

import br.com.fiap.monitoramentomottu.dto.Patio.PatioRequest;
import br.com.fiap.monitoramentomottu.dto.Patio.PatioResponse;
import br.com.fiap.monitoramentomottu.entity.*;
import br.com.fiap.monitoramentomottu.mappers.PatioMapper;
import br.com.fiap.monitoramentomottu.repository.FilialRepository;
import br.com.fiap.monitoramentomottu.repository.MotoRepository;
import br.com.fiap.monitoramentomottu.repository.PatioRepository;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PatioService {
    private final MotoRepository motoRepository;
    private final PatioRepository patioRepository;
    private final FilialRepository filialRepository;

    private final PatioMapper mapper;

    public PatioService(MotoRepository motoRepository, PatioRepository patioRepository, FilialRepository filialRepository, PatioMapper mapper) {
        this.motoRepository = motoRepository;
        this.patioRepository = patioRepository;
        this.filialRepository = filialRepository;
        this.mapper = mapper;
    }

    @Transactional
    @CachePut(value = "patios", key = "#result.id")
    public PatioResponse create(PatioRequest dto) throws Exception{
        Patio patio = mapper.RequestToPatio(dto);
        patio.setCapacidadeMoto(dto.capacidadeMax());
        patio.setAreaPatio( dto.area());
        patio.setFilial(filialRepository.findById(dto.filialId()).orElseThrow(() -> new Exception("Filial não encontrada")));
        patio = patioRepository.save(patio);
        return mapper.PatioToResponse(patio,true);
    }
    @Transactional(readOnly = true)
    @Cacheable(value = "patios", key = "#id")
    public PatioResponse getById(Long id) throws Exception {
        Patio patio  = patioRepository.findById(id)
                .orElseThrow(() -> new Exception("Patio não encontrada"));
        return mapper.PatioToResponse(patio,true);
    }

    @Transactional(readOnly = true)
    @Cacheable(value = "patios", key = "'all'")
    public Page<PatioResponse> getAll(Pageable pageable) {
        return patioRepository.findAll(pageable)
                .map(patio-> {
                    try {
                        return mapper.PatioToResponse(patio,true);
                    } catch (Exception e) {
                        throw new RuntimeException(e);
                    }
                });
    }

    @Transactional
    @CachePut(value = "patios", key = "#id")
    public PatioResponse update(Long id, PatioRequest dto) throws Exception {
        Patio patio = patioRepository.findById(id)
                .orElseThrow(() -> new Exception("Patio não encontrado"));

        if (dto.filialId() != null) {
            Filial filial = filialRepository.findById(dto.filialId())
                    .orElseThrow(() -> new Exception("Filial não encontrada"));
            patio.setFilial(filial);
        }
        patio.setAreaPatio(dto.area());
        patio.setCapacidadeMoto(dto.capacidadeMax());
        patio = patioRepository.save(patio);
        return mapper.PatioToResponse(patio,true);
    }

    @Transactional
    @CacheEvict(value = "patios",key = "#id")
    public void delete(Long id) throws Exception {
        if (!motoRepository.existsById(id)) {
            throw new Exception("Moto não encontrada");
        }
        motoRepository.deleteById(id);
    }
    @CacheEvict(value = "patios", key = "'all'")
    public void cleanPatiosListCache() {
    }

    @CacheEvict(value = "patios", allEntries = true)
    public void cleanAllPatiosCache() {
    }
}
