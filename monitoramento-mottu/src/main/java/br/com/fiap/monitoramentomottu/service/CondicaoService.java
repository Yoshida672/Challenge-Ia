package br.com.fiap.monitoramentomottu.service;

import br.com.fiap.monitoramentomottu.dto.Condicao.CondicaoRequest;
import br.com.fiap.monitoramentomottu.dto.Condicao.CondicaoResponse;
import br.com.fiap.monitoramentomottu.entity.Condicao;
import br.com.fiap.monitoramentomottu.mappers.CondicaoMapper;
import br.com.fiap.monitoramentomottu.repository.CondicaoRepository;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CondicaoService {
    private final CondicaoRepository condicaoRepository;
    private final CondicaoMapper mapper;
    public CondicaoService(CondicaoRepository condicaoRepository, CondicaoMapper mapper) {
        this.condicaoRepository = condicaoRepository;
        this.mapper = mapper;
    }

    @Transactional
    @CachePut(value = "condicoes", key = "#result.id")
    public CondicaoResponse create(CondicaoRequest dto) throws Exception{
        Condicao condicao = mapper.RequestToCondicao(dto);
        condicao.setCor(dto.cor());
        condicao.setNome(dto.nome());
        condicao = condicaoRepository.save(condicao);

        return mapper.CondicaoToResponse(condicao,true);

    }

    @Transactional(readOnly = true)
    @Cacheable(value = "condicoes", key = "#id")
    public CondicaoResponse getById(Long id) throws Exception {
        Condicao condicao = condicaoRepository.findById(id)
                .orElseThrow(() -> new Exception("Condição não encontrada"));
        return mapper.CondicaoToResponse(condicao, true);
    }
    @Transactional(readOnly = true)
    @Cacheable(value = "condicoes",key = "'all'")
    public Page<CondicaoResponse> getAll(Pageable pageable) {
        return condicaoRepository.findAll(pageable)
                .map(condicao-> {
                    try {
                        return mapper.CondicaoToResponse(condicao,true);
                    } catch (Exception e) {
                        throw new RuntimeException(e);
                    }
                });
    }
    @Transactional
    @CachePut(value = "condicoes", key = "#id")
    public CondicaoResponse update(Long id, CondicaoRequest dto) throws Exception {
        Condicao condicao = condicaoRepository.findById(id)
                .orElseThrow(() -> new Exception("Condição não encontrada"));

        if (dto.cor() != null) {
            condicao.setCor(dto.cor());
        }

        if (dto.nome() != null) {
            condicao.setNome(dto.nome());
        }

        condicao = condicaoRepository.save(condicao);

        return mapper.CondicaoToResponse(condicao, true);
    }

    @Transactional
    @CacheEvict(value = "condicoes", key = "#id")
    public void delete(Long id) throws Exception {
        if (!condicaoRepository.existsById(id)) {
            throw new Exception("Condição não encontrada");
        }

        condicaoRepository.deleteById(id);
    }
    @CacheEvict(value = "condicoes", key = "'all'")
    public void cleanCacheAllCondicoes() {

    }
    @CacheEvict(value = "condicoes", allEntries = true)
    public void cleanAllCacheCondicoes() {

    }



}
