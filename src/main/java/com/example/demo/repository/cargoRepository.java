package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.models.Cargo;

public interface cargoRepository extends JpaRepository<Cargo, Long> {

}
