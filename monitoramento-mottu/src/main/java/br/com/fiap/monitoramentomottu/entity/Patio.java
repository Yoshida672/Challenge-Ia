package br.com.fiap.monitoramentomottu.entity;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "patio")

public class Patio {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "quantidade_motos")
    private int qtdMoto;
    @Column(name = "area_patio",nullable = false)
    private int areaPatio;
    @Column(name = "capacidade_motos",nullable = false)
    private int capacidadeMoto;
    @OneToMany(mappedBy = "patio", cascade = CascadeType.ALL)
    private List<Moto> motos = new ArrayList<>();
    @ManyToOne
    @JoinColumn(name = "id_filial", nullable = false)
    private Filial filial;

    public Patio() {
    }

    public Patio(Long id, int qtdMoto, int areaPatio, int capacidadeMoto, List<Moto> motos, Filial filial) {
        this.id = id;
        this.qtdMoto = qtdMoto;
        this.areaPatio = areaPatio;
        this.capacidadeMoto = capacidadeMoto;
        this.motos = motos;
        this.filial = filial;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getQtdMoto() {
        qtdMoto = motos.size();
        return qtdMoto;
    }


    public int getAreaPatio() {
        return areaPatio;
    }

    public void setAreaPatio(int areaPatio) {
        this.areaPatio = areaPatio;
    }

    public int getCapacidadeMoto() {
        return capacidadeMoto;
    }

    public void setCapacidadeMoto(int capacidadeMoto) {
        this.capacidadeMoto = capacidadeMoto;
    }

    public List<Moto> getMotos() {
        return motos;
    }

    public void setMotos(List<Moto> motos) {
        this.motos = motos;
    }

    public Filial getFilial() {
        return filial;
    }

    public void setFilial(Filial filial) {
        this.filial = filial;
    }
}
