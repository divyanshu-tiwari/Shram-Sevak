package com.shramsevak.shramSevak.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.shramsevak.shramSevak.entity.Worker;

@Repository
public interface WorkerRepository extends JpaRepository<Worker, Long> {

}
