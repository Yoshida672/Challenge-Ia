package br.com.fiap.monitoramentomottu.entity;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "filial")
public class Filial {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name="nome", nullable = false)
    private String nome;
    @Column(name="cnpj", nullable = false)
    private String cnpj;
    @Column(name="ano", nullable = false)
    private int ano;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_endereco", nullable = false)
    private Endereco endereco;

    @OneToMany(mappedBy = "filial")
    private List<Patio> patios;

    public Filial() {
    }

    public Filial(Long id, String nome, String cnpj, int ano, Endereco endereco, List<Patio> patios) {
        this.id = id;
        this.nome = nome;
        this.cnpj = cnpj;
        this.ano = ano;
        this.endereco = endereco;
        this.patios = patios;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getCnpj() {
        return cnpj;
    }

    public void setCnpj(String cnpj) {
        this.cnpj = cnpj;
    }

    public int getAno() {
        return ano;
    }

    public void setAno(int ano) {
        this.ano = ano;
    }

    public Endereco getEndereco() {
        return endereco;
    }

    public void setEndereco(Endereco endereco) {
        this.endereco = endereco;
    }

    public List<Patio> getPatios() {
        return patios;
    }

    public void setPatios(List<Patio> patios) {
        this.patios = patios;
    }
}
