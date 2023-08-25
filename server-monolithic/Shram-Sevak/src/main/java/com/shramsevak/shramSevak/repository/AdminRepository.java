package com.shramsevak.shramSevak.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shramsevak.shramSevak.entity.Admin;

public interface AdminRepository extends JpaRepository<Admin, Long>{

	Optional<Admin> findByUserNameAndPassword(String userName, String password);

}
