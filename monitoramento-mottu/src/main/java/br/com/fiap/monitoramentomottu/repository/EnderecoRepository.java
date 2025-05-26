package br.com.fiap.monitoramentomottu.repository;

import br.com.fiap.monitoramentomottu.entity.Endereco;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EnderecoRepository  extends JpaRepository<Endereco, Long> {
}
