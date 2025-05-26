package br.com.fiap.monitoramentomottu.repository;

import br.com.fiap.monitoramentomottu.entity.Filial;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FilialRepository  extends JpaRepository<Filial, Long> {
}
