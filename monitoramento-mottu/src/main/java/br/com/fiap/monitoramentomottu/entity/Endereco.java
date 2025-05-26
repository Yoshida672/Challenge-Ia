package br.com.fiap.monitoramentomottu.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "endereco")

public class Endereco {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name="numero", nullable = false)
    private int numero;
    @Column(name="cep", nullable = false)
    private String cep;
    @Column(name="estado", nullable = false)
    private String estado;
    @Column(name="cidade")
    private String cidade;
    @Column(name="bairro")
    private String bairro;
    @Column(name="logradouro")
    private String logradouro;
    @OneToOne(mappedBy = "endereco")
    private Filial filial;

    public Endereco() {
    }

    public Endereco(Long id, int numero, String cep, String estado, String cidade, String bairro, String logradouro) {
        this.id = id;
        this.numero = numero;
        this.cep = cep;
        this.estado = estado;
        this.cidade = cidade;
        this.bairro = bairro;
        this.logradouro = logradouro;
    }

    public int getNumero() {
        return numero;
    }

    public void setNumero(int numero) {
        this.numero = numero;
    }

    public String getCep() {
        return cep;
    }

    public void setCep(String cep) {
        this.cep = cep;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public String getCidade() {
        return cidade;
    }

    public void setCidade(String cidade) {
        this.cidade = cidade;
    }

    public String getBairro() {
        return bairro;
    }

    public void setBairro(String bairro) {
        this.bairro = bairro;
    }

    public String getLogradouro() {
        return logradouro;
    }

    public void setLogradouro(String logradouro) {
        this.logradouro = logradouro;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }
}
