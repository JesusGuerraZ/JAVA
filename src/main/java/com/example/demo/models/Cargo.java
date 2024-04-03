package com.example.demo.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Cargo {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    
    private long idCargo;
    

    @Column
    private String nombre;

    public Cargo() {
        // Constructor vacío necesario para JPA
    }

    public Cargo(String nombre) {
        this.nombre = nombre;
    }
    
}
