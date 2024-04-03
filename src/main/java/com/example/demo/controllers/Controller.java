/*
* Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
* Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
*/
package com.example.demo.controllers;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.models.Cargo;
import com.example.demo.models.Persona;
import com.example.demo.repository.Repository;
import com.example.demo.repository.cargoRepository;

@RestController
@CrossOrigin(origins = "http://127.0.0.1:5500")
public class Controller {

    @Autowired
    private Repository repo;

    @Autowired
    private cargoRepository cargo;

    @GetMapping("cargo")
    public List<Cargo> getCargo() {
        return cargo.findAll();
    }

    @GetMapping("empleados")
    public List<Persona> getPersonas() {
        return repo.findAll();
    }

    @PostMapping("crear")
    public ResponseEntity<String> save(@RequestBody Persona persona) {
        try {
            // Establecer la fecha de ingreso
            persona.setFechaIngreso(new Date());

            // Guardar la Persona en la base de datos
            repo.save(persona);

            return new ResponseEntity<>("GUARDADO", HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Error al guardar la persona", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("editar/{id}")
    public String update(@PathVariable Long id, @RequestBody Persona persona) {
        Persona actualizar = repo.findById(id).get();

        actualizar.setNombre(persona.getNombre());
        actualizar.setCedula(persona.getCedula());
        actualizar.setFoto(persona.getFoto());
        actualizar.setCargo(persona.getCargo());
        actualizar.setFechaIngreso(new Date());

        repo.save(actualizar);

        return "EDITADO";
    }

    @DeleteMapping("eliminar/{id}")
    public String delete(@PathVariable long id) {
        Persona eliminar = repo.findById(id).get();

        repo.delete(eliminar);

        return "ELIMINADO";
    }

    @GetMapping()
    public String index() {
        return "CONECTADO";
    }

}
