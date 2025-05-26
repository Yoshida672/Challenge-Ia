package br.com.fiap.monitoramentomottu.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "condicoes")

public class Condicao {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name="nome", nullable = false)
    private String nome;
    @Column(name="cor", nullable = false)
    private String cor;

    public Condicao() {
    }

    public Condicao(Long id, String nome, String cor) {
        this.id = id;
        this.nome = nome;
        this.cor = cor;
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

    public String getCor() {
        return cor;
    }

    public void setCor(String cor) {
        this.cor = cor;
    }
}