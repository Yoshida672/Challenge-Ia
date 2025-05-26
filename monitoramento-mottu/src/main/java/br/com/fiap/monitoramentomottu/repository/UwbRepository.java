package br.com.fiap.monitoramentomottu.repository;

import br.com.fiap.monitoramentomottu.entity.Uwb;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UwbRepository  extends JpaRepository<Uwb,Long> {
}
