package com.shramsevak.shramSevak.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shramsevak.shramSevak.entity.Worker;

public interface WorkerRepository extends JpaRepository<Worker, Long> {

	Optional<Worker> findByContactAndPassword(String contact, String password);
   
}
