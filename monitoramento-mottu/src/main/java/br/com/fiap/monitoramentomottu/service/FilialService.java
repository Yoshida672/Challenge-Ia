package br.com.fiap.monitoramentomottu.service;

import br.com.fiap.monitoramentomottu.dto.Filial.FilialRequest;
import br.com.fiap.monitoramentomottu.dto.Filial.FilialResponse;
import br.com.fiap.monitoramentomottu.entity.Filial;
import br.com.fiap.monitoramentomottu.mappers.EnderecoMapper;
import br.com.fiap.monitoramentomottu.mappers.FilialMapper;
import br.com.fiap.monitoramentomottu.repository.FilialRepository;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class FilialService {

    private final FilialRepository filialRepository;
    private final FilialMapper filialMapper;
    private final EnderecoMapper enderecoMapper;


    public FilialService(FilialRepository filialRepository, FilialMapper filialMapper, EnderecoMapper enderecoMapper) {
        this.filialRepository = filialRepository;
        this.filialMapper = filialMapper;
        this.enderecoMapper = enderecoMapper;
    }

    @Transactional
    @CachePut(value = "filiais", key = "#result.id")
    public FilialResponse create(FilialRequest dto) throws Exception {
        Filial filial = filialMapper.RequestToFilial(dto);
        filial = filialRepository.save(filial);
        return filialMapper.FilialToResponse(filial, true);
    }

    @Transactional(readOnly = true)
    @Cacheable(value = "filiais", key = "#id")
    public FilialResponse getById(Long id) throws Exception {
        Filial filial = filialRepository.findById(id)
                .orElseThrow(() -> new Exception("Filial não encontrada"));
        return filialMapper.FilialToResponse(filial, true);
    }

    @Transactional(readOnly = true)
    @Cacheable(value = "filiais",key = "'all'")
    public Page<FilialResponse> getAll(Pageable pageable) {
        return filialRepository.findAll(pageable)
                .map(filial -> filialMapper.FilialToResponse(filial, true));
    }

    @Transactional
    @CachePut(value = "filiais", key = "#id")

    public FilialResponse update(Long id, FilialRequest dto) throws Exception {
        Filial filial = filialRepository.findById(id)
                .orElseThrow(() -> new Exception("Filial não encontrada"));

        if (dto.nome() != null) filial.setNome(dto.nome());
        if (dto.ano() != 0) filial.setAno(dto.ano());
        if (dto.cnpj() != null) filial.setCnpj(dto.cnpj());
        if(dto.endereco()!=null) filial.setEndereco(enderecoMapper.RequestToEndereco( dto.endereco()));
        filial = filialRepository.save(filial);
        return filialMapper.FilialToResponse(filial, true);
    }

    @Transactional
    @CacheEvict(value = "filiais", key = "#id")
    public void delete(Long id) throws Exception {
        if (!filialRepository.existsById(id)) {
            throw new Exception("Filial não encontrada");
        }
        filialRepository.deleteById(id);
    }
    @CacheEvict(value = "filiais", key = "'all'")
    public void cleanFiliaisListCache() {
    }

    @CacheEvict(value = "filiais", allEntries = true)
    public void cleanAllFiliaisCache() {
    }
}
