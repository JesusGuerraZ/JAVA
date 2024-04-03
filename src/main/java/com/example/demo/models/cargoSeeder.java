package com.example.demo.models;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.example.demo.repository.cargoRepository;

@Component
public class cargoSeeder implements CommandLineRunner {

    @Autowired
    private cargoRepository cargoRepository;

    @Override
    public void run(String... args) throws Exception {
        // Verificar si ya existen registros en la tabla de cargos
        if (cargoRepository.count() == 0) {
            // Si no existen, crear registros iniciales
            Cargo scrumMaster = new Cargo("Scrum Master");
            Cargo desarrollador = new Cargo("Desarrollador");
            final Cargo qa = new Cargo("QA");
            Cargo po = new Cargo("PO");

            cargoRepository.save(scrumMaster);
            cargoRepository.save(desarrollador);
            cargoRepository.save(qa);
            cargoRepository.save(po);
        }
    }
}