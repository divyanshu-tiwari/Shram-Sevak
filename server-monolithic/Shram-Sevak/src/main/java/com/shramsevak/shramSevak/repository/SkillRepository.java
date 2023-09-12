package com.shramsevak.shramSevak.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shramsevak.shramSevak.entity.Skill;

public interface SkillRepository extends JpaRepository<Skill, Long> {

	List<Skill> findByCategoryId(Long categoryId);

}
