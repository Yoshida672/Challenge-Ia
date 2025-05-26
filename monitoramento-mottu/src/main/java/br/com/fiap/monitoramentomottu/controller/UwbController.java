package br.com.fiap.monitoramentomottu.controller;

import br.com.fiap.monitoramentomottu.dto.Localizacao.LocalizacaoRequest;
import br.com.fiap.monitoramentomottu.dto.Uwb.UwbRequest;
import br.com.fiap.monitoramentomottu.dto.Uwb.UwbResponse;

import br.com.fiap.monitoramentomottu.service.UwbService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("/tags")
public class UwbController {
    private final UwbService service;


    public UwbController(UwbService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<UwbResponse> create(@RequestBody @Valid UwbRequest dto) throws Exception {
        UwbResponse response = service.create(dto);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UwbResponse> getById(@PathVariable Long id) throws Exception {
        UwbResponse response = service.getById(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<Page<UwbResponse>> getAll(@RequestParam(defaultValue = "0") Integer page) {
        Pageable pageable = PageRequest.of(page,5);
        return new ResponseEntity<>(service.getAll(pageable), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UwbResponse> update(
            @PathVariable Long id,
            @RequestBody @Valid UwbRequest dto) throws Exception {
        UwbResponse response = service.update(id, dto);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) throws Exception {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
    @PostMapping("/posicao/{id}")
    public ResponseEntity<UwbResponse> receberDados(@RequestBody LocalizacaoRequest posicao,@PathVariable Long id) throws Exception {
        UwbResponse response = service.updateLocalizacao(id,posicao);
        System.out.println("Recebido: " + posicao);
        return ResponseEntity.ok(response);
    }
}
