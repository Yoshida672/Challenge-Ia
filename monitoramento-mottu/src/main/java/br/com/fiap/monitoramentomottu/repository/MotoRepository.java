package br.com.fiap.monitoramentomottu.repository;

import br.com.fiap.monitoramentomottu.entity.Modelo;
import br.com.fiap.monitoramentomottu.entity.Moto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MotoRepository extends JpaRepository<Moto, Long> {
    boolean existsByPlaca(String placa);
    List<Moto> findByIdIn(List<Long> motosIds);
    List<Moto> findByModelo(Modelo modelo);
    List<Moto> findByCondicaoNomeIgnoreCase(String nome);
}