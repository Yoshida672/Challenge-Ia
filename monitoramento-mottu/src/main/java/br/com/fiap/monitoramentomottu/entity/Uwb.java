package br.com.fiap.monitoramentomottu.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "uwb")

public class Uwb {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "codigo_uwb",unique = true, nullable = false)
    private String codigo;


    @Column(name = "status",nullable = false)
    private String status;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_moto")
    private Moto moto;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_localizacao")
    private Localizacao localizacao;
    public Uwb() {
    }

    public Uwb(Long id, String codigo, String status, Moto moto, Localizacao localizacao) {
        this.id = id;
        this.codigo = codigo;
        this.status = status;
        this.moto = moto;
        this.localizacao = localizacao;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Moto getMoto() {
        return moto;
    }

    public void setMoto(Moto moto) {
        this.moto = moto;
    }

    public Localizacao getLocalizacao() {
        return localizacao;
    }

    public void setLocalizacao(Localizacao localizacao) {
        this.localizacao = localizacao;
    }
}
