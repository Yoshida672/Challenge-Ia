package br.com.fiap.monitoramentomottu.entity;

import br.com.fiap.monitoramentomottu.entity.Condicao;
import br.com.fiap.monitoramentomottu.entity.Localizacao;
import br.com.fiap.monitoramentomottu.entity.Modelo;
import br.com.fiap.monitoramentomottu.entity.Uwb;
import jakarta.persistence.*;

@Entity
@Table(name = "moto")
public class Moto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="placa",unique = true, nullable = false)
    private String placa;

    @Enumerated(EnumType.STRING)
    @Column(name = "modelo",nullable = false)
    private Modelo modelo;

    @ManyToOne
    @JoinColumn(name = "id_condicao", nullable = false)
    private Condicao condicao;

    @OneToOne(mappedBy = "moto", cascade = CascadeType.ALL)
    private Uwb uwb;

    @ManyToOne
    @JoinColumn(name = "id_patio", nullable = false)
    private Patio patio;

    public Moto() {
    }

    public Moto(Long id, String placa, Modelo modelo, Condicao condicao, Uwb uwb, Patio patio) {
        this.id = id;
        this.placa = placa;
        this.modelo = modelo;
        this.condicao = condicao;
        this.uwb = uwb;
        this.patio = patio;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPlaca() {
        return placa;
    }

    public void setPlaca(String placa) {
        this.placa = placa;
    }

    public Modelo getModelo() {
        return modelo;
    }

    public void setModelo(Modelo modelo) {
        this.modelo = modelo;
    }

    public Condicao getCondicao() {
        return condicao;
    }

    public void setCondicao(Condicao condicao) {
        this.condicao = condicao;
    }

    public Uwb getUwb() {
        return uwb;
    }

    public void setUwb(Uwb uwb) {
        this.uwb = uwb;
    }

    public Patio getPatio() {
        return patio;
    }

    public void setPatio(Patio patio) {
        this.patio = patio;
    }
}