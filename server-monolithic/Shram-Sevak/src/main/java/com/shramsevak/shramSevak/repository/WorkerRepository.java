package com.shramsevak.shramSevak.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.shramsevak.shramSevak.entity.Locality;
import com.shramsevak.shramSevak.entity.Worker;

@Repository
public interface WorkerRepository extends JpaRepository<Worker, Long> {

	Optional<Worker> findByContactAndPassword(String contact, String password);
    
}
