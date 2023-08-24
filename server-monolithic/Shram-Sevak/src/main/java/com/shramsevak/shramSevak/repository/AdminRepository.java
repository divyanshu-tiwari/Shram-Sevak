package com.shramsevak.shramSevak.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.shramsevak.shramSevak.entity.Admin;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Long>{

}
