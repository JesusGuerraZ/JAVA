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
@Getter
@Setter
public class Persona {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    
    private long id;
    
    @Column
    private long cedula;
    
    @Column
    private String nombre;
    
    @Column
    private String foto;
    
    @Temporal(TemporalType.DATE)
    @Column
    private Date fechaIngreso;
    
    @ManyToOne
    @JoinColumn(name = "id_cargo")
    private Cargo cargo;
    
}
