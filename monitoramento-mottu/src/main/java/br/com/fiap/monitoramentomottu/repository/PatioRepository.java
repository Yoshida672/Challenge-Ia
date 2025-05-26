package br.com.fiap.monitoramentomottu.repository;

import br.com.fiap.monitoramentomottu.entity.Patio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PatioRepository extends JpaRepository<Patio, Long> {
}
