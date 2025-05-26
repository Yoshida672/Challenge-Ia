package br.com.fiap.monitoramentomottu.controller;

import br.com.fiap.monitoramentomottu.dto.Condicao.CondicaoRequest;
import br.com.fiap.monitoramentomottu.dto.Condicao.CondicaoResponse;

import br.com.fiap.monitoramentomottu.service.CondicaoService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/condicoes")
public class CondicaoController {
    private final CondicaoService service;

    public CondicaoController(CondicaoService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<CondicaoResponse> create(@RequestBody @Valid CondicaoRequest dto) throws Exception {
        CondicaoResponse response = service.create(dto);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CondicaoResponse> getById(@PathVariable Long id) throws Exception {
        CondicaoResponse response = service.getById(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<Page<CondicaoResponse>> getAll(@RequestParam(defaultValue = "0") Integer page) {
        Pageable pageable = PageRequest.of(page,10,   Sort.by("cor").ascending());
        return new ResponseEntity<>(service.getAll(pageable), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CondicaoResponse> update(
            @PathVariable Long id,
            @RequestBody @Valid CondicaoRequest dto) throws Exception {
        CondicaoResponse response = service.update(id, dto);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) throws Exception {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
