package com.example.demo.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import java.util.Date;
import lombok.Getter;
import lombok.Setter;

@Entity
public class Persona {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter
    @Setter
    private long id;
    
    @Column
    @Getter
    @Setter
    private long cedula;
    
    @Column
    @Getter
    @Setter
    private String nombre;
    
    @Column
    @Getter
    @Setter
    private String foto;
    
    @Temporal(TemporalType.DATE)
    @Column
    @Getter
    @Setter
    private Date fechaIngreso;
    
    @ManyToOne
    @JoinColumn(name = "cargo_id")
    @Getter
    @Setter
    private Cargo cargo;
    
}
